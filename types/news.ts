import type { LocationQueryValue } from "vue-router";
import type { INewsItem } from "./common";

export interface INewsFilter {
    text: string;
    to?: string;
}

export interface IQueryParams {
    search: LocationQueryValue | LocationQueryValue[] | undefined;
    source: LocationQueryValue;
    page: LocationQueryValue;
}

export interface INewsFeedsData {
    news: INewsItem[];
    pagesTotal: number;
}
