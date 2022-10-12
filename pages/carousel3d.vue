<script setup>
const cells = ref([
    {
        index: 0,
        image: "/img/img-1.jpg",
    },
    {
        index: 1,
        image: "/img/img-2.jpg",
    },
    {
        index: 2,
        image: "/img/img-3.jpg",
    },
    {
        index: 3,
        image: "/img/img-4.jpg",
    },
    {
        index: 4,
        image: "/img/img-5.jpg",
    },
    {
        index: 5,
        image: "/img/img-6.jpg",
    },
    {
        index: 6,
        image: "/img/img-3.jpg",
    },
]);
</script>

<template>
    <div class="main">
        <div class="overlay"></div>
        <Carousel3dCarousel
            :cells="cells"
            :cellsNb="10"
            :zoom="1"
            :touchSpeed="150"
        />
    </div>
</template>

<style lang="scss">
.overlay {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    box-shadow: inset 0px -10px 20px 0px rgba(0, 0, 0, 0.8),
        inset 0px 10px 20px 0px rgba(0, 0, 0, 0.8);
    pointer-events: none;
}
.main {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: black;
    overflow: hidden;
}
</style>
