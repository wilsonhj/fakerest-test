#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();
import { run } from "./runner";

const endpoint = process.env.ENDPOINT || "http://test.brightsign.io:3000";
const rawOutput = process.env.RAW_OUTPUT === 'true';
const debug = process.env.DEBUG === 'true';

run(endpoint, rawOutput, debug)
    .then((result) => {
        console.log(result);
        process.exit(0);
    })
    .catch((error) => {
        console.error(error.message);
        process.exit(1);
    });