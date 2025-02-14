import axios from "axios";
import { User } from "./types";
import { computeStats } from "./dataProcessor";
import { parseJSON, validateUserData } from "./utils";


function parseEndpointArgs(argv: string[]): string {
    const defaultEndpoint = "http://test.brightsign.io:3000";
    const endpointArg = argv.find(arg => arg.startsWith("--endpoint"));
    return endpointArg ? endpointArg.split("=")[1] : defaultEndpoint;
}

async function fetchUsers(endpoint: string): Promise<User[]> {
    try {
        const response = await axios.get(endpoint, { responseType: "text" });
        const parsedData = parseJSON(response.data);
        return validateUserData(parsedData);
    } catch (error: any) {
        throw new Error(`Error fetching data from ${endpoint}: ${error.message}`);
    }
}


async function main() {
    const endpoint = parseEndpointArgs(process.argv);

    let users: User[];
    try {
        users = await fetchUsers(endpoint);
    } catch (error: any) {
        console.error(error.message);
        process.exit(1);
    }

    const result = computeStats(users);
    console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
    console.error("unexpected error in main: ", err);
    process.exit(1);
});