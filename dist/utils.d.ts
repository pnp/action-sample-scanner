export declare function readJSON<T>(path: string): Promise<T>;
export declare function loadInputs<T extends object>(model: T): T;
export declare function getSubDirPaths(root: string): string[];
export declare function getDirFilePaths(root: string): string[];
