/* eslint-disable @typescript-eslint/no-unused-vars */
import  auth  from "@/features/auth/server/routes"
import { Hono } from "hono";
import { handle } from "hono/vercel";
import workspaces from "@/features/workspaces/server/route"

const app = new Hono().basePath("/api")


const routes = app
  .route("/auth", auth)
  .route("/workspaces", workspaces)





export const GET = handle(app);
export const POST = handle(app);

export type Apptype = typeof routes;