// Utils for handling links
import { createHash } from "crypto";
import logger from "./logger";
const length = 20;
export const getHash = (url: string) => {
    try {
        const urlObj = new URL(url);
        const hash = createHash("sha256");
        hash.update(urlObj.href);
        return hash.digest("hex").slice(0, length);
    } catch (error) {
        logger.error("Error in getHash fn [links.ts]",error);
        throw new Error("Error in getHash fn [links.ts]");
    }
};