<script setup>
const hash = useHash();
const cells = ref([
    {
        index: 0,
        category: "Slider",
        details: ["Gsap", "Scroll / Touch", "Double Transition"],
        image: "/img/carousel/slider_exoape.jpg",
        video: "/video/slider_exoape.mp4",
        link: "/slider",
        github: "",
    },
    {
        index: 1,
        category: "Carousel",
        details: ["Perspective3D", "Scroll / Touch", "Transition"],
        image: "/img/carousel/carousel_3d.jpg",
        video: "/video/carousel_3d.mp4",
        link: "/carousel3d",
        github: "",
    },
    {
        index: 2,
        category: "",
        image: "",
        link: "",
    },
    {
        index: 3,
        category: "",
        image: "",
        link: "",
    },
    {
        index: 4,
        category: "",
        image: "",
        link: "",
    },
    {
        index: 5,
        category: "",
        image: "",
        link: "",
    },
    {
        index: 6,
        category: "",
        image: "",
        link: "",
    },
]);
</script>

<template>
    <div class="home">
        <div class="homeLogoBack"></div>
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
            <img
                class="homeBackgroundGear homeBackgroundTop"
                src="~/assets/svg/gear.svg"
                alt="gear top"
            />
            <img
                class="homeBackgroundGear homeBackgroundBottom"
                src="~/assets/svg/gear.svg"
                alt="gear bottom"
            />
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
    background-color: #e3dfdf;
    font-family: "Montserrat", sans-serif;
    &Background {
        position: fixed;
        display: flex;
        justify-content: center;
        overflow: hidden;
        width: 100%;
        height: 100%;
        &Gear {
            position: absolute;
            height: 106.6vh;
            width: 106.6vh;
            filter: blur(5px);
        }
        &Top {
            top: -50vh;
            animation: gearTop 30s infinite linear;
        }
        &Bottom {
            top: 50vh;
            transform: rotateZ(13deg);
            animation: gearBottom 30s infinite linear;
        }
    }
    &Logo {
        z-index: 10;
        position: fixed;
        top: 0;
        display: flex;
        width: 100vw;
        height: 16vh;
        pointer-events: none;
        &Back {
            z-index: 4;
            position: fixed;
            top: 0;
            // background: white;
            // background-color: #e3dfdf;
            background-color: rgba($color: black, $alpha: 0.8);
            width: 100%;
            height: 16vh;
            pointer-events: none;
            border-bottom: solid 2px white;
        }
    }
    &Scroll {
        z-index: 3;
        position: fixed;
        right: 16px;
        display: flex;
        flex-direction: column;
        font-family: "Anton", sans-serif;
        font-size: 1.4rem;
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
        &Logo {
            justify-content: center;
            top: 10vh;
            &Back {
                display: none;
            }
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
@keyframes gearTop {
    to {
        transform: rotateZ(-360deg);
    }
}
@keyframes gearBottom {
    to {
        transform: rotateZ(373deg);
    }
}
</style>
