import { getInput } from "@actions/core";
import { readFile, lstatSync, readdirSync } from "fs";
import { join } from "path";
import { debug } from "./logging";

export function readJSON<T>(path: string): Promise<T> {

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
    // after: https://stackoverflow.com/questions/18112204/get-all-directories-within-directory-nodejs

    const isDirectory = (root, dirName) => lstatSync(join(root, dirName)).isDirectory();

    return readdirSync(root).filter(dirName => isDirectory(root, dirName));
}
