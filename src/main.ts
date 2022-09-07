import { debug } from "./logging";
import { setFailed } from "@actions/core";
import { loadInputs } from "./utils";

(async function (): Promise<void> {
    try {

        debug("Starting action");

        debug("Parsing Inputs");

        const inputs = loadInputs({
            dirs: [],
        });

        debug(`inputs: ${JSON.stringify(inputs)}`);

        console.log(JSON.stringify(inputs));

        // get dirs

        // run dir through each rule (sub process?)

        //core.setOutput('time', new Date().toTimeString())

        debug("Ending Action");

    } catch (error) {

        if (error instanceof Error) {

            setFailed(error.message);

        } else if (typeof error === "string") {

            setFailed(error);
        }
    }
})();
