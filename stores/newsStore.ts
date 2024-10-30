import { defineStore } from "pinia";
import type { NewsItem } from "~/types/common";

export const useNewsStore = defineStore("newsStore", () => {
    const news = ref<NewsItem[]>([]);
    const searchQuery = ref("");

    const loader = ref(false);
    const emptyQuery = ref("");

    const setSearchQuery = (query = "") => {
        searchQuery.value = query;
    };

    const getNews = async (params = emptyQuery) => {
        loader.value = true;

        const base = "/api/news";
        const query = `${base}?search=${params.value}`;
        const data = await $fetch(query);
        news.value = data as NewsItem[];

        loader.value = false;
    };

    const filteredNews = (source: string) =>
        computed(() => {
            if (source === "all") return news.value;

            const hostnames = {
                mos: "www.mos.ru",
                ram: "news.rambler.ru",
            };

            const filtered = news.value.filter(
                (newsItem: NewsItem) =>
                    new URL(newsItem.link).hostname ===
                    hostnames[source as keyof typeof hostnames],
            );

            return filtered;
        });

    const newsPagesAmount = (source: string, newsList: NewsItem[]) =>
        computed(() => {
            const newsTotal = computed(() =>
                source === "all" ? news.value.length : newsList.length,
            );

            return Math.ceil((newsTotal.value || 0) / 4);
        });

    const newsSlice = (source: string, page: number) =>
        computed(() => {
            const NEWS_PER_PAGE = 4;
            const startIndex = (page - 1) * NEWS_PER_PAGE;
            const endIndex = page * NEWS_PER_PAGE;

            if (source === "all") return news.value.slice(startIndex, endIndex);

            return filteredNews(source).value.slice(startIndex, endIndex);
        });

    return {
        getNews,
        loader,
        news,
        newsPagesAmount,
        newsSlice,
        filteredNews,
        setSearchQuery,
        searchQuery,
    };
});
