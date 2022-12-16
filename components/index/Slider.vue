<script setup>
import { gsap } from "gsap";

const { projects } = defineProps(["projects"]);

const index = useIndex();
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
    let percent = 100 / projects.length;
    runTimeOut();
    let tl = gsap.timeline();

    tl.to(".sliderVideoContainer", {
        opacity: 0,
        duration: 0.1,
        ease: "sine.in",
        onComplete: () => (indexVideo.value = index.value),
    });
    tl.to(
        ".sliderImages",
        {
            yPercent: -percent * index.value,
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
        if (index.value === 0) {
            return false;
        }
        posStart.value = posMove.value;
        index.value--;
        animationSlide();
    }
    if (ratio >= 100) {
        if (index.value === projects.length - 1) {
            return false;
        }
        posStart.value = posMove.value;
        index.value++;
        animationSlide();
    }
};
const onWheel = (e) => {
    e.preventDefault();

    if (e.deltaY > 0) {
        if (index.value === projects.length - 1) {
            return false;
        }
        index.value++;
    }
    if (e.deltaY < 0) {
        if (index.value === 0) {
            return false;
        }
        index.value--;
    }
    animationSlide();
};

onMounted(() => {
    setTimeout(animationSlide, 500);
});
onUnmounted(() => {
    clearTimeout(timeOutVideo);
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
                v-for="project in projects"
                :key="project.index"
            >
                <img :src="project?.image" alt="image de présentation" />
            </div>
            <div class="sliderImagesOverlay"></div>
        </div>

        <div class="sliderVideo">
            <div class="sliderVideoContainer">
                <client-only>
                    <video
                        :src="projects[indexVideo].video"
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
$mainColor: rgb(28, 32, 32); // 1c2020
$secondColor: rgb(233, 222, 190); // e9debe
$thirdColor: rgb(227, 223, 223); // e3dfdf
$greenColor: rgb(86, 245, 105); // 56f569
$purpleColor: rgb(245, 86, 226); // f556e2
$orangeColor: rgb(242, 116, 5); // f27405
.slider {
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
            clip-path: inset(0% 100% 0% 0%);
            & video {
                object-fit: cover;
                width: 100%;
                height: 100%;
            }
        }
    }
    &Images {
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        min-height: 100%;
        &Container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 100vh;
            & img {
                object-fit: cover;
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
