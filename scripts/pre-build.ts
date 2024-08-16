console.log('pre-build script is running...\n');

import { CacheType, getSpecialEpisodes } from "../src/lib/core.ts";
import fs from "fs";

const maxEpisodes = 1000;
const wantedNumber = 13;

const specialEpisodes = getSpecialEpisodes(0, maxEpisodes, wantedNumber);

const padLength = String(
  Math.max(...specialEpisodes.map((ep) => ep.num))
).length;

const cache : CacheType = {
  maxEpisodes,
  wantedNumber,
  padLength,
  specialEpisodes,
};

fs.writeFileSync('scripts/cache.json', JSON.stringify(cache, null, 2));



