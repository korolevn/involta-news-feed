import { defineStore } from "pinia";
import type { INewsItem } from "~/types/common";
import type { INewsFeedsData, IQueryParams } from "~/types/news";

export const useNewsStore = defineStore("newsStore", () => {
    const news = ref<INewsItem[]>([]);
    const pagesTotal = ref(0);

    const fetchNews = async (queryParams: IQueryParams) => {
        const endpointPath = "/api/news/";
        const query = useBuildUrl<IQueryParams>(endpointPath, queryParams);

        try {
            const data = await useFetchWithCache<INewsFeedsData>(query);

            pagesTotal.value = data.value.pagesTotal;
            news.value = data.value.news;
        } catch {
            throw createError({
                statusCode: 500,
                message: "Невозможно получить данные",
            });
        }
    };

    return {
        news,
        pagesTotal,
        fetchNews,
    };
});
