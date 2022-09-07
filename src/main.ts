import { log } from "./logging";
import { setFailed } from "@actions/core";
import { loadInputs } from "./utils";

(async function (): Promise<void> {
    try {

        log("Starting action");

        log("Parsing Inputs");

        const inputs = loadInputs({
            dirs: [],
        });

        log(`inputs: ${JSON.stringify(inputs)}`);


        // get dirs

        // run dir through each rule (sub process?)

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
