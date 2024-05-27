import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const app = new Elysia()
  .use(cors()) 
  .get("/posts", async () => {
    const posts = await prisma.post.findMany();
    return posts;
  })
  .post('/posts', async ({ body }: { body: any }) => {
    const newPost = await prisma.post.create({ data: body })
    return newPost;
  })
  .put('/posts/:id', async ({ params, body }: { params: { id: string }, body: any }) => {
    console.log('Received update request:', params, body);
    const updatedPost = await prisma.post.update({
      where: { id: Number(params.id) },
      data: body,
    });
    console.log('Updated post:', updatedPost);
    return updatedPost;
  })
  .delete('/posts/:id', async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const deletedPost = await prisma.post.delete({ where: { id: parseInt(id) } })
    return deletedPost;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is listening at http://${app.server?.hostname}:${app.server?.port}`
);
