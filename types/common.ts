export interface NewsItem {
    title: string;
    link: string;
    pubDate: string;
    isoDate: string;
    enclosure?: {
        url: string;
        type: string;
    };
    content?: string;
    contentSnippet?: string;
}
