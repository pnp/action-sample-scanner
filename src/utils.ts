import { getInput } from "@actions/core";
import { readFile } from "fs";

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

    return Reflect.ownKeys(model).reduce((prev, key: string) => {

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
}
