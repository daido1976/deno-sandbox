function parseFileMimeTypes(input: string): Record<string, string> {
  const mimeTypeRegex = /^[a-z0-9-_.]+\/[a-z0-9-_.]+$/;

  return input
    .split("\n")
    .map((line) => line.split(": ", 2))
    .filter(([_fileName, mimeType]) => mimeTypeRegex.test(mimeType))
    .reduce<Record<string, string>>((acc, [fileName, mimeType]) => {
      acc[fileName] = mimeType;
      return acc;
    }, {});
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
