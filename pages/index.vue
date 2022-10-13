<script setup>
import BackgroundIndex from "~/assets/lotties/home_background.json";

const hash = useHash();
const cells = ref([
    {
        index: 0,
        title: "slider",
        details: "Slider inspired by ExoApe, blablabla",
        image: "/img/carousel/slider_exoape.jpg",
        video: "/video/slider_exoape.mp4",
        link: "/slider",
        github: "",
    },
    {
        index: 1,
        title: "carousel3D",
        image: "/img/img-2.jpg",
        link: "/carousel3d",
    },
    {
        index: 2,
        title: "",
        image: "/img/img-3.jpg",
        link: "",
    },
    {
        index: 3,
        title: "",
        image: "/img/img-4.jpg",
        link: "",
    },
    {
        index: 4,
        title: "",
        image: "/img/img-5.jpg",
        link: "",
    },
    {
        index: 5,
        title: "",
        image: "/img/img-6.jpg",
        link: "",
    },
    {
        index: 6,
        title: "",
        image: "/img/img-4.jpg",
        link: "",
    },
]);
</script>

<template>
    <div class="home">
        <div class="homeLogo">
            <IndexLogo />
        </div>
        <div class="homeScroll">
            <div>S</div>
            <div>C</div>
            <div>R</div>
            <div>O</div>
            <div>L</div>
            <div>L</div>
        </div>
        <div class="homeCarousel">
            <Carousel3dCarousel
                :cells="cells"
                :cellsNb="13"
                :zoom="1"
                :touchSpeed="150"
            />
        </div>
        <div class="homeBackground">
            <client-only>
                <Vue3Lottie :animationData="BackgroundIndex" autoPlay loop />
            </client-only>
        </div>
        <IndexCelldetails :cells="cells" />
    </div>
</template>

<style lang="scss">
$mainColor: rgb(28, 32, 32); // 1c2020
$secondColor: rgb(233, 222, 190); // e9debe
$thirdColor: rgb(227, 223, 223); // e3dfdf
$greenColor: rgb(86, 245, 105); // 56f569
$purpleColor: rgb(245, 86, 226); // f556e2
$orangeColor: rgb(242, 116, 5); // f27405
.home {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    user-select: none;
    &Background {
        position: absolute;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        overflow: hidden;
        width: 105%;
        height: 105%;
        filter: blur(5px);
        & svg {
            width: 250% !important;
        }
    }
    &Logo {
        z-index: 10;
        position: fixed;
        top: 0;
        left: 10px;
    }
    &Scroll {
        z-index: 3;
        position: fixed;
        right: 16px;
        display: flex;
        flex-direction: column;
        font-family: "Anton", sans-serif;
        font-size: 1.5rem;
        color: #f27405;
    }
    &Carousel {
        z-index: 3;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
}
@media all and (min-width: 600px) {
    .home {
        &Carousel {
            align-items: flex-end;
            margin-bottom: 50px;
        }
        &Background {
            bottom: -15%;
            & svg {
                width: 100% !important;
            }
        }
        &Logo {
            left: calc(50% - 207px);
            top: 50px;
        }
        &Scroll {
            right: calc(50% - 73px);
            bottom: 16px;
            flex-direction: row;
            & div {
                margin: 0 5px;
            }
        }
    }
}
</style>
