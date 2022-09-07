import { IPackageFile } from "../types";

export const name = "Version";

export async function execute(_path: string, packageFile: IPackageFile): Promise<string> {

    return packageFile.version;
}
