import { isPackageFile } from "src/utils";
import { IPackageFile } from "../types";
import { not_found } from "../strings";

export const name = "SPFx Version";

export async function execute(_path: string, packageFile: IPackageFile | undefined | null): Promise<string> {

    if (isPackageFile(packageFile) && Reflect.has(packageFile, "dependencies")) {
        
        if (Reflect.has(packageFile.dependencies, "@microsoft/sp-core-library")) {

            return Reflect.get(packageFile.dependencies, "@microsoft/sp-core-library");
    
        } else if (Reflect.has(packageFile.dependencies, "@microsoft/sp-client-base")) {
    
            return Reflect.get(packageFile.dependencies, "@microsoft/sp-client-base");
    
        } else {
    
            return not_found;
        }
    }

    return not_found;
}
