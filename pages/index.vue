<script setup>
const hash = useHash();
const cells = ref([
    {
        index: 0,
        category: "slider",
        details: ["Gsap", "Scroll / Touch", "Double Transition"],
        image: "/img/home/slider_exoape.jpg",
        video: "/video/slider_exoape.mp4",
        link: "/slider/exo-ape",
        github: "",
    },
    {
        index: 1,
        category: "carousel",
        details: ["Perspective3D", "Scroll / Touch", "Transition"],
        image: "/img/home/carousel_3d.jpg",
        video: "/video/carousel_3d.mp4",
        link: "/carousel/3d",
        github: "",
    },
    {
        index: 2,
        category: "canvas",
        details: ["Pixels", "Particles", "Physics"],
        image: "/img/home/canvas_hat.png",
        video: "/video/canvas_hat.mp4",
        link: "/canvas/particles-hat",
    },
    {
        index: 3,
        category: "nav",
        details: ["Gsap", "Slider", "Scroll / Touch"],
        image: "/img/home/nav_legends.jpg",
        video: "/video/nav_legends.mp4",
        link: "/nav/legends",
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
        <div class="homeLogo">
            <IndexLogo />
        </div>
        <div class="homeCarousel">
            <Carousel3dCarousel
                :cells="cells"
                :cellsNb="13"
                :zoom="1"
                :touchSpeed="150"
            />
        </div>
        <div class="homeContainer"></div>
        <IndexCelldetails :cells="cells" />
    </div>
</template>

<style scoped lang="scss">
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
    &Logo {
        z-index: 10;
        position: fixed;
        top: 0;
        display: flex;
        width: 100vw;
        height: 16vh;
        pointer-events: none;
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

</style>
