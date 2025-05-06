// based on
// https://github.com/clumsyCoder00/Immich-Tools/blob/main/(deprecated)%20immich-del-offline.py

import {
  deleteAssets,
  getAllAlbums,
  getAuditFiles,
  getMyUser,
  init,
} from "@immich/sdk";
import { exit } from "process";
import urlJoin from "url-join";

const API_KEY = process.env.IMMICH_API_KEY;
const IMMICH_URL = process.env.IMMICH_URL;

if (!API_KEY || !IMMICH_URL) {
  console.log("!API_KEY || !IMMICH_URL");
  exit(1);
}

init({ baseUrl: urlJoin(IMMICH_URL, "api"), apiKey: API_KEY });

const user = await getMyUser();
const albums = await getAllAlbums({});
console.log({ user, albums });

const audit = await getAuditFiles();
const ids = audit.orphans.map((orphan) => orphan.entityId);

console.log(`delete ${ids.length}...`);
await deleteAssets({
  assetBulkDeleteDto: {
    ids: ids,
  },
});
console.log("delete ok");
