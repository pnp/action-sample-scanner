import { readJSON, repoLinkFromScanPath } from "./utils";
import { summary } from "@actions/core";
import { debug, log } from "./logging";
import { join } from "path";
import { existsSync } from "fs";
import { IPackageFile } from "./types";
import rules from "./rules";
import {
    package_json_not_found,
    summary_header_name,
    summary_header_path,
    word_error
} from "./strings";

export async function runner(scanPaths: string[]) {

    // const rules = await loadRules();

    // the summary rows will contain our output
    const summaryRows = [];

    debug(`Loaded ${rules.length} rules`);

    // add headers
    summaryRows.push([{
        data: summary_header_name,
        header: true,
    },
    {
        data: summary_header_path,
        header: true,
    },
    ...rules.map((r) => ({
        data: r[0],
        header: true,
    }))]);

    for (let i = 0; i < scanPaths.length; i++) {

        const scanPath = scanPaths[i];
        const repoLink = repoLinkFromScanPath(scanPath);

        debug(`Processing scanning path: '${scanPath}'`);

        const scanSummaryRow = [];

        const packagePath = join(scanPath, "package.json");

        // we load the package file once so every rule doesn't need to as it will likely be used a lot
        const packageFile = existsSync(packagePath) ? await readJSON<IPackageFile>(packagePath) : null;

        scanSummaryRow.push(packageFile?.name || package_json_not_found, `<a href="${repoLink}">${scanPath}</a>`);

        for (let r = 0; r < rules.length; r++) {

            const rule = rules[r];

            try {

                let result = await rule[1](scanPath, packageFile);

                if (typeof result === "undefined" || result === null) {
                    result = "";
                }

                scanSummaryRow.push(result);

            } catch (e) {

                scanSummaryRow.push(word_error);
                debug(`Error for scan ${rule[0]} on ${scanPath}: ${e}`);
            }
        }

        summaryRows.push(scanSummaryRow);
    }

    log("Adding Table");

    // add a table to the summary
    summary.addTable(summaryRows);
    summary.write();
}

// async function loadRules(path = "/rules"): Promise<RuleTuple[]> {

//     const rules = [];
//     const ruleDirs = getDirFilePaths(path);

//     for (let i = 0; i < ruleDirs.length; i++) {

//         debug(`Loading rule ${ruleDirs[i]}`);
//         const { name, execute } = await import(ruleDirs[i]);

//         rules.push([name, execute]);
//     }

//     return rules;
// }
