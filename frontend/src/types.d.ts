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
  datetime: string;
}

export interface Comment {
  id: string;
  news_id: string;
  author: string | null;
  description: string;
}
