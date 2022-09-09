import { get, OctoKitType } from "./octo-kit";
import { context } from "@actions/github";
import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types"

const commits = new Map<string, ICommitInfo>();

export type ICommitInfo = GetResponseDataTypeFromEndpointMethod<OctoKitType["rest"]["repos"]["listCommits"]>[0];

export async function getLastCommitByScanPath(path: string): Promise<ICommitInfo | null> {

    if (commits.has(path)) {
        return commits.get(path);
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

    if (Array.isArray(value.data) && value.data.length > 0) {

        commit = value.data[0];

        commits.set(path, commit);
    }    

    return commit;
}
