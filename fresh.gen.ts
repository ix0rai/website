// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/about.tsx";
import * as $1 from "./routes/api/links.tsx";
import * as $2 from "./routes/api/projects.tsx";
import * as $3 from "./routes/api/wips.tsx";
import * as $4 from "./routes/index.tsx";
import * as $5 from "./routes/project/[name].tsx";
import * as $$0 from "./islands/Links.tsx";
import * as $$1 from "./islands/Projects.tsx";
import * as $$2 from "./islands/Wips.tsx";

const manifest = {
  routes: {
    "./routes/about.tsx": $0,
    "./routes/api/links.tsx": $1,
    "./routes/api/projects.tsx": $2,
    "./routes/api/wips.tsx": $3,
    "./routes/index.tsx": $4,
    "./routes/project/[name].tsx": $5,
  },
  islands: {
    "./islands/Links.tsx": $$0,
    "./islands/Projects.tsx": $$1,
    "./islands/Wips.tsx": $$2,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
