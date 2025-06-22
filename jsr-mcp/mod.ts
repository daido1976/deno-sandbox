import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getJsrDocs, searchJsrExports, listDenoStdPackages } from "./tools.ts";

// Create an MCP server
const server = new McpServer({
  name: "jsr-docs",
  version: "1.0.0",
});

// Get documentation for JSR packages
server.tool(
  "get_jsr_docs",
  {
    module: z.string().describe("The module to document, example @std/csv"),
  },
  async ({ module }) => {
    return await getJsrDocs(module);
  }
);

// Search exports in JSR packages
server.tool(
  "search_jsr_exports",
  {
    module: z.string().describe("The module to search in, example @std/csv"),
    query: z.string().describe("Search term, example 'parse'"),
  },
  async ({ module, query }) => {
    return await searchJsrExports(module, query);
  }
);

// List Deno standard library packages
server.tool("list_deno_std_packages", {}, async () => {
  return await listDenoStdPackages();
});

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
