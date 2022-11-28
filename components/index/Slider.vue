<script setup>
import { gsap } from "gsap";

const { cells } = defineProps(["cells"]);

const index = useIndex();
const hash = useHash();
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
    tl.to(
        ".sliderCategoryContainer",
        {
            xPercent: -percent * index.value,
            duration: 1,
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
        if (index.value === cells.length - 1) {
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
        if (index.value === cells.length - 1) {
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

        <div class="sliderTools">
            <div class="warp" aria-labelledby="warp-label">
                <span id="warp-label" class="warp__placeholder"> Scroll </span>

                <span aria-role="presentation">
                    <span class="warp__0"> S </span>
                    <span class="warp__1"> c </span>
                    <span class="warp__2"> r </span>
                    <span class="warp__3"> o </span>
                    <span class="warp__4"> l </span>
                    <span class="warp__5"> l </span>
                </span>
            </div>

            <div class="sliderToolsSegments">
                <div class="sliderToolsSegmentsLeft"></div>
                <div class="sliderToolsSegmentsRight"></div>
            </div>

            <div class="sliderToolsPlay" @click="hash = cells[index].link">
                <img
                    src="~/assets/svg/play.svg"
                    alt="image du boutton play, demo"
                />
            </div>
        </div>

        <div class="sliderCategory">
            <div class="sliderCategoryContainer">
                <p v-for="cell in cells" :key="cell.index">
                    {{
                        cell.category
                            ? cell.category[0].toUpperCase() +
                              cell.category.substring(1)
                            : "..."
                    }}
                </p>
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
    &Tools {
        position: fixed;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        transform: translateY(40%);
        backdrop-filter: blur(20px);
        clip-path: circle(115px at 50% 50%);
        opacity: 0;
        &Play {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            transform: translateY(-30%);
            cursor: pointer;
            & img {
                width: 100%;
                height: 100%;
            }
        }
        &Segments {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 185px;
            height: 185px;
            border: solid 2px $orangeColor;
            border-radius: 50%;
            clip-path: polygon(
                0 0,
                60px 0,
                60px 40%,
                129px 40%,
                129px 0,
                100% 0,
                100% 40%,
                0 40%
            );
            &Left {
                position: absolute;
                width: 185px;
                height: 185px;
                border: solid 2px $greenColor;
                border-radius: 50%;
                clip-path: polygon(40% 0, 50% 0, 50% 50%);
                box-shadow: inset 0 0 2px $greenColor;
                animation: rotateSegmentLeft 2.5s 2s ease-in-out infinite;
            }
            &Right {
                position: absolute;
                width: 185px;
                height: 185px;
                border: solid 2px $greenColor;
                border-radius: 50%;
                clip-path: polygon(50% 0, 60% 0, 50% 50%);
                box-shadow: inset 0 0 2px $greenColor;
                animation: rotateSegmentRight 2.5s 2s ease-in-out infinite;
            }
        }
    }
    &Category {
        position: fixed;
        bottom: 0;
        right: calc(50% - 150px);
        width: 300px;
        height: 40px;
        overflow: hidden;
        &Container {
            display: flex;
            align-items: center;
            height: 100%;
            width: fit-content;
            & p {
                min-width: 300px;
                margin: 0;
                text-align: center;
                font-family: "Satisfy", cursive;
                font-size: 1.5rem;
                font-weight: bold;
                color: $orangeColor;
            }
        }
    }
}
.warp__placeholder {
    position: absolute;
    color: transparent;
    font-size: 0.1px;
}

.warp {
    display: block;
    position: relative;
    width: 230px;
    height: 230px;
    font-family: "Satisfy", cursive;
    font-size: 1.5rem;
    color: $orangeColor;
}

[class*="warp__"] {
    display: block;
    position: absolute;
}

.warp__0 {
    transform-origin: 50% 17px;
    transform: translate(90.2902px, 9.4093px) rotate(-0.243373rad);
}

.warp__1 {
    transform-origin: 50% 17px;
    transform: translate(101.5336px, 7.58240000000001px) rotate(-0.109092rad);
}

.warp__2 {
    transform-origin: 50% 17px;
    transform: translate(110.7481px, 7.14019999999999px) rotate(0.018246rad);
}

.warp__3 {
    transform-origin: 50% 17px;
    transform: translate(120.953px, 7.9375px) rotate(0.145485rad);
}

.warp__4 {
    transform-origin: 50% 17px;
    transform: translate(130.1776px, 9.349500000000006px) rotate(0.240241rad);
}

.warp__5 {
    transform-origin: 50% 17px;
    transform: translate(135.543px, 9.866600000000005px) rotate(0.310651rad);
}
@media all and (min-width: 700px) {
    .slider {
        &Category {
            top: 13%;
            right: -80px;
            height: 50px;
            transform: rotateZ(40deg);
            background-color: $orangeColor;
            & p {
                color: $mainColor;
            }
        }
        &ToolsPlay {
            transform: translateY(0%);
        }
    }
}
@keyframes rotateSegmentLeft {
    to {
        transform: rotateZ(-90deg);
    }
}
@keyframes rotateSegmentRight {
    to {
        transform: rotateZ(90deg);
    }
}
</style>
