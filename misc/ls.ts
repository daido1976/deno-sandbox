import { blue } from "https://deno.land/std@0.202.0/fmt/colors.ts";

class FilePresenter {
  #name: string;
  #isDirectory: boolean;

  constructor(name: string, isDirectory: boolean) {
    this.#name = name;
    this.#isDirectory = isDirectory;
  }

  toPretty(): string {
    return this.#isDirectory ? blue(this.#name) : this.#name;
  }
}

function getFilesFromDirectory(path: string): FilePresenter[] {
  return [...Deno.readDirSync(path)].map((entry) => {
    return new FilePresenter(entry.name, entry.isDirectory);
  });
}

function convertFilesToOutput(files: FilePresenter[]): string {
  return files.map((x) => x.toPretty()).join("  ");
}

const currentPath = Deno.cwd();
const files = getFilesFromDirectory(currentPath);
const output = convertFilesToOutput(files);
console.log(output);
