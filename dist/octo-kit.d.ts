import { getOctokit } from "@actions/github";
export declare type OctoKitType = ReturnType<typeof getOctokit>;
export declare function init(token: string): OctoKitType;
export declare function get(): OctoKitType;
