export interface NewsItem {
    id: string;
    header: string;
    content: string;
    image: string | null;
    datetime: string;
}

export type NewsWithoutId = Omit<NewsItem, 'id'>;

export interface Comment {
    id: string;
    news_id: string;
    author: string;
    description: string;
}

export type CommentWithoutId = Omit<Comment, 'id'>;