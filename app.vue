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
    bodyAttrs: {
        class: "bg-main",
    },
});
</script>
