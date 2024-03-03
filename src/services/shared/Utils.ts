import { v4 } from "uuid";
import { JsonError } from "./Validator";
import { randomUUID } from "crypto";

/*
Because we are using the v4() frunction from uuid library, it is better to wrap it inside a local function
Then just use our local function. Why? to decouple our code from any future changes in the v4() function or the uuid library
If changes need to be applied to ID generation, then we just modify our local function
Note that v4() calls a native JS function called randomUUID() ==> use this one instead
*/
export function createRandomId() {
    return randomUUID();
}

export function parseJSON(arg: string) {
    try {
        return JSON.parse(arg);
    } catch (error) {
        throw new JsonError(error.message);
    }
}