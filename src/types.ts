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

export type RuleExec = (path: string, packageFile?: IPackageFile | undefined | null) => Promise<string>;

export type RuleTuple = [string, RuleExec];
