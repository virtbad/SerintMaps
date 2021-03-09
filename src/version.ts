import { version as packageVersion } from "../package.json";
import { Status } from "./types";

/**
 * Generate a version string depending on the current package version and the version status
 *
 * @param status status of the version [alpha, beta, prerelease, release]
 *
 * @returns string
 */

export const version = (status: Status) => `${packageVersion}${status}`;
