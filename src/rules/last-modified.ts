import { IPackageFile } from "../types";
import { get } from "../octo-kit";
import { context } from "@actions/github";

export const name = "Last Modified";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function execute(path: string, _packageFile: IPackageFile): Promise<string> {

    const octokit = get();

    const { repo, ref } = context;

    const value = await octokit.rest.repos.listCommits({
        ...repo,
        ref,
        path,
        per_page: 1,
    });

    if (value && value.data && Array.isArray(value.data) && value.data.length > 0) {
        return value.data[0].commit?.author?.date || "none";
    } else {
        return "none";
    }    
}
