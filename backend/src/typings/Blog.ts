export interface SingleBlogResult {
    id: string;
    title: string;
    content: string;
    publishedAt: Date;
    modifiedAt: Date;
}

interface BlogListResultSingle {
    id: string;
    title: string;
    publishedAt: Date;
    modifiedAt: Date;
}

export type BlogListResult = BlogListResultSingle[];

export interface CreateBlogResultBody {
    id: string;
    title: string;
    content: string;
    publishedAt: Date;
    modifiedAt: Date;
}
