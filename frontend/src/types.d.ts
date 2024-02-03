export interface Post {
  id: string;
  header: string;
  content: string;
  image: string | null;
  datetime: string;
}

export interface PostMutation {
  header: string;
  content: string;
  image: File | null;
}

export interface Comment {
  id: string;
  news_id: string;
  author: string | null;
  description: string;
}
export type CommentWithoutId = Omit<Comment, 'id'>;

export interface CommentMutation {
  news_id: string;
  author: string;
  description: string;
}
