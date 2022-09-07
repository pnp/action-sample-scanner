import { debug as coreDebug } from '@actions/core'

export function debug(message: string) {
    coreDebug(message);
}

export function log(message: string) {
    console.log(message);
}
