<script setup lang="ts">
type Props = {
    iconName: string;
    width?: number;
    height?: number;
};

const props = withDefaults(defineProps<Props>(), {
    width: 20,
    height: 20,
});
</script>

<template>
    <LazyNuxtIcon
        class="ui-icon"
        :name="iconName"
        :style="{ width: props.width + 'px', height: props.height + 'px' }"
        filled
    />
</template>

<style scoped>
.ui-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: currentcolor;
}

.ui-icon:deep(svg) {
    width: 100%;
    height: 100%;
    margin-bottom: 0;
    color: currentcolor;
}
</style>
