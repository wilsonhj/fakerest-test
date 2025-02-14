import axios from "axios";
import { User } from "./types";
import { computeStats } from "./dataProcessor";

function parseEndpointArgs(argv: string[]): string {
    const defaultEndpoint = "http://test.brightsign.io:3000";
    const endpointArg = argv.find(arg => arg.startsWith("--endpoint"));
    return endpointArg ? endpointArg.split("=")[1] : defaultEndpoint;
}


async function fetchUsers(endpoint: string): Promise<User[]> {
    try {
        const response = await axios.get(endpoint, { responseType: "text"});
        const rawData: string = response.data;
        // console.log("raw data from endpoint: ", rawData);
        
        let data: any;
        try {
            // first attemp: parse as standard JSON array
            data = JSON.parse(rawData);
        } catch (error) {
            // otherwise process as NDJSON
            data = rawData
                .split("\n")
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .map(line => JSON.parse(line));
        }
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Data is not an array or is nullish")
        }
        return data;
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