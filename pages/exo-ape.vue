<script setup>
const images = [
    {
        index: 0,
        name: "mug",
        url: "/img/img-5.jpg",
    },
    {
        index: 1,
        name: "clock",
        url: "/img/img-1.jpg",
    },
    {
        index: 2,
        name: "keyboard",
        url: "/img/img-4.jpg",
    },
    {
        index: 3,
        name: "developement",
        url: "/img/img-6.jpg",
    },
    {
        index: 4,
        name: "cactus",
        url: "/img/img-3.jpg",
    },
    {
        index: 5,
        name: "banzaï",
        url: "/img/img-2.jpg",
    },
];
const imageShowed = ref([1]);

const wheel = (e) => {
    if (e.deltaY > 0) {
        let index = imageShowed.value[0];
        console.log("scroll down");
        if (index === images.length - 1) {
            imageShowed.value.splice(0, 1, 0);
        } else {
            imageShowed.value.splice(0, 1, index + 1);
        }
    }
    if (e.deltaY < 0) {
        let index = imageShowed.value[0];
        console.log("scroll up");
        if (index === 0) {
            imageShowed.value.splice(0, 1, 5);
        } else {
            imageShowed.value.splice(0, 1, index - 1);
        }
    }
    console.log(images.length);
};
</script>

<template>
    <div class="exoape" @wheel="wheel" @touchmove="wheel">
        <ExoapeFront :images="images" :imageShowed="imageShowed" />
        <ExoapeBackground :images="images" :imageShowed="imageShowed" />
    </div>
</template>

<style lang="scss">
.exoape {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>
