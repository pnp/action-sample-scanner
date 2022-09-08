import { IPackageFile } from "../types";

export const name = "SPFx Version";

export async function execute(_path: string, packageFile: IPackageFile): Promise<string> {
    return packageFile.dependencies["@microsoft/sp-core-library"];
}
