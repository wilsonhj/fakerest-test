import { User } from "./types";
export declare function computeStats(users: User[]): {
    mostCommonFirstNameOverall: string;
    mostCommonHobbyOfFriendsOverall: string;
    averageAgePerCity: Record<string, number>;
    averageFriendsPerCity: Record<string, number>;
    userWithMostFriendsPerCity: Record<string, {
        name: string;
        friendCount: number;
    }>;
};
