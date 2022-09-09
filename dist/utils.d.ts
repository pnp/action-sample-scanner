import { IPackageFile } from "./types";
export declare function readJSONFile<T>(path: string): Promise<T>;
export declare function loadInputs<T extends object>(model: T): T;
export declare function getSubDirPaths(root: string): string[];
export declare function getDirFilePaths(root: string): string[];
export declare function repoLinkFromScanPath(path: string): string;
export declare function isPackageFile(packageFile: IPackageFile | null | undefined): packageFile is IPackageFile;
