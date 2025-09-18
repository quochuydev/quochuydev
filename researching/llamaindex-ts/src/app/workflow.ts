import { openai } from "@llamaindex/openai";
import { agent } from "@llamaindex/workflow";

export const workflowFactory = async (reqBody: any) => {
  console.log(`debug:reqBody?.data`, reqBody);

  // const index = await getIndex(reqBody?.data);

  // const queryEngineTool = index.queryTool({
  //   metadata: {
  //     name: "query_document",
  //     description: `This tool can retrieve information about Apple and Tesla financial data`,
  //   },
  //   includeSourceNodes: true,
  // });

  return agent({
    tools: [],
    llm: openai({
      baseURL: "https://api.deepseek.com",
      apiKey: process.env.DEEPSEEK_API_KEY,
      model: "deepseek-chat",
    }),
  });
};
