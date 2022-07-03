import { config } from "https://deno.land/std@0.146.0/dotenv/mod.ts";

export type Env = {
  BASIC_PASS: string;
  BASIC_USER: string;
  ENVIRONMENT: string;
};

export async function getEnv(): Promise<Env> {
  const env = await config({ defaults: "./basic-auth/.env.defaults" });

  return {
    BASIC_PASS: env.BASIC_PASS,
    BASIC_USER: env.BASIC_USER,
    ENVIRONMENT: env.ENVIRONMENT,
  };
}
