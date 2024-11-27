// deno-lint-ignore ban-types
function SimpleClassLogger(target: Function) {
  console.log(`Class ${target.name} is being created.`);
}

// deno-lint-ignore no-explicit-any
function MethodLogger<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >
) {
  const methodName = String(context.name);

  function replacementMethod(this: This, ...args: Args): Return {
    console.log(`LOG: Entering method '${methodName}'.`);
    const result = target.call(this, ...args);
    console.log(`LOG: Exiting method '${methodName}'.`);
    return result;
  }

  return replacementMethod;
}

@SimpleClassLogger
class DecoratorExample {
  name: string;
  constructor(name: string) {
    console.log("Instance created");
    this.name = name;
  }

  @MethodLogger
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

new DecoratorExample("Alice").greet();
