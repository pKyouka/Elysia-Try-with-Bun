//import prisma client
import prisma from "../../prisma/client";

/**
 * Getting all posts
 */
export async function getPosts() {
    try {
        //get all posts
        const posts = await prisma.post.findMany({ orderBy: { id: 'desc' } });

        //return response json
        return {
            success: true,
            message: "List Data Posts!",
            data: posts,
        };
    } catch (e: unknown) {
        console.error(`Error getting posts: ${e}`);
    }
}

/**
 * Creating a post
 */
export async function createPost(options: { title: string; content: string }) {
    try {

        //get title and content
        const { title, content } = options;

        //create data post
        const post = await prisma.post.create({
            data: {
                title: title,
                content: content,
            },
        });

        //return response json
        return {
            success: true,
            message: "Post Created Successfully!",
            data: post,
        }
    } catch (e: unknown) {
        console.error(`Error creating post: ${e}`);
    }
}

export async function getPostById(id: string){
    try{
        const postId = parseInt(id);

        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post){
            return {
                success: true,
                message: "Detail Not Found!",
                data: null,
            }
        }
        return{
            success: true,
            message: `Detail Data Post by ID : ${id}`,
            data: post,
        }
    }
    catch(e: unknown){
        console.error(`Error creating post: ${e}`);
    }
}

export async function updatePost(id: string, options:{ title?: string; content?: string}){
    try{
        const postId = parseInt(id);
        const { title, content} = options;

        const post = await prisma.post.update({
            where: { id: postId},
            data: {
                ...(title ? {title }: {}),
                ...(content ? {content}: {}),
            },
        });
        return {
            success: true,
            message: "Post Update Successfully!",
            data: post,
        }
    }
    catch (e: unknown){
        console.error(`Error Update post: ${e}`);
    }
}

export async function deletePost(id: string) {
    try {
        const postId = parseInt(id);
        await prisma.post.delete({
            where: { id: postId },
        });
        return {
            success: true,
            message: "Post Deleted Successfully!",
        }
    } catch (e: unknown) {
        console.error(`Error deleting post: ${e}`);
    }
}