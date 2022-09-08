import { IPackageFile } from "../types";
import { get } from "../octo-kit";
import { context } from "@actions/github";

export const name = "Last Modified";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function execute(_path: string, _packageFile: IPackageFile): Promise<string> {

    const octokit = get();

    const value = await octokit.rest.repos.get({
        ...context.repo,
    });

    console.log(JSON.stringify(value.data));


    return "testing";
}
