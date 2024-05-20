import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { PrismaClient } from "@prisma/client";

const app = new Elysia()
  .use(cors()) 
  .get("/posts", async () => {
    const prisma = new PrismaClient();
    const posts = await prisma.post.findMany();
    return posts;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is listening at http://${app.server?.hostname}:${app.server?.port}`
);