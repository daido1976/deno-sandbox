class FilePresenter {
  constructor(private name: string, private isDirectory: boolean) {}

  toPretty(): string {
    return this.isDirectory ? `\x1b[34m${this.name}\x1b[0m` : this.name;
  }
}

function listCurrentDirectory() {
  // カレントディレクトリを取得
  const currentPath = Deno.cwd();

  // ディレクトリの中のエントリを取得し、それぞれのエントリにFilePresenterを適用
  const files = [...Deno.readDirSync(currentPath)].map((entry) => {
    return new FilePresenter(entry.name, entry.isDirectory);
  });

  // FilePresenterを使用して、エントリを適切に表示する
  const output = files.map((x) => x.toPretty()).join("  ");

  console.log(output); // 最後に改行を追加
}

listCurrentDirectory();
