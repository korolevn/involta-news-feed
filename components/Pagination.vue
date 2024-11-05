<template>
    <div
        class="flex justify-center w-full gap-x-5 mt-12 mb-32 text-lg font-bold col-span-2"
    >
        <NuxtLink
            v-for="page in newsStore.pagesTotal"
            :key="page"
            :class="{ 'text-blue': currentPage === page }"
            :to="{
                query: {
                    search: route.query.search,
                    source: route.query.source,
                    page,
                },
            }"
        >
            {{ page }}
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();

const newsStore = useNewsStore();
const currentPage = computed(() => Number(route.query.page));
</script>
