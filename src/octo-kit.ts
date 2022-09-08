import { getOctokit } from "@actions/github";

export type OctoKitType = ReturnType<typeof getOctokit>;

let octokit: OctoKitType = null;

export function init(token: string): OctoKitType {

    if (typeof token === "undefined" || token.length < 1) {
        throw Error("You must supply a valid token in the inputs for this action.");
    }

    octokit = getOctokit(token);
    return octokit;
}

export function get(): OctoKitType {

    if (typeof octokit === "undefined" || octokit === null) {
        throw Error("You must call init before get to ensure the octokit instance is created.");
    }

    return octokit;
}
