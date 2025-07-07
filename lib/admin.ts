import { auth } from "@clerk/nextjs/server"

const AdminIds = [
    "user_2xOUcgmeDCH9TwRxOaCnL5tHXl4"
];

export const isAdmin = async () => {
    const { userId } = await auth();

    if (!userId) {
        return false;
    }

    return AdminIds.indexOf(userId) !== -1;
}
