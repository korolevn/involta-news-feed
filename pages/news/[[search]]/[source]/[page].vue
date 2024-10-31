<template>
    <Skeleton
        v-if="newsStore.loader"
        v-for="newsItem in newsList.value"
        :key="newsItem.title"
    />
    <NewsCard
        :disp="props.disp"
        v-else
        v-for="newsItem in newsList.value"
        :key="newsItem.link"
        :item="newsItem"
    />
    <Pagination
        class="col-span-2"
        :pages="pages"
        :current-page-number="currentPageNumber"
    />
</template>

<script setup lang="ts">
import type { NewsItem } from "~/types/common";

type Props = {
    currentPageNumber: number;
    pages: NewsItem[];
    disp: string;
};
const props = defineProps<Props>();

const route = useRoute();
const { source, page } = route.params;
const newsStore = useNewsStore();

const currentPageNumber = Number(page);
const pages = computed(() =>
    newsStore.newsPagesAmount(
        source.toString(),
        newsStore.filteredNews(source.toString()).value,
    ),
);
const newsList = computed(() =>
    newsStore.newsSlice(source.toString(), currentPageNumber),
);

definePageMeta({
    middleware: [
        function (to, from) {
            const SOURCES = ["all", "mos", "ram"];

            if (!SOURCES.includes(to.params.source as string)) {
                return navigateTo("/news/all/1");
            }
        },
    ],
});
</script>
