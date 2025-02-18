import { User } from "./types";
export declare function getFirstName(fullName: string): string;
export declare function findMostCommon(counts: Record<string, number>): string;
export declare function parseJSON(rawData: string): any[];
export declare function validateUserData(data: any[]): User[];
