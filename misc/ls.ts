import { blue } from "https://deno.land/std@0.202.0/fmt/colors.ts";

type DirectoryEntry = {
  name: string;
  isDirectory: boolean;
};

function toPretty(entry: DirectoryEntry): string {
  return entry.isDirectory ? blue(entry.name) : entry.name;
}

function getEntriesFromDirectory(path: string): DirectoryEntry[] {
  return [...Deno.readDirSync(path)].map((entry) => {
    return {
      name: entry.name,
      isDirectory: entry.isDirectory,
    };
  });
}

function convertToOutput(entries: DirectoryEntry[]): string {
  return entries.map(toPretty).join("  ");
}

if (import.meta.main) {
  const targetPath = Deno.args.length > 0 ? Deno.args[0] : Deno.cwd();
  const entries = getEntriesFromDirectory(targetPath);
  const output = convertToOutput(entries);
  console.log(output);
}
