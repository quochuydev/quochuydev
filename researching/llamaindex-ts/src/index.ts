import { LlamaIndexServer } from "@llamaindex/server";
import "dotenv/config";
import { eventStormingFactory } from "./app/eventStorming";
import { initSettings } from "./app/settings";

initSettings();

new LlamaIndexServer({
  workflow: eventStormingFactory,
  uiConfig: {
    componentsDir: "components",
    devMode: true,
  },
  llamaCloud: {
    outputDir: "output/llamacloud",
  },
}).start();
