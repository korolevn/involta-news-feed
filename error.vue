<template>
    <div class="flex flex-col justify-center items-center mt-20">
        <div class="text-blue text-5xl mb-7">Произошла ошибка</div>
        <div class="font-bold text-2xl">
            {{ error?.message }}
        </div>
        <p>
            На
            <a class="text-blue underline cursor-pointer" @click="handleError">
                главную
            </a>
            страницу
        </p>
    </div>
</template>

<script setup lang="ts">
const error = useError();
const handleError = () => {
    clearError({
        redirect: "/news/all/1",
    });
};
</script>
