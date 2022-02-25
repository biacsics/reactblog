export interface PostListItem {
  id: string;
  title: string;
  publishedAt: string;
  modifiedAt: string;
}

export type PostList = PostListItem[];
