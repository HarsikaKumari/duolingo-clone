import "dotenv/config";

import * as schema from "../db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding the database...");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);
        await db.delete(schema.userSubscription);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Spanish",
                imageSrc: "/es.svg",
            },
            {
                id: 2,
                title: "Italian",
                imageSrc: "/it.svg",
            },
            {
                id: 3,
                title: "French",
                imageSrc: "/fr.svg",
            },
            {
                id: 4,
                title: "Croatian",
                imageSrc: "/hr.svg",
            },
            {
                id: 5,
                title: "Hindi",
                imageSrc: "/in.svg",
            },
        ]);

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: "Unit 1",
                description: "Learn the basics of Spanish",
                order: 1,
            }
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: "Nouns",
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: "Verbs",
            },
            {
                id: 3,
                unitId: 1,
                order: 3,
                title: "Verbs",
            },
            {
                id: 4,
                unitId: 1,
                order: 4,
                title: "Verbs",
            },
            {
                id: 5,
                unitId: 1,
                order: 5,
                title: "Verbs",
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1, //Nouns
                type: "SELECT",
                order: 1,
                question: 'Which one of these is the "the man"?',
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST",
                order: 2,
                question: 'the man',
            },
            {
                id: 3,
                lessonId: 1,
                type: "SELECT",
                order: 3,
                question: 'Which one of these is the "the woman"?',
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1, // Which one of these is the "the man"?
                imageSrc: "/man.svg",
                correct: true,
                text: "el hombre",
                audioSrc: "/es_man.mp3"
            },
            {
                challengeId: 1,
                imageSrc: "/woman.svg",
                text: "la mujer",
                audioSrc: "/es_woman.mp3"
            },
            {
                challengeId: 1,
                imageSrc: "/robot.svg",
                text: "el robot",
                audioSrc: "/es_robot.mp3"
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 2, // the man
                correct: true,
                text: "el hombre",
                audioSrc: "/es_man.mp3"
            },
            {
                challengeId: 2,
                text: "la mujer",
                audioSrc: "/es_woman.mp3"
            },
            {
                challengeId: 2,
                text: "el robot",
                audioSrc: "/es_robot.mp3"
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 3, //Which one of these is the "the woman"?
                imageSrc: "/man.svg",
                text: "el hombre",
                audioSrc: "/es_man.mp3"
            },
            {
                challengeId: 3,
                imageSrc: "/woman.svg",
                text: "la mujer",
                correct: true,
                audioSrc: "/es_woman.mp3"
            },
            {
                challengeId: 3,
                imageSrc: "/robot.svg",
                text: "el robot",
                audioSrc: "/es_robot.mp3"
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 4,
                lessonId: 2, // Verbs
                type: "SELECT",
                order: 1,
                question: 'Which one of these is the "the man"?',
            },
            {
                id: 5,
                lessonId: 2, // Verbs
                type: "ASSIST",
                order: 2,
                question: '"the man"',
            },
            {
                id: 6,
                lessonId: 2, // Verbs
                type: "SELECT",
                order: 3,
                question: 'Which one of these is the "the robot"?',
            },
        ]);

        console.log("Seeding finished");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to seed the database");
    }
};

main();
