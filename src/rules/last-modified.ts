import { IPackageFile } from "../types";
import { getLastCommitByScanPath } from "../commits";
import { not_found } from "../strings";

export const name = "Last Modified";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function execute(path: string, _packageFile: IPackageFile | undefined | null): Promise<string> {

    const commitInfo = await getLastCommitByScanPath(path);

    if (commitInfo && commitInfo.commit) {

        return commitInfo.commit.author?.date || not_found;

    } else {

        return not_found;
    }
}
