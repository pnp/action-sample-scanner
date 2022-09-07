import { RuleTuple } from "../types";
import * as packageVersion from "./package-version";

export default <RuleTuple[]>[[packageVersion.name, packageVersion.execute]];
