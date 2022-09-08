import { log } from "./logging";
import { setFailed } from "@actions/core";
import { loadInputs, getSubDirPaths } from "./utils";
import { runner } from "./rule-runner";
import { init } from "./octo-kit";

(async function (): Promise<void> {

    try {

        log("Starting action");

        log("Parsing Inputs");

        const { dirs, token } = loadInputs({
            dirs: [],
            token: "",
        });

        // init our octokit for later use
        init(token);

        // get all the dirs we want to scan
        const scanningPaths = dirs.reduce((paths: string[], scanRoot: string) => {

            paths.push(...getSubDirPaths(scanRoot));

            return paths;

        }, []);

        await runner(scanningPaths);

        log("Ending Action");

    } catch (error) {

        if (error instanceof Error) {

            setFailed(error.message);

        } else {

            setFailed(error);
        }
    }
})();
