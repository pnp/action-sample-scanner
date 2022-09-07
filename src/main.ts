import { debug, log } from "./logging";
import { setFailed } from "@actions/core";
import { loadInputs, getSubDirPaths } from "./utils";

(async function (): Promise<void> {
    try {

        log("Starting action");

        log("Parsing Inputs");

        const { dirs } = loadInputs({
            dirs: [],
        });

        const scanningPaths = dirs.reduce((paths: string[], scanRoot: string) => {

            paths.push(...getSubDirPaths(scanRoot));

            return paths;
        
        }, []);

        // get our directories (the children of the supplied dirs)
        for (let i = 0; i < scanningPaths.length; i++) {
            debug(`Processing scanning path: '${scanningPaths[i]}'`);
        }

        //core.setOutput('time', new Date().toTimeString())

        log("Ending Action");

    } catch (error) {

        if (error instanceof Error) {

            setFailed(error.message);

        } else if (typeof error === "string") {

            setFailed(error);
        }
    }
})();
