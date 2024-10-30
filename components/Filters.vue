<template>
    <div class="flex my-5 md:items-center justify-between md:my-7">
        <div class="flex gap-x-4 font-bold text-sm">
            <NuxtLink v-for="filter in filters">
                {{ filter.text }}
            </NuxtLink>
        </div>
        <div class="flex items-center gap-x-2">
            <input class="hidden" type="radio" id="feed" value="feed" />
            <label class="cursor-pointer" for="feed">
                <svg
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
            <input class="hidden" type="radio" id="grid" value="grid" />
            <label class="cursor-pointer" for="grid">
                <svg
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
const filters = ref([
    {
        text: "Все",
        to: "all",
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
</script>
