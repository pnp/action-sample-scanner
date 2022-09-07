import { IPackageFile } from "./types";
export declare function runner(scanPaths: string[]): Promise<void>;
export declare type RuleExec = (path: string, packageFile: IPackageFile) => Promise<string>;
export declare type RuleTuple = [string, RuleExec];
