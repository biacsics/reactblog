export interface SingleBlogResult {
    id: string;
    title: string;
    content: string;
    publishedAt: Date;
}

interface BlogListResultSingle {
    id: string;
    title: string;
    publishedAt: Date;
}

export type BlogListResult = BlogListResultSingle[];

export interface CreateBlogResultBody {
    id: string;
    title: string;
    content: string;
    publishedAt: Date;
}
