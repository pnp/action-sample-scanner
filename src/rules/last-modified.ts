import { IPackageFile } from "../types";
import { get } from "../octo-kit";
import { context } from "@actions/github";

export const name = "Last Modified";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function execute(_path: string, _packageFile: IPackageFile): Promise<string> {

    const octokit = get();

    const { repo, ref } = context;

    const value = await octokit.rest.repos.getCommit({
        ...repo,
        ref,
        path: "testing/samples/sample1/",
    });

    console.log(JSON.stringify(value.data));

    const value2 = await octokit.rest.repos.getCommit({
        ...repo,
        ref,
        path: "testing/samples/sample2/",
    });

    console.log(JSON.stringify(value2.data));

    return "testing";
}
