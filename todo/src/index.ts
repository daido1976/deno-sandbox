import { serve } from "https://deno.land/std@0.146.0/http/server.ts";
import { mainHandler } from "./main.ts";

await serve(mainHandler);
