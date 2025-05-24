import { cache } from "react";
import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { courses, userProgress } from "./schema";

export const getUserProgress = cache(async () => {
    const {userId} = await auth();

    if(!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        },
    });

    return data;
})

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();

    return data;
})

export const getCoursesById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        //Populate the lessons and units
    });

    return data;
})
