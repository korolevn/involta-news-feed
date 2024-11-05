<template>
    <div>
        <LazyFilters v-model:display="display" />
        <div
            class="gap-5"
            :class="{
                'flex flex-wrap': display === 'feed',
                'flex flex-wrap md:grid grid-cols-2': display === 'grid',
            }"
        >
            <Skeleton
                v-if="isLoading"
                v-for="newsItem in newsStore.news"
                :display="display!"
                :key="newsItem.title"
            />
            <LazyNewsCard
                v-else
                v-for="newsItem in newsStore.news"
                :display="display!"
                :key="newsItem.link"
                :item="newsItem"
            />
            <LazyPagination class="col-span-2" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { LocationQueryValue } from "vue-router";

const newsStore = useNewsStore();

const display = useCookie("display");
const defaultDisplay = "grid";
display.value = display.value || defaultDisplay;

const route = useRoute();

const fetchNews = async () => {
    const { data, error, status } = await useAsyncData(
        "news",
        async () => {
            return {
                news: await newsStore.fetchNews({
                    search: route.query.search,
                    source: route.query.source as LocationQueryValue,
                    page: route.query.page as LocationQueryValue,
                }),
            };
        },
        { dedupe: "defer" },
    );

    if (error.value) {
        throw createError({
            statusCode: 500,
            statusMessage: "Невозможно получить данные",
        });
    }

    return { data, status };
};

const { status } = await fetchNews();
const isLoading = computed(() => status.value === "pending");

watch(route, async () => {
    await fetchNews();
});

definePageMeta({
    middleware: ["default"],
});
</script>
