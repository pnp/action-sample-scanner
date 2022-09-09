import { isPackageFile } from "src/utils";
import { IPackageFile } from "../types";
import { not_found } from "../strings";

export const name = "Version";

export async function execute(_path: string, packageFile: IPackageFile | undefined | null): Promise<string> {

    return isPackageFile(packageFile) ? packageFile?.version || not_found : not_found;
}
