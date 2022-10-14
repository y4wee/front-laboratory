<script setup>
const cells = ref([
    {
        index: 0,
        title: ["Title", "Title"],
        image: "/img/img-1.jpg",
    },
    {
        index: 1,
        title: ["Title", "Title", "Title"],
        image: "/img/img-2.jpg",
    },
    {
        index: 2,
        title: [""],
        image: "/img/img-3.jpg",
    },
    {
        index: 3,
        title: ["Title", "Title"],
        image: "/img/img-4.jpg",
    },
    {
        index: 4,
        title: ["Title", "Title", "Title"],
        image: "/img/img-5.jpg",
    },
    {
        index: 5,
        title: ["Title"],
        image: "/img/img-6.jpg",
    },
    {
        index: 6,
        title: [""],
        image: "/img/img-3.jpg",
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
