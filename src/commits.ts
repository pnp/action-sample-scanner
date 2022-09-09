import { get, OctoKitType } from "./octo-kit";
import { context } from "@actions/github";
import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types"
import { debug } from "console";

const lastCommitsByScanPathCache = new Map<string, ICommitInfo>();

export type ICommitInfo = GetResponseDataTypeFromEndpointMethod<OctoKitType["rest"]["repos"]["listCommits"]>[0];

export async function getLastCommitByScanPath(path: string): Promise<ICommitInfo | null> {

    if (lastCommitsByScanPathCache.has(path)) {
        return lastCommitsByScanPathCache.get(path);
    }

    const octokit = get();

    const { repo, ref } = context;

    const value = await octokit.rest.repos.listCommits({
        ...repo,
        ref,
        path,
        per_page: 1,
    });

    let commit = null;

    if (value && Array.isArray(value.data) && value.data.length > 0) {

        commit = value.data[0];

        debug(`loaded last commit for ${path}: ${JSON.stringify(commit)}`);

        lastCommitsByScanPathCache.set(path, commit);
    }

    return commit;
}
