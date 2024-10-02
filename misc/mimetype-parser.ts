function parseFileMimeTypes(input: string): Record<string, string> {
  const result: Record<string, string> = {};

  // 正規表現でMIMEタイプの形式を定義
  const mimeTypeRegex = /^[a-z0-9-_.]+\/[a-z0-9-_.]+$/;

  // 改行で分割して行ごとに処理
  const lines = input.split("\n");
  lines.forEach((line) => {
    // 各行を ": " で分割してファイル名とMIMEタイプに分ける
    const parts = line.split(": ");
    if (parts.length === 2) {
      const fileName = parts[0];
      const mimeType = parts[1];

      // MIMEタイプが正しい形式であるか確認
      if (mimeTypeRegex.test(mimeType)) {
        result[fileName] = mimeType;
      }
    }
  });

  return result;
}

import { assertEquals } from "jsr:@std/assert";

Deno.test("parseFileMimeTypes - Basic Test", () => {
  const input = `go.mod: text/plain
go.sum: text/plain
main: application/x-mach-binary
main.go: text/x-c
main.py: text/plain
output: inode/directory
space txt: text/plain`;

  assertEquals(parseFileMimeTypes(input), {
    "go.mod": "text/plain",
    "go.sum": "text/plain",
    main: "application/x-mach-binary",
    "main.go": "text/x-c",
    "main.py": "text/plain",
    output: "inode/directory",
    "space txt": "text/plain",
  });
});

Deno.test("parseFileMimeTypes - Empty Input", () => {
  const input = ``;
  assertEquals(parseFileMimeTypes(input), {});
});

Deno.test("parseFileMimeTypes - Invalid MIME Types", () => {
  const input = `file1: invalid_mime
file2: invalid/mime-type/format
file3: text/plain`;

  assertEquals(parseFileMimeTypes(input), {
    file3: "text/plain",
  });
});

Deno.test("parseFileMimeTypes - Filename with Spaces", () => {
  const input = `file with spaces.txt: text/plain
file_without_spaces.txt: text/plain`;

  assertEquals(parseFileMimeTypes(input), {
    "file with spaces.txt": "text/plain",
    "file_without_spaces.txt": "text/plain",
  });
});

Deno.test("parseFileMimeTypes - Missing MIME Type", () => {
  const input = `file1:
file2: text/plain`;

  assertEquals(parseFileMimeTypes(input), {
    file2: "text/plain",
  });
});
