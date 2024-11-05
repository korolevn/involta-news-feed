<template>
    <header
        class="flex flex-col pb-6 md:flex-row gap-y-5 items-center justify-between py-9 border-b border-gray-lt"
    >
        <div class="flex w-full justify-between md:justify-normal">
            <h1 class="text-2xl md:text-4xl font-bold text-nowrap">
                Список новостей
            </h1>
            <button
                class="flex justify-center items-center ml-[30px] w-10 h-10 rounded-full bg-white text-blue shadow-xs"
                @click="reset"
            >
                <UiIcon icon-name="reset-icon" :width="20" :height="16" />
            </button>
        </div>
        <form class="relative flex self-stretch" @submit.prevent="submit">
            <input
                class="h-10 w-full md:h-auto min-w-80 pl-3 pr-10 rounded shadow-xs focus:outline-none focus:ring focus:border-blue"
                type="text"
                placeholder="Введите запрос"
                v-model="searchQuery"
                ref="search"
            />
            <button class="absolute flex top-2/4 right-3 -translate-y-2/4">
                <UiIcon icon-name="search-icon" />
            </button>
        </form>
    </header>
</template>

<script setup lang="ts">
import UiIcon from "./UiIcon.vue";

const searchQuery = ref("");

const router = useRouter();
const route = useRoute();
const { source } = route.query;

const reset = () => {
    searchQuery.value = "";
    navigateTo("/");
};

const submit = () => {
    router.push({ query: { search: searchQuery.value, source, page: 1 } });
};
</script>
