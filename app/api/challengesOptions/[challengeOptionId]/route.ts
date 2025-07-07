import db from "@/db/drizzle"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server";

import { challengeOptions } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export const GET = async (req: Request,
    { params }: {
        params: Promise<{ challengeOptionId: number }>
    },
) => {
    const { challengeOptionId } = await params;
    const adminStatus = await isAdmin();

    if (!adminStatus) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await db.query.challengeOptions.findFirst({
        where: eq(challengeOptions.id, challengeOptionId),
    });

    return NextResponse.json(data);
};

export const PUT = async (req: Request,
    { params }: {
        params: Promise<{ challengeOptionId: number }>
    },
) => {
    const { challengeOptionId } = await params;
    const adminStatus = await isAdmin();

    if (!adminStatus) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const data = await db.update(challengeOptions).set({
        ...body,
    }).where(eq(challengeOptions.id, challengeOptionId)).returning();

    return NextResponse.json(data[0]);
};

export const DELETE = async (req: Request,
    { params }: {
        params: Promise<{ challengeOptionId: number }>
    },
) => {
    const { challengeOptionId } = await params;
    const adminStatus = await isAdmin();

    if (!adminStatus) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await db.delete(challengeOptions)
        .where(eq(challengeOptions.id, challengeOptionId)).returning();

    return NextResponse.json(data[0]);
};
