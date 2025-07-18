import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import { MultiFileLoader } from "langchain/document_loaders/fs/multi_file";
import {
  JSONLoader,
  JSONLinesLoader,
} from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";

if (process.env.ENV_PATH) {
  const defaultConfig = dotenv.parse(
    fs.readFileSync(path.join(process.cwd(), process.env.ENV_PATH))
  ) as { [key: string]: string };
  Object.entries(defaultConfig).forEach(([key, value]) => {
    if (!process.env[key]) process.env[key] = value;
  });
}

const loader = new MultiFileLoader(["./example_data/movies.json"], {
  ".json": (path) => new JSONLoader(path),
});

const docs = await loader.load();
console.log({ docs: JSON.stringify(docs, null, 2) });
