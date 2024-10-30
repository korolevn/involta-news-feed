<template>
    <div
        class="flex justify-center w-full gap-x-5 mt-12 mb-32 text-lg font-bold col-span-2"
    >
        <NuxtLink
            v-for="page in pages.value"
            :class="{ 'text-blue': page === currentPageNumber }"
            :to="`/news/${searchQuery}${source}/${page}`"
        >
            {{ page }}
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import type { NewsItem } from "~/types/common";

type Props = {
    currentPageNumber: number;
    pages: NewsItem[];
};
const props = defineProps<Props>();

const route = useRoute();
const { query, source, page } = route.params;

const searchQuery = computed(() => {
    return query ? `${query}/` : "";
});
</script>
