// MCPツールの実装を切り出したファイル

export async function getJsrDocs(module: string) {
  try {
    // @std/testingのようなサブモジュールのみを持つパッケージに対応
    const modulePath = module.match(/^@std\/testing$/)
      ? `${module}/bdd`
      : module;

    const result = await new Deno.Command(Deno.execPath(), {
      args: ["doc", "jsr:" + modulePath],
      env: { NO_COLOR: "1" },
    }).output();

    if (!result.success) {
      const errorText = new TextDecoder().decode(result.stderr);
      return {
        content: [
          {
            type: "text" as const,
            text: `Error getting docs for ${module}: ${errorText}`,
          },
        ],
      };
    }

    const output = new TextDecoder().decode(result.stdout);
    return {
      content: [{ type: "text" as const, text: output }],
    };
  } catch (error) {
    return {
      content: [{ type: "text" as const, text: `Error: ${error}` }],
    };
  }
}

export async function searchJsrExports(module: string, query: string) {
  try {
    // @std/testingのようなサブモジュールのみを持つパッケージに対応
    const modulePath = module.match(/^@std\/testing$/)
      ? `${module}/bdd`
      : module;

    const result = await new Deno.Command(Deno.execPath(), {
      args: ["doc", "--json", "jsr:" + modulePath],
      env: { NO_COLOR: "1" },
    }).output();

    if (!result.success) {
      // エラー詳細を含める
      const errorText = new TextDecoder().decode(result.stderr);
      return {
        content: [
          {
            type: "text" as const,
            text: `Error getting docs for ${module}: ${errorText}`,
          },
        ],
      };
    }

    const docData = JSON.parse(new TextDecoder().decode(result.stdout));
    const nodes = Array.isArray(docData.nodes) ? docData.nodes : [];

    interface DocNode {
      name?: string;
      jsDoc?: { doc?: string };
    }

    const matches = nodes.filter((item: unknown): item is DocNode => {
      if (typeof item !== "object" || item === null) return false;

      const obj = item as Record<string, unknown>;

      const hasName =
        typeof obj.name === "string" &&
        obj.name.toLowerCase().includes(query.toLowerCase());

      const jsDoc = obj.jsDoc as { doc?: unknown } | undefined;
      const hasDoc =
        jsDoc?.doc &&
        typeof jsDoc.doc === "string" &&
        jsDoc.doc.toLowerCase().includes(query.toLowerCase());

      return Boolean(hasName || hasDoc);
    });

    if (matches.length === 0) {
      return {
        content: [
          {
            type: "text" as const,
            text: `No matches for "${query}" in ${module}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text" as const,
          text: `Found ${matches.length} matches:\n\n${JSON.stringify(
            matches.slice(0, 5),
            null,
            2
          )}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [{ type: "text" as const, text: `Search error: ${error}` }],
    };
  }
}

export async function listDenoStdPackages() {
  try {
    // JSR APIから@stdスコープのパッケージ一覧を取得
    const response = await fetch("https://jsr.io/api/scopes/std/packages");

    if (!response.ok) {
      throw new Error(`JSR API returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      throw new Error("Unexpected API response format");
    }

    const packages = data.items
      .map((pkg: { name: string }) => `@std/${pkg.name}`)
      .sort();

    return {
      content: [
        {
          type: "text" as const,
          text: `📚 Deno Standard Library packages (${
            packages.length
          } total):\n${packages
            .map((p: string) => `• ${p}`)
            .join(
              "\n"
            )}\n\n💡 Use get_jsr_docs or search_jsr_exports to explore any package!`,
        },
      ],
    };
  } catch (error) {
    // フォールバック: 主要なパッケージのハードコードリスト
    const fallbackPackages = [
      "@std/assert",
      "@std/async",
      "@std/bytes",
      "@std/collections",
      "@std/crypto",
      "@std/csv",
      "@std/datetime",
      "@std/encoding",
      "@std/fs",
      "@std/http",
      "@std/json",
      "@std/log",
      "@std/path",
      "@std/streams",
      "@std/testing",
      "@std/text",
      "@std/url",
      "@std/uuid",
    ];

    return {
      content: [
        {
          type: "text" as const,
          text: `📚 Deno Standard Library packages (fallback list):\n${fallbackPackages
            .map((p: string) => `• ${p}`)
            .join(
              "\n"
            )}\n\n⚠️ Error fetching live data: ${error}\n💡 Use get_jsr_docs or search_jsr_exports to explore any package!`,
        },
      ],
    };
  }
}
