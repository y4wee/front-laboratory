<script setup>
const images = [
    {
        index: 0,
        name: "coffe work",
        url: "/img/slider/exo-ape/img-5.jpg",
    },
    {
        index: 1,
        name: "work and chill",
        url: "/img/slider/exo-ape/img-1.jpg",
    },
    {
        index: 2,
        name: "sound and keyboard",
        url: "/img/slider/exo-ape/img-4.jpg",
    },
    {
        index: 3,
        name: "developer agile",
        url: "/img/slider/exo-ape/img-6.jpg",
    },
    {
        index: 4,
        name: "bien-être naturel",
        url: "/img/slider/exo-ape/img-3.jpg",
    },
    {
        index: 5,
        name: "passion des banzaï",
        url: "/img/slider/exo-ape/img-2.jpg",
    },
];
const imageShowed = ref([0]);
const transition = ref({
    state: false,
    down: null,
    indexCurrent: 0,
    indexNext: 0,
});

const yDelta = ref(0);
const yStart = ref(0);
const ratio = ref(0);
const touchStart = (e) => {
    yStart.value = e.touches[0].clientY;
};
const touchEnd = (e) => {
    ratio.value = yStart.value - e.changedTouches[0].clientY;
    if (ratio.value > 40 || ratio.value < -40) {
        transitionStart();
    }
};
const wheel = (e) => {
    yDelta.value = e.deltaY;
    transitionStart();
};

const transitionStart = () => {
    let index = imageShowed.value[0];

    if (transition.value.state === false) {
        if (yDelta.value > 0 || ratio.value < -40) {
            transition.value.down = true;
            if (index === images.length - 1) {
                imageShowed.value.push(0);
            } else {
                imageShowed.value.push(index + 1);
            }
        }
        if (yDelta.value < 0 || ratio.value > 40) {
            transition.value.down = false;
            if (index === 0) {
                imageShowed.value.push(5);
            } else {
                imageShowed.value.push(index - 1);
            }
        }
        transition.value.state = true;
        yDelta.value = 0;
        ratio.value = 0;
    }
};
const transitionAfter = () => {
    imageShowed.value.splice(0, 1);
    transition.value.state = false;
};
</script>

<template>
    <div
        class="slider"
        @wheel="wheel"
        @touchstart="touchStart"
        @touchend="touchEnd"
    >
        <ExoapeFront
            :images="images"
            :imageShowed="imageShowed"
            :transition="transition"
        />
        <ExoapeBackground
            :images="images"
            :imageShowed="imageShowed"
            :transition="transition"
            @transitionEnd="transitionAfter"
        />
    </div>
</template>

<style lang="scss">
.slider {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: "Montserrat", sans-serif;
}
</style>
