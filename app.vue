<template>
    <div>
        <NuxtLayout>
            <NuxtErrorBoundary>
                <NuxtPage />

                <template #error="{ error }">
                    <div class="mt-6">
                        <h2 class="text-blue text-2xl font-bold mb-2">
                            Произошла ошибка при загрузке материалов
                        </h2>
                        <p class="mb-6">
                            {{ error.value.message }}
                        </p>
                        <p>
                            <button
                                class="border-2 hover:cursor-pointer py-1 px-3 rounded"
                                @click="resetError(error)"
                            >
                                Попробовать ещё раз
                            </button>
                        </p>
                    </div>
                </template>
            </NuxtErrorBoundary>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import type { H3Error } from "h3";

useHead({
    title: "Список новостей",
    link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    bodyAttrs: {
        class: "bg-main",
    },
    htmlAttrs: {
        class: "scrollbar-hide",
    },
});

const resetError = async (error: Ref<H3Error | null>) => {
    await navigateTo("/");
    error.value = null;
};
</script>
