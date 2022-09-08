import { IPackageFile } from "../types";

export const name = "SPFx Version";

export async function execute(_path: string, packageFile: IPackageFile): Promise<string> {

    if (Reflect.has(packageFile.dependencies, "@microsoft/sp-core-library")) {
        
        return Reflect.get(packageFile.dependencies, "@microsoft/sp-core-library");

    } else if (Reflect.has(packageFile.dependencies, "@microsoft/sp-client-base")) {

        return Reflect.get(packageFile.dependencies, "@microsoft/sp-client-base");

    } else {

        return "not found";
    }
}
