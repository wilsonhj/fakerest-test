import { computeStats } from '../src/dataProcessor';
import { User } from '../src/types';

describe("dataProcessor", () => {
    // Mock test data
    const mockUsers: User[] = [
        {
            id: 1,
            name: "John Smith",
            age: 30,
            city: "New York",
            friends: [
                { id: 2, name: "Jane Doe", age: 25, hobbies: ["reading", "gaming"] },
                { id: 3, name: "John Doe", age: 28, hobbies: ["gaming", "sports"] }
            ]
        },
        {
            id: 4,
            name: "Jane Smith",
            age: 35,
            city: "New York",
            friends: [
                { id: 5, name: "John Johnson", age: 32, hobbies: ["reading"] }
            ]
        },
        {
            id: 6,
            name: "John Davis",
            age: 28,
            city: "Boston",
            friends: [
                { id: 7, name: "Jane Wilson", age: 29, hobbies: ["gaming", "sports"] }
            ]
        }
    ];

    describe("calucation requirements", () => {
       let results: ReturnType<typeof computeStats>;

       beforeEach(() => {
        results = computeStats(mockUsers);
       });

    // Requirement 1. average age of all users per city
      test('calculate average age of all users per city', () => {
        expect(results.averageAgePerCity).toEqual({
            "New York": 32.50, // (30 + 35) / 2
            "Boston": 28.00 // (28) / 1
        });
      });
      // Requirement 2. average number of friends per city
      test('calculate average number of friends per city', () => {
        expect(results.averageFriendsPerCity).toEqual({
            "New York": 1.50, // (2 + 1) / 2
            "Boston": 1.00 // (1) / 1
        });
      });
      // Requirement 3. the user with the most friends per city
      test('calculate the user with the most friends per city', () => {
        expect(results.userWithMostFriendsPerCity).toEqual({
            "New York": { name: "John Smith", friendCount: 2 },
                "Boston": { name: "John Davis", friendCount: 1 }
        });
      });
      // Requirement 4. the most common first name in all cities
      test('identies most common first name in all cities', () => {
        expect(results.mostCommonFirstNameOverall).toBe("John");
      });
      // Requirement 5. the most common hobby of all friends of users in all cities
      test('identies most common hobby of all friends of users in all cities', () => {
        expect(results.mostCommonHobbyOfFriendsOverall).toBe("gaming");
      });
    });
      
      describe("edge cases", () => {
        test('empty users array', () => {
            const emptyUsers: User[] = [];
            const results = computeStats(emptyUsers);
            expect(results).toEqual({
              "averageAgePerCity": {},
              "averageFriendsPerCity": {},
              "mostCommonFirstNameOverall": "",
              "mostCommonHobbyOfFriendsOverall": "",
              "userWithMostFriendsPerCity": {}
           });
        });
      });
        test('handles empty city', () => {
            const results = computeStats([]);
            expect(results.averageAgePerCity).toEqual({});
            expect(results.averageFriendsPerCity).toEqual({});
            expect(results.userWithMostFriendsPerCity).toEqual({});
            expect(results.mostCommonFirstNameOverall).toBe("");
            expect(results.mostCommonHobbyOfFriendsOverall).toBe("");
        });
        test('handles user with no friends (lol)', () => {
            const usersWithNoFriends: User[] = [{
                id: 1,
                name: "John Smith",
                age: 30,
                city: "New York",
                friends: []
            }];
            const results = computeStats(usersWithNoFriends);
            expect(results.averageFriendsPerCity["New York"]).toBe(0);
            expect(results.mostCommonHobbyOfFriendsOverall).toBe("");
        });    
});
