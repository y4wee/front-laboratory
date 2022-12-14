<script setup>
let cells = [
    {
        index: 0,
        category: "slider",
        image: "/img/home/slider_exoape.jpg",
        video: "/video/slider_exoape.mp4",
        link: "/slider/exo-ape",
    },
    {
        index: 1,
        category: "carousel",
        image: "/img/home/carousel_3d.jpg",
        video: "/video/carousel_3d.mp4",
        link: "/carousel/3d",
    },
    {
        index: 2,
        category: "canvas",
        image: "/img/home/canvas_hat.png",
        video: "/video/canvas_hat.mp4",
        link: "/canvas/particles-hat",
    },
    {
        index: 3,
        category: "nav",
        image: "/img/home/nav_legends.jpg",
        video: "/video/nav_legends.mp4",
        link: "/nav/legends",
    },
    {
        index: 4,
        category: "grid",
        image: "/img/home/grid_miles.jpg",
        video: "/video/grid_miles.mp4",
        link: "/grid/miles",
    },
];
</script>

<template>
    <div class="home">
        <div class="homeLogo">
            <IndexLogo />
        </div>
        <IndexSlider :cells="cells" />
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
    &Logo {
        z-index: 10;
        position: fixed;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        transform: translateY(-40%);
        backdrop-filter: blur(20px);
        clip-path: circle(115px at 50% 50%);
        opacity: 0;
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
