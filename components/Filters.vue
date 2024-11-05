<template>
    <div class="flex my-5 md:items-center justify-between md:my-7">
        <div class="flex gap-x-4 font-bold text-sm">
            <NuxtLink
                v-for="filter in filters"
                :key="filter.to"
                :class="{ 'text-blue': currentSource === filter.to }"
                :to="{
                    query: {
                        search: route.query.search,
                        source: filter.to,
                        page: 1,
                    },
                }"
            >
                {{ filter.text }}
            </NuxtLink>
        </div>
        <div class="flex items-center gap-x-2">
            <input
                class="hidden"
                type="radio"
                id="feed"
                v-model="display"
                value="feed"
            />
            <label class="cursor-pointer" for="feed">
                <svg
                    :class="{ 'fill-blue': display === 'feed' }"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="#C4C4C4"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="18" height="8" />
                    <rect y="10" width="18" height="8" />
                </svg>
            </label>
            <input
                class="hidden"
                type="radio"
                id="grid"
                v-model="display"
                value="grid"
            />
            <label class="cursor-pointer" for="grid">
                <svg
                    :class="{ 'fill-blue': display === 'grid' }"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="#C4C4C4"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="8" height="8" />
                    <rect y="10" width="8" height="8" />
                    <rect x="10" width="8" height="8" />
                    <rect x="10" y="10" width="8" height="8" />
                </svg>
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { INewsFilter } from "~/types/news";

const filters = ref<INewsFilter[]>([
    {
        text: "Все",
    },
    {
        text: "Rambler.ru",
        to: "ram",
    },
    {
        text: "Mos.ru",
        to: "mos",
    },
]);

const display = defineModel("display");

const route = useRoute();
const currentSource = computed(() => route.query.source);
</script>
