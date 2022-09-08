import { RuleTuple } from "../types";
import * as packageVersion from "./package-version";
import * as lastModified from "./last-modified";

export default <RuleTuple[]>[
    [packageVersion.name, packageVersion.execute],
    [lastModified.name, lastModified.execute]
];
