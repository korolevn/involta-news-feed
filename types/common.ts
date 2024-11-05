export interface INewsItem {
    creator?: string;
    title: string;
    link: string;
    pubDate: string;
    isoDate: string;
    author?: string;
    enclosure?: {
        description?: string;
        width?: string;
        height?: string;
        type?: string;
        url: string;
    };
    content?: string;
    contentSnippet?: string;
}
