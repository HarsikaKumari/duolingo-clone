import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { units } from "@/db/schema";
export const GET = async () => {
    const adminStatus = await isAdmin();

    if (!adminStatus) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await db.query.units.findMany();

    return NextResponse.json(data);
}

export const POST = async (req: Request) => {
    const adminStatus = await isAdmin();

    if (!adminStatus) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const data = await db.insert(units).values({
        ...body,
    }).returning();

    return NextResponse.json(data[0]);
}