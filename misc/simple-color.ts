// deno-lint-ignore-file no-explicit-any

// See. https://mmazzarolo.com/blog/2022-08-25-simple-colored-logging-for-javascript-clis/
const logger = {
  ...console,
  success: (...args: any) => console.log("\x1b[32m✔\x1b[0m", ...args),
  failure: (...args: any) => console.error("\x1b[31mx\x1b[0m", ...args),
};

logger.success("Files copied successfully");
logger.failure("Unable to delete the 'system32' directory");

// for Deno & Browser (Does not work on node.js)
const logger2 = {
  ...console,
  success: (...args: any) => console.log("%c✔", "color: green", ...args),
  failure: (...args: any) => console.error("%cx", "color: red", ...args),
};

logger2.success("logger2: Files copied successfully");
logger2.failure("logger2: Unable to delete the 'system32' directory");

// for Deno only
import { green, red } from "jsr:@std/fmt/colors";

const logger3 = {
  ...console,
  success: (...args: any) => console.log(green("✔"), ...args),
  failure: (...args: any) => console.error(red("x"), ...args),
};

logger3.success("logger3: Files copied successfully");
logger3.failure("logger3: Unable to delete the 'system32' directory");
