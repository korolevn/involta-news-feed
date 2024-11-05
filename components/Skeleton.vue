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
                <div class="animate-pulse bg-slate-200 h-32 w-full rounded" />
            </div>
            <div
                :class="{ 'flex flex-col gap-5': isFeed, 'p-7 md:p-0': isGrid }"
                class="animate-pulse col-start-4 col-end-13"
            >
                <div
                    :class="{ 'mb-0 md:mb-5': isFeed, 'mb-6': isGrid }"
                    class="rounded-lg bg-slate-200 h-6 w-full"
                ></div>
                <div :class="{ 'mb-5': isGrid }" class="flex flex-col gap-y-1">
                    <div class="rounded bg-slate-200 h-2 w-full" />
                    <div class="rounded bg-slate-200 h-2 w-full" />
                    <div class="rounded bg-slate-200 h-2 w-full" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
type Props = {
    display: string;
};
const props = defineProps<Props>();

const isFeed = computed(() => props.display === "feed");
const isGrid = computed(() => props.display === "grid");
</script>
