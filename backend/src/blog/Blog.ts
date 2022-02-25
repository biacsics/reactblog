import { getConnection } from 'typeorm';
import Blog from '../db/entities/Blog';

export async function getBlogList(): Promise<Blog[]> {
    return await getConnection().transaction(async (manager) => {
        const items = await manager
            .createQueryBuilder(Blog, 'blog')
            .select(['blog.id', 'blog.publishedAt', 'blog.title'])
            .getMany();

        return items;
    });
}

export async function getSingleBlog(blogID: string): Promise<Blog | undefined> {
    return await getConnection().transaction(async (manager) => {
        const item = await manager.createQueryBuilder(Blog, 'blog').where({ id: blogID }).getOne();

        return item;
    });
}

export async function createBlog(title: string, content: string): Promise<Blog> {
    return await getConnection().transaction(async (manager) => {
        const newBlogPost = new Blog();
        newBlogPost.title = title;
        newBlogPost.content = content;
        newBlogPost.publishedAt = new Date();

        const item = await manager.save(newBlogPost);

        return item;
    });
}
