import { IPackageFile } from "../types";
import { stat } from "fs";

export const name = "Last Modified";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function execute(path: string, _packageFile: IPackageFile): Promise<string> {

    return new Promise((resolve, reject) => {

        try {

            stat(path, (err, stats) => {


                if (err) {
                    
                    reject(err);
                } else {

                    resolve(stats.mtime.toUTCString());
                }
            });


        } catch (e) {

            reject(e || Error("Unknown error."));
        }

    });
}
