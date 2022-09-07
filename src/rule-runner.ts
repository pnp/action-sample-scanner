import { getDirFilePaths, readJSON } from "./utils";
import { summary } from "@actions/core";
import { debug } from "./logging";
import { join } from "path";
import { IPackageFile } from "./types";

export async function runner(scanPaths: string[]) {

    const rules = await loadRules();
    const summaryRows = [];

    debug(`Loaded ${rules.length} rules`);

    // columns
    // 0: name
    // 1: path
    // 2: last modified
    // 3: rule[0]
    // 4: rule[1]
    // 5: rule[n]

    // add headers
    summaryRows.push([{
        data: "Name",
        header: true,
    },
    {
        data: "Version",
        header: true,
    },
    {
        data: "Path",
        header: true,
    },
    ...rules.map((r) => ({
        data: r[0],
        header: true,
    }))]);

    for (let i = 0; i < scanPaths.length; i++) {

        const scanPath = scanPaths[i];

        debug(`Processing scanning path: '${scanPath}'`);

        const scanSummaryRow = [];

        const packageFile = await readJSON<IPackageFile>(join(scanPath, "package.json"));

        scanSummaryRow.push(packageFile.name, packageFile.version, scanPath);

        for (let r = 0; r < rules.length; r++) {

            const rule = rules[r];

            try {

                scanSummaryRow.push(await rule[1](scanPath, packageFile));

            } catch (e) {
                scanSummaryRow.push("error");
                debug(`Error for scan ${rule[0]} on ${scanPath}: ${e}`)
            }
        }
    }



    // add a table to the summary
    summary.addTable(summaryRows);

    // export interface SummaryTableCell {
    //     /**
    //      * Cell content
    //      */
    //     data: string;
    //     /**
    //      * Render cell as header
    //      * (optional) default: false
    //      */
    //     header?: boolean;
    //     /**
    //      * Number of columns the cell extends
    //      * (optional) default: '1'
    //      */
    //     colspan?: string;
    //     /**
    //      * Number of rows the cell extends
    //      * (optional) default: '1'
    //      */
    //     rowspan?: string;
    // }
}

export type RuleExec = (path: string, packageFile: IPackageFile) => Promise<string>;

export type RuleTuple = [string, RuleExec]

async function loadRules(path = "/rules"): Promise<RuleTuple[]> {

    const rules = [];
    const ruleDirs = getDirFilePaths(path);

    for (let i = 0; i < ruleDirs.length; i++) {

        const { name, execute } = await import(ruleDirs[i]);

        rules.push([name, execute]);
    }

    return rules;
}
