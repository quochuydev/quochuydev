import { openai } from "@llamaindex/openai";
import { SimpleDirectoryReader } from "@llamaindex/readers/directory";
import { agent } from "@llamaindex/workflow";
import { VectorStoreIndex } from "llamaindex";

const reader = new SimpleDirectoryReader();
const documents = await reader.loadData("./project-1/input");
const index = await VectorStoreIndex.fromDocuments(documents);

const myAgent = agent({
  llm: openai({ model: "gpt-4o" }),
  tools: [index.queryTool({})],
});

await myAgent.run("What are the top themes in this story?");
