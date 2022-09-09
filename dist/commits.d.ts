import { OctoKitType } from "./octo-kit";
import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";
export declare type ICommitInfo = GetResponseDataTypeFromEndpointMethod<OctoKitType["rest"]["repos"]["listCommits"]>[0];
export declare function getLastCommitByScanPath(path: string): Promise<ICommitInfo | null>;
