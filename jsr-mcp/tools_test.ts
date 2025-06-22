// tools.tsの実装をテストする

import { getJsrDocs, searchJsrExports, listDenoStdPackages } from "./tools.ts";

async function testGetJsrDocs() {
  console.log("🧪 Testing getJsrDocs...");

  try {
    const result = await getJsrDocs("@std/csv");

    if (!result.content || !Array.isArray(result.content)) {
      throw new Error("Invalid response structure");
    }

    const content = result.content[0];
    if (content.type !== "text" || typeof content.text !== "string") {
      throw new Error("Invalid content structure");
    }

    console.log(`✅ getJsrDocs works`);
    console.log(`📄 Content length: ${content.text.length}`);
    console.log(`📄 Sample: ${content.text.substring(0, 100)}...`);

    // CSVパッケージの特定の関数が含まれているかチェック
    const hasParseFunction = content.text.includes("parse");
    const hasStringifyFunction = content.text.includes("stringify");

    console.log(`🔍 Contains 'parse' function: ${hasParseFunction}`);
    console.log(`🔍 Contains 'stringify' function: ${hasStringifyFunction}`);

    return true;
  } catch (error) {
    console.log(`❌ getJsrDocs failed: ${error}`);
    return false;
  }
}

async function testSearchJsrExports() {
  console.log("\n🧪 Testing searchJsrExports...");

  try {
    const result = await searchJsrExports("@std/csv", "parse");

    if (!result.content || !Array.isArray(result.content)) {
      throw new Error("Invalid response structure");
    }

    const content = result.content[0];
    if (content.type !== "text" || typeof content.text !== "string") {
      throw new Error("Invalid content structure");
    }

    console.log(`✅ searchJsrExports works`);
    console.log(`📄 Response: ${content.text.substring(0, 200)}...`);

    // parseに関連する結果が含まれているかチェック
    const hasMatches =
      content.text.includes("matches") || content.text.includes("No matches");
    console.log(`🔍 Has search results: ${hasMatches}`);

    return true;
  } catch (error) {
    console.log(`❌ searchJsrExports failed: ${error}`);
    return false;
  }
}

async function testListDenoStdPackages() {
  console.log("\n🧪 Testing listDenoStdPackages...");

  try {
    const result = await listDenoStdPackages();

    if (!result.content || !Array.isArray(result.content)) {
      throw new Error("Invalid response structure");
    }

    const content = result.content[0];
    if (content.type !== "text" || typeof content.text !== "string") {
      throw new Error("Invalid content structure");
    }

    console.log(`✅ listDenoStdPackages works`);
    console.log(`📄 Response length: ${content.text.length}`);

    // 主要なパッケージが含まれているかチェック
    const hasStdCsv = content.text.includes("@std/csv");
    const hasStdFs = content.text.includes("@std/fs");
    const hasStdHttp = content.text.includes("@std/http");

    console.log(`🔍 Contains @std/csv: ${hasStdCsv}`);
    console.log(`🔍 Contains @std/fs: ${hasStdFs}`);
    console.log(`🔍 Contains @std/http: ${hasStdHttp}`);

    // パッケージ数をカウント
    const packageCount = (content.text.match(/@std\//g) || []).length;
    console.log(`📦 Package count: ${packageCount}`);

    return true;
  } catch (error) {
    console.log(`❌ listDenoStdPackages failed: ${error}`);
    return false;
  }
}

async function testAllFunctions() {
  console.log("🚀 Running comprehensive tests for tools.ts functions\n");

  const results = await Promise.all([
    testGetJsrDocs(),
    testSearchJsrExports(),
    testListDenoStdPackages(),
  ]);

  const passedTests = results.filter((r) => r).length;
  const totalTests = results.length;

  console.log(`\n📊 Test Results: ${passedTests}/${totalTests} passed`);

  if (passedTests === totalTests) {
    console.log(
      "🎉 All tests passed! The tools.ts implementation is working correctly."
    );
  } else {
    console.log("⚠️ Some tests failed. Please check the implementation.");
  }

  return passedTests === totalTests;
}

if (import.meta.main) {
  await testAllFunctions();
}
