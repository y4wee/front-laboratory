<script setup>
const cells = ref([
    {
        index: 0,
    },
    {
        index: 1,
    },
    {
        index: 2,
    },
    {
        index: 3,
    },
    {
        index: 4,
    },
    {
        index: 5,
    },
    {
        index: 6,
    },
]);
</script>

<template>
    <div class="main">
        <Carousel3dCarousel
            :cells="cells"
            :cellsNb="13"
            :zoom="1"
            :touchSpeed="150"
        />
    </div>
</template>

<style lang="scss">
.main {
    z-index: 3;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    user-select: none;
}
</style>
