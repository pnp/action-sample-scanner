import { readJSONFile, repoLinkFromScanPath } from "./utils";
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
        const packageFile = existsSync(packagePath) ? await readJSONFile<IPackageFile>(packagePath) : null;

        scanSummaryRow.push(packageFile?.name || package_json_not_found, `<a href="${repoLink}">${scanPath}</a>`);

        for (let r = 0; r < rules.length; r++) {

            const rule = rules[r];

            try {

                let result = await rule[1](scanPath, packageFile);

                if (typeof result === "undefined" || result === null) {
                    result = "";
                }

                scanSummaryRow.push(`<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2048 2048'%3E%3Cpath d='M1920 2048H0L960 128l960 1920zm-896-384H896v128h128v-128zm0-128V896H896v640h128z' fill='%23333333'%3E%3C/path%3E%3C/svg%3E" />${result}`);

            } catch (e) {

                scanSummaryRow.push(word_error);
                debug(`Error for scan ${rule[0]} on ${scanPath}: ${e}`);
            }
        }

        summaryRows.push(scanSummaryRow);
    }

    log("Adding Table");

    // add a table to the summary
    summary
        .addHeading("PnP Sample Scan Results")
        .addTable(summaryRows)
        .write();
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
