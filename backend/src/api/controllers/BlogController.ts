import { Get, JsonController, Param, Post, BodyParam, Patch } from 'routing-controllers';
import { BlogListResult, CreateBlogResultBody, SingleBlogResult } from '../../typings/Blog';
import * as BlogService from '../../blog/Blog';

@JsonController('/blog')
export default class BlogController {
    @Get('/')
    async list(): Promise<BlogListResult> {
        const list = await BlogService.getBlogList();
        return list;
    }

    @Get('/:blogId')
    async getItem(@Param('blogId') blogId: string): Promise<SingleBlogResult | undefined> {
        const item = await BlogService.getSingleBlog(blogId);
        return item;
    }

    @Post('/')
    async createBlogPost(
        @BodyParam('title') title: string,
        @BodyParam('content') content: string,
    ): Promise<CreateBlogResultBody> {
        const item = await BlogService.createBlog(title, content);

        return item;
    }

    @Patch('/:blogId')
    async updateItem(
        @Param('blogId') blogId: string,
        @BodyParam('title') title: string,
        @BodyParam('content') content: string
    ): Promise<SingleBlogResult | undefined> {
        const item = await BlogService.updateBlog(blogId, title, content);
        return item;
    }

}
