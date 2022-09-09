import { getInput } from "@actions/core";
import { readFile, lstatSync, readdirSync } from "fs";
import { join } from "path";
import { debug } from "./logging";
import { IPackageFile } from "./types";

export function readJSONFile<T>(path: string): Promise<T> {

    return new Promise((resolve, reject) => {

        readFile(path, { encoding: "utf-8" }, (err, data) => {

            try {

                if (err) {
                    throw err;
                }

                const json = JSON.parse(data);

                resolve(json);

            } catch (e) {

                reject(err);
            }
        });
    });
}

export function loadInputs<T extends object>(model: T): T {

    const parsed = Reflect.ownKeys(model).reduce((prev, key: string) => {

        if (typeof prev[key] !== "string") {

            prev[key] = JSON.parse(getInput(key, {
                trimWhitespace: true,
            }));

        } else {
            prev[key] = getInput(key, {
                trimWhitespace: false,
            });
        }

        return prev;

    }, model);

    debug(`Inputs: ${JSON.stringify(parsed)}`);

    return parsed;
}

export function getSubDirPaths(root: string): string[] {

    return readdirSync(root).map(d => join(root, d)).filter(dirName => lstatSync(dirName).isDirectory());
}

export function getDirFilePaths(root: string): string[] {

    return readdirSync(root).map(d => join(root, d)).filter(dirName => !lstatSync(dirName).isDirectory());
}

export function repoLinkFromScanPath(path: string): string {
    return `../../tree/main/${path}`;
}

export function isPackageFile(packageFile: IPackageFile | null | undefined): packageFile is IPackageFile {
    // TODO::? some other validation on package file
    return typeof packageFile !== "undefined" && packageFile !== null
}
