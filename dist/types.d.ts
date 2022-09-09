export interface IPackageFile {
    name: string;
    version: string;
    description: string;
    main: string;
    module: boolean;
    scripts: Record<string, string>;
    author: string;
    license: string;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
}
export declare type RuleExec = (path: string, packageFile?: IPackageFile | null) => Promise<string>;
export declare type RuleTuple = [string, RuleExec];
