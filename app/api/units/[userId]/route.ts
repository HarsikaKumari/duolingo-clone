import db from "@/db/drizzle"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server";

import { units } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export const GET = async (req: Request,
    { params }: {
        params: Promise<{ unitsId: number }>
    },
) => {
    const { unitsId } = await params;
    const adminStatus = await isAdmin();

    if (!adminStatus) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await db.query.units.findFirst({
        where: eq(units.id, unitsId),
    });

    return NextResponse.json(data);
};

export const PUT = async (req: Request,
    { params }: {
        params: Promise<{ unitsId: number }>
    },
) => {
    const { unitsId } = await params;
    const adminStatus = await isAdmin();

    if (!adminStatus) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const data = await db.update(units).set({
        ...body,
    }).where(eq(units.id, unitsId)).returning();

    return NextResponse.json(data[0]);
};

export const DELETE = async (req: Request,
    { params }: {
        params: Promise<{ unitsId: number }>
    },
) => {
    const { unitsId } = await params;
    const adminStatus = await isAdmin();

    if (!adminStatus) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await db.delete(units)
        .where(eq(units.id, unitsId)).returning();

    return NextResponse.json(data[0]);
};
