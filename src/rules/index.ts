import { RuleTuple } from "../types";
import * as packageVersion from "./package-version";
import * as lastModified from "./last-modified";
import * as spfxVersion from "./spfx-version";

export default <RuleTuple[]>[
    [packageVersion.name, packageVersion.execute],
    [lastModified.name, lastModified.execute],
    [spfxVersion.name, spfxVersion.execute],
];
