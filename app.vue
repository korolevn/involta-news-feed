<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
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
</script>
