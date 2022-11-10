interface HasName {
  name: string;
}

class User implements HasName {
  name;
  #age;

  constructor(name: string, age: number) {
    this.name = name;
    this.#age = age;
  }

  isAdult(): boolean {
    return this.#age >= 20;
  }
}

const callName = (u: HasName) => {
  console.log("Hi", u.name);
};

const u = new User("daido", 10);
callName(u);
