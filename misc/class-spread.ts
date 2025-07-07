// クラスのインスタンスをスプレッド構文でオブジェクトにマッピングする例

// 基本的なクラス定義
class Animal {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  speak(): string {
    return `${this.name} makes a sound`;
  }

  getInfo(): { name: string; age: number } {
    return { name: this.name, age: this.age };
  }
}

// クラスインスタンスをスプレッドする実験
const dog = new Animal("ポチ", 3);

// 1. 直接スプレッドした場合
const spreaded1 = { ...dog };
console.log("直接スプレッド:", spreaded1);
// 結果: { name: 'ポチ', age: 3 }
// メソッドは含まれない！

// 2. Object.assign を使った場合
const spreaded2 = Object.assign({}, dog);
console.log("Object.assign:", spreaded2);
// 結果: { name: 'ポチ', age: 3 }
// これもメソッドは含まれない

// 3. メソッドを含めたい場合は明示的に追加する必要がある
const spreaded3 = {
  ...dog,
  speak: dog.speak.bind(dog), // bindが必要
  getInfo: dog.getInfo.bind(dog),
};
console.log("メソッドを明示的に追加:", spreaded3);
console.log("speak()の結果:", spreaded3.speak());

// 4. より実践的な例：ファクトリー関数でラップする
function createEnhancedAnimal(baseAnimal: Animal) {
  return {
    // プロパティはスプレッドで取得
    ...baseAnimal,

    // メソッドは明示的に定義（thisコンテキストに注意）
    speak(): string {
      return baseAnimal.speak();
    },

    getInfo(): { name: string; age: number } {
      return baseAnimal.getInfo();
    },

    // 新しいプロパティ
    type: "enhanced" as const,

    // 新しいメソッド
    jump(): string {
      return `${baseAnimal.name} jumps!`;
    },
  };
}

const enhancedDog = createEnhancedAnimal(dog);
console.log("\n拡張されたオブジェクト:", enhancedDog);
console.log("speak():", enhancedDog.speak());
console.log("jump():", enhancedDog.jump());

// 5. プロトタイプチェーンを含めてコピーする方法
type AnimalWithMethods = Animal & {
  speak: () => string;
  getInfo: () => { name: string; age: number };
};

function getAllPropertiesAndMethods(obj: Animal): AnimalWithMethods {
  // より型安全なアプローチ
  const result = {
    name: obj.name,
    age: obj.age,
    speak: obj.speak.bind(obj),
    getInfo: obj.getInfo.bind(obj),
  };

  return result;
}

const fullCopy = getAllPropertiesAndMethods(dog);
console.log("\nプロトタイプメソッドを含むコピー:", fullCopy);
console.log("speak()の結果:", fullCopy.speak());

// まとめ:
// - スプレッド構文 {...instance} はインスタンスの列挙可能なプロパティのみコピー
// - メソッドはプロトタイプに定義されるため、スプレッドではコピーされない
// - メソッドを含めたい場合は明示的に追加する必要がある
// - thisバインディングに注意が必要
