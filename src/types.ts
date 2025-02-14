export interface Friend {
    id: number;
    name: string;
    age: number;
    hobbies: string[];
}

export interface User {
    id: number;
    name: string;
    age: number;
    city: string;
    friends: Friend[];
}