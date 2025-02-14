import { User } from "./types";
import { findMostCommon, getFirstName } from "./utils";

interface CityStats {
    totalAge: number;
    userCount: number;
    totalFriends: number;
    topFriendUser: { name: string; friendCount: number };
}

function aggregateCityStats(users: User[]): Record<string, CityStats> {
    const  cityMap: Record<string, CityStats> = {};
    users.forEach(user => {
        if(!cityMap[user.city]) {
            cityMap[user.city] = {
                totalAge: 0,
                userCount: 0,
                totalFriends: 0,
                topFriendUser: { name: "", friendCount: -1 }
            };
        }
        const stats = cityMap[user.city];
        stats.totalAge += user.age;
        stats.userCount += 1;
        stats.totalFriends += user.friends.length;
        if (user.friends.length > stats.topFriendUser.friendCount){
            stats.topFriendUser = { name: user.name, friendCount: user.friends.length };
        }
    });
    return cityMap;
}

function computeAverages(cityMap: Record<string, CityStats>) {
    const averageAgePerCity: Record<string, number> = {};
    const averageFriendsPerCity: Record<string, number> = {};
    const userWithMostFriendsPerCity: Record<string, { name: string; friendCount: number }> = {};

    Object.entries(cityMap).forEach(([city, stats]) => {
        const { totalAge, userCount, totalFriends, topFriendUser } = stats;
        // prevent userCount = 0 (division by 0 errors)
        const safeUserCount = userCount === 0 ? 1 : userCount;
        averageAgePerCity[city] = Number((totalAge / safeUserCount).toFixed(2));
        averageFriendsPerCity[city] = Number((totalFriends / safeUserCount).toFixed(2));
        userWithMostFriendsPerCity[city] = topFriendUser;
    });

    return {
        averageAgePerCity,
        averageFriendsPerCity,
        userWithMostFriendsPerCity
    };
}

export function computeStats(users: User[]) {
    //aggregate data by city

    const cityMap = aggregateCityStats(users);

    const averages = computeAverages(cityMap);

    const firstNameCount: Record<string, number> = {};
    const hobbyCount: Record<string, number> = {};

    users.forEach(user => {
        const firstName = getFirstName(user.name);
        firstNameCount[firstName] = (firstNameCount[firstName] || 0) + 1;
        user.friends.forEach(friend => {
            friend.hobbies.forEach(hobby => {
                hobbyCount[hobby] = (hobbyCount[hobby] || 0) + 1;
            });
        });
    });

    const mostCommonFirstNameOverall = findMostCommon(firstNameCount);
    const mostCommonHobbyOfFriendsOverall = findMostCommon(hobbyCount);

    return {
        ...averages,
        mostCommonFirstNameOverall,
        mostCommonHobbyOfFriendsOverall
    };
}