<template>
    <div>
        <Filters v-model:display="disp" />
        <ClientOnly>
            <div
                class="gap-5"
                :class="{
                    'flex flex-wrap': disp === 'feed',
                    'flex flex-wrap md:grid grid-cols-2': disp === 'grid',
                }"
            >
                <NuxtPage :disp="disp" />
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
const disp = ref("grid");
const display = useLocalStorage("display", () => disp);

const newsStore = useNewsStore();
newsStore.getNews();
</script>
