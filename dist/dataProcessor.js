"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeStats = computeStats;
const utils_1 = require("./utils");
function aggregateCityStats(users) {
    const cityMap = {};
    users.forEach(user => {
        if (!cityMap[user.city]) {
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
        if (user.friends.length > stats.topFriendUser.friendCount) {
            stats.topFriendUser = { name: user.name, friendCount: user.friends.length };
        }
    });
    return cityMap;
}
function computeAverages(cityMap) {
    const averageAgePerCity = {};
    const averageFriendsPerCity = {};
    const userWithMostFriendsPerCity = {};
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
function computeStats(users) {
    //aggregate data by city
    const cityMap = aggregateCityStats(users);
    const averages = computeAverages(cityMap);
    const firstNameCount = {};
    const hobbyCount = {};
    users.forEach(user => {
        const firstName = (0, utils_1.getFirstName)(user.name);
        firstNameCount[firstName] = (firstNameCount[firstName] || 0) + 1;
        user.friends.forEach(friend => {
            friend.hobbies.forEach(hobby => {
                hobbyCount[hobby] = (hobbyCount[hobby] || 0) + 1;
            });
        });
    });
    const mostCommonFirstNameOverall = (0, utils_1.findMostCommon)(firstNameCount);
    const mostCommonHobbyOfFriendsOverall = (0, utils_1.findMostCommon)(hobbyCount);
    return Object.assign(Object.assign({}, averages), { mostCommonFirstNameOverall,
        mostCommonHobbyOfFriendsOverall });
}
//# sourceMappingURL=dataProcessor.js.map