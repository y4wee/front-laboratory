<script setup>
import { gsap } from "gsap";

const { cells } = defineProps(["cells"]);

const indexSlide = ref(0);
const indexVideo = ref(0);

const animationVideo = () => {
    let tl = gsap.timeline();

    tl.to(".sliderVideoContainer", {
        clipPath: "inset(0% 100% 0% 0%)",
        duration: 0,
    });
    tl.to(".sliderVideoContainer", {
        opacity: 1,
        duration: 0,
    });
    tl.to(".sliderVideoContainer", {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.3,
        ease: "sine.in",
    });
};
const animationSlide = () => {
    let percent = 100 / cells.length;
    runTimeOut();
    let tl = gsap.timeline();

    tl.to(".sliderVideoContainer", {
        opacity: 0,
        // clipPath: "inset(0% 0% 0% 100%)",
        duration: 0.1,
        ease: "sine.in",
        onComplete: () => (indexVideo.value = indexSlide.value),
    });
    tl.to(
        ".sliderImages",
        {
            yPercent: -percent * indexSlide.value,
            duration: 1.5,
            ease: "expo.out",
        },
        "-= 0.3"
    );
};
let timeOutVideo;

const runTimeOut = () => {
    if (timeOutVideo != undefined) {
        clearTimeout(timeOutVideo);
    }
    timeOutVideo = setTimeout(animationVideo, 2000);
};

const posStart = ref(0);
const posMove = ref(0);

const touchStart = (e) => {
    posStart.value = e.touches[0].clientY;
};
const touchEnd = (e) => {
    posStart.value = posMove.value = 0;
};
const touchMove = (e) => {
    posMove.value = e.changedTouches[0].clientY;
    let ratio = posStart.value - posMove.value;
    if (ratio <= -100) {
        if (indexSlide.value === 0) {
            return false;
        }
        posStart.value = posMove.value;
        indexSlide.value--;
        animationSlide();
    }
    if (ratio >= 100) {
        if (indexSlide.value === cells.length - 1) {
            return false;
        }
        posStart.value = posMove.value;
        indexSlide.value++;
        animationSlide();
    }
};
const onWheel = (e) => {
    e.preventDefault();

    if (e.deltaY > 0) {
        if (indexSlide.value === cells.length - 1) {
            return false;
        }
        indexSlide.value++;
    }
    if (e.deltaY < 0) {
        if (indexSlide.value === 0) {
            return false;
        }
        indexSlide.value--;
    }
    animationSlide();
};

onMounted(() => {
    runTimeOut();
});
</script>

<template>
    <div
        class="slider"
        @wheel="onWheel"
        @touchstart="touchStart"
        @touchend="touchEnd"
        @touchmove="touchMove"
    >
        <div class="sliderImages">
            <div
                class="sliderImagesContainer"
                v-for="cell in cells"
                :key="cell.index"
            >
                <img :src="cell.image" alt="test" />
            </div>
            <div class="sliderImagesOverlay"></div>
        </div>

        <div class="sliderVideo">
            <div class="sliderVideoContainer">
                <client-only>
                    <video
                        :src="cells[indexVideo].video"
                        playsInline
                        muted
                        loop
                        autoplay
                    ></video>
                </client-only>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.slider {
    // display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &Video {
        position: fixed;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        &Container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            // max-width: 300px;
            // margin: 0 10px;
            clip-path: inset(0% 100% 0% 0%);
            & video {
                object-fit: cover;
                object-position: center;
                width: 100%;
                height: 100%;
            }
        }
    }
    &Images {
        position: fixed;
        top: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        &Container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 100vh;
            & img {
                object-fit: cover;
                object-position: center;
                width: 100%;
                height: 100%;
            }
        }
        &Overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba($color: white, $alpha: 0.1);
        }
    }
}
</style>
