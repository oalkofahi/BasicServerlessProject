
import { SpaceEntry } from '../model/Model';

export class MissingFieldError extends Error {
    constructor(missingField: string) {
        super(`Value for ${missingField} is expected`)
    }
}

export class JsonError extends Error {}

// Define a function to check if an object is a valid space entry
export function validateAsSpaceEntry(args: any) {
    if((args as SpaceEntry).id == undefined) {
        throw new MissingFieldError('id')
    }
    if((args as SpaceEntry).location == undefined) {
        throw new MissingFieldError('location')
    }
    ////The following are commented because we are checking for them yet
    // if((args as SpaceEntry).name == undefined) {
    //     throw new MissingFieldError('name')
    // }
    // if((args as SpaceEntry).photoUrl == undefined) {
    //     throw new MissingFieldError('photoUrl')
    // }
}