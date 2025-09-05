import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import dotenv from "dotenv";
import fs from "fs";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { MultiFileLoader } from "langchain/document_loaders/fs/multi_file";
import { TextLoader } from "langchain/document_loaders/fs/text";
import path from "path";

if (process.env.ENV_PATH) {
  const defaultConfig = dotenv.parse(
    fs.readFileSync(path.join(process.cwd(), process.env.ENV_PATH))
  ) as { [key: string]: string };
  Object.entries(defaultConfig).forEach(([key, value]) => {
    if (!process.env[key]) process.env[key] = value;
  });
}

const loader = new MultiFileLoader(
  [
    // "./example_data/movies.json",
    "./example_data/security-key.pdf",
    "./example_data/teddy.jpeg",
  ],
  {
    ".json": (path) => new JSONLoader(path),
    ".pdf": (path) => new PDFLoader(path),
    ".txt": (path) => new TextLoader(path),
    ".csv": (path) => new CSVLoader(path),
  }
);

const docs = await loader.load();
console.log({ docs: JSON.stringify(docs) });
