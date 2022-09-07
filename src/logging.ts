import { debug as coreDebug } from '@actions/core'

export function debug(message: string) {
    coreDebug(message);
}
