#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dataProcessor_1 = require("./dataProcessor");
const utils_1 = require("./utils");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = process.env.ENDPOINT || "http://test.brightsign.io:3000";
        const rawOutput = process.env.RAW_OUTPUT === 'true';
        if (!endpoint) {
            console.error("Error: No endpoint specified");
            process.exit(1);
        }
        try {
            const response = yield axios_1.default.get(endpoint, {
                responseType: "text",
                timeout: 5000
            });
            const users = (0, utils_1.validateUserData)((0, utils_1.parseJSON)(response.data));
            const result = (0, dataProcessor_1.computeStats)(users);
            console.log(rawOutput ? JSON.stringify(result) : JSON.stringify(result, null, 2));
        }
        catch (error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    });
}
main();
//# sourceMappingURL=index.js.map