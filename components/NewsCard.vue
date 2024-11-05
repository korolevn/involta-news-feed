<template>
    <div
        :class="{ 'p-0': isFeed, 'md:p-8': isGrid }"
        class="shadow-xs flex flex-col w-full rounded bg-white"
    >
        <div
            :class="{
                'flex flex-col gap-5 md:grid grid-cols-12 md:gap-8 p-6 md:p-7':
                    isFeed,
            }"
        >
            <div v-if="isFeed" class="col-start-1 col-end-4">
                <img
                    class="w-full object-cover"
                    :src="item.enclosure?.url"
                    :alt="item.title"
                />
            </div>
            <div
                :class="{ 'flex flex-col gap-5': isFeed, 'p-7 md:p-0': isGrid }"
                class="col-start-4 col-end-13"
            >
                <h3
                    :class="{ 'mb-0 md:mb-5': isFeed, 'mb-6': isGrid }"
                    class="text-blue text-lg font-bold leading-5"
                >
                    <NuxtLink :to="item.link" target="_blank">
                        {{ item.title }}
                    </NuxtLink>
                </h3>
                <p :class="{ 'mb-5': isGrid }" class="card-normal-text mb-0">
                    {{ item.content }}
                </p>
            </div>
        </div>
        <NuxtLink
            :class="{ 'md:hidden': isFeed }"
            class="card-normal-text block mb-5 px-6 md:p-0 text-blue underline"
            :to="item.link"
            target="_blank"
        >
            Подробнее
        </NuxtLink>
        <div
            :class="{ 'px-7 py-1 md:px-0 md:py-0 md:bg-transparent': isGrid }"
            class="flex justify-between items-end h-full py-1 px-6 bg-[#fcfcfc]"
        >
            <NuxtLink
                class="card-normal-text text-gray-md underline"
                :to="sourceLink"
                target="_blank"
            >
                {{ sourceURL }}
            </NuxtLink>
            <p class="card-normal-text text-gray-md">
                {{ pubDate }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import moment from "moment";
import type { INewsItem } from "~/types/common";

type Props = {
    item: INewsItem;
    display: string;
};
const props = defineProps<Props>();

const isFeed = computed(() => props.display === "feed");
const isGrid = computed(() => props.display === "grid");

const sourceURL = computed(() => new URL(props.item.link).hostname);
const sourceLink = `https://${sourceURL.value}`;
const pubDate = computed(() => moment(props.item.pubDate).format("DD.MM.YYYY"));
</script>

<style>
.card-normal-text {
    @apply leading-5 text-sm;
}
</style>
