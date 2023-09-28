class FilePresenter {
  #name: string;
  #isDirectory: boolean;

  constructor(name: string, isDirectory: boolean) {
    this.#name = name;
    this.#isDirectory = isDirectory;
  }

  toPretty(): string {
    return this.#isDirectory ? `\x1b[34m${this.#name}\x1b[0m` : this.#name;
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
