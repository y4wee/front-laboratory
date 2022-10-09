<script setup>
const images = [
    {
        index: 0,
        name: "coffe work",
        url: "/img/img-5.jpg",
    },
    {
        index: 1,
        name: "work and chill",
        url: "/img/img-1.jpg",
    },
    {
        index: 2,
        name: "sound and keyboard",
        url: "/img/img-4.jpg",
    },
    {
        index: 3,
        name: "developer agile",
        url: "/img/img-6.jpg",
    },
    {
        index: 4,
        name: "bien-être naturel",
        url: "/img/img-3.jpg",
    },
    {
        index: 5,
        name: "passion des banzaï",
        url: "/img/img-2.jpg",
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
const yEnd = ref(0);
const ratio = ref(0);
const touchStart = (e) => {
    e.preventDefault();
    yStart.value = e.touches[0].clientY;
};
const touchEnd = (e) => {
    e.preventDefault();
    yEnd.value = e.changedTouches[0].clientY;
    ratio.value = yStart.value - yEnd.value;
    if (ratio.value > 40 || ratio.value < -40) {
        transitionStart();
    }
};
const wheel = (e) => {
    e.preventDefault();
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
        class="exoape"
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
@import url("https://fonts.googleapis.com/css2?family=Anton&family=Montserrat&display=swap");
.exoape {
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
