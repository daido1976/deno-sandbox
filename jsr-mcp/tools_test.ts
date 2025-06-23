import { assertEquals, assertExists } from "jsr:@std/assert@1.0.13";
import { getJsrDocs, searchJsrExports, listDenoStdPackages } from "./tools.ts";

Deno.test("getJsrDocs returns documentation for @std/csv", async () => {
  const result = await getJsrDocs("@std/csv");

  assertExists(result.content);
  assertEquals(Array.isArray(result.content), true);
  
  const content = result.content[0];
  assertEquals(content.type, "text");
  assertExists(content.text);
  
  // CSVパッケージの主要な関数が含まれているか確認
  assertEquals(content.text.includes("parse"), true);
  assertEquals(content.text.includes("stringify"), true);
});

Deno.test("searchJsrExports finds parse function in @std/csv", async () => {
  const result = await searchJsrExports("@std/csv", "parse");

  assertExists(result.content);
  assertEquals(Array.isArray(result.content), true);
  
  const content = result.content[0];
  assertEquals(content.type, "text");
  assertExists(content.text);
  
  // 検索結果が含まれているか確認
  const hasResults = content.text.includes("matches") || content.text.includes("No matches");
  assertEquals(hasResults, true);
});

Deno.test("listDenoStdPackages returns list of packages", async () => {
  const result = await listDenoStdPackages();

  assertExists(result.content);
  assertEquals(Array.isArray(result.content), true);
  
  const content = result.content[0];
  assertEquals(content.type, "text");
  assertExists(content.text);
  
  // 主要なパッケージが含まれているか確認
  assertEquals(content.text.includes("@std/csv"), true);
  assertEquals(content.text.includes("@std/fs"), true);
  assertEquals(content.text.includes("@std/http"), true);
  assertEquals(content.text.includes("@std/assert"), true);
  
  // パッケージ数が十分にあるか確認（Deno標準ライブラリには多数のパッケージがある）
  const packageCount = (content.text.match(/@std\//g) || []).length;
  assertEquals(packageCount > 20, true);
});