import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";
declare const octokit: import("@octokit/core").Octokit & import("@octokit/plugin-rest-endpoint-methods/dist-types/types").Api & {
    paginate: import("@octokit/plugin-paginate-rest").PaginateInterface;
};
export declare type ICommitInfo = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.listCommits>[0];
export declare function getLastCommitByScanPath(path: string): Promise<ICommitInfo | null>;
export {};
