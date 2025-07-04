import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { stripe } from "@/lib/stripe";
import { userSubscription } from "@/db/schema";

export async function POST(req: Request) {

    console.log("Stripe webhook POST route triggered");

    const body = await req.text();
    console.log("Webhook Raw Body:", body);
    
    const signature = (await headers()).get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!,
        );
    } catch (error: any) {
        return new NextResponse(`Webhook error: ${error.message}`, {
            status: 400,
        });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        if (!session?.metadata?.userId) {
            return new NextResponse("User ID is required", { status: 400 })
        }

        await db.insert(userSubscription).values({
            userId: session.metadata.userId,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000,
                // subscription.items.data[0].current_period_end * 1000,
            ),
        });
        console.log("✅ Subscription inserted");
    }

    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        await db.update(userSubscription).set({
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000,
                // subscription.items.data[0].current_period_end * 1000,
            ),
        }).where(eq(userSubscription.stripeSubscriptionId, subscription.id));
        console.log("✅ Subscription updated");
    }
    return new NextResponse(null, { status: 200 })
}
// D: \Code\WebDev\Project\duolingo - clone\app\api\webhooks\stripe\route.ts
// curl - X POST http://localhost:3000/api/webhooks/stripe
