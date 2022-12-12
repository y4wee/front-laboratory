<script setup>
import { gsap } from "gsap";
import ButtonBack from "~~/components/buttonBack.vue";
const mobile = useMobile();

let cells = [
    {
        index: 0,
        image: "/img/slider/exo-ape/img-1.jpg",
        position: 0,
    },
    {
        index: 1,
        image: "/img/slider/exo-ape/img-2.jpg",
        position: 1,
    },
    {
        index: 2,
        image: "/img/slider/exo-ape/img-3.jpg",
        position: -1,
    },
    {
        index: 3,
        image: "/img/slider/exo-ape/img-4.jpg",
        position: 2,
    },
    {
        index: 4,
        image: "/img/slider/exo-ape/img-5.jpg",
        position: -2,
    },
    {
        index: 5,
        image: "/img/slider/exo-ape/img-6.jpg",
        position: 3,
    },
];
let cellSorted = [...cells].sort((a, b) => {
    return a.position - b.position;
});

const grabState = ref(false);
const modeMosaique = ref(false);
const modeSlider = ref(false);
const sliderIndex = ref(0);

const xMax = computed(() => {
    return (
        (document.querySelector(".gridContainer").offsetWidth -
            document.querySelector(".grid").offsetWidth) /
        2
    );
});
const yMax = computed(() => {
    return (
        (document.querySelector(".gridContainer").offsetHeight -
            document.querySelector(".grid").offsetHeight) /
        2
    );
});
// event wheel slider
const wheelSlider = (e) => {
    if (modeSlider.value) {
        if (e.deltaY < 0 && sliderIndex.value !== 0) {
            sliderIndex.value--;
            animationSlider();
        }
        if (e.deltaY > 0 && sliderIndex.value !== cells.length - 1) {
            sliderIndex.value++;
            animationSlider();
        }
    }
};
// event touch slider
let posStart = 0;
let posMove = 0;
const touchSliderStart = (e) => {
    if (modeSlider.value) {
        if (mobile.value) {
            posStart = e.touches[0].clientY;
        } else {
            posStart = e.touches[0].clientX;
        }
    }
};
const touchSliderEnd = () => {
    if (modeSlider.value) {
        posStart = posMove = 0;
    }
};
const touchSliderMove = (e) => {
    if (modeSlider.value) {
        if (mobile.value) {
            posMove = e.changedTouches[0].clientY;
        } else {
            posMove = e.changedTouches[0].clientX;
        }
        let ratio = posStart - posMove;
        if (ratio <= -100 && sliderIndex.value !== 0) {
            posStart = posMove;
            sliderIndex.value--;
            animationSlider();
        }
        if (ratio >= 100 && sliderIndex.value !== cells.length - 1) {
            posStart = posMove;
            sliderIndex.value++;
            animationSlider();
        }
    }
};
// animation slider translate
const animationSlider = () => {
    let sliderCellWidth = document.querySelector(".gridSliderCell").offsetWidth;
    let sliderCellHeight =
        document.querySelector(".gridSliderCell").offsetHeight;

    gsap.to(".gridSlider", {
        translateX: mobile.value
            ? 0
            : `${-sliderCellWidth * cellSorted[sliderIndex.value].position}px`,
        translateY: mobile.value
            ? `${-sliderCellHeight * cellSorted[sliderIndex.value].position}px`
            : 0,
        duration: duration,
        ease: "sine.out",
    });
};
// events to touch & mouse grabbing
let xMove = 0;
let yMove = 0;
const grabbing = () => {
    if (yMove > yMax.value) {
        yMove = yMax.value;
    }
    if (yMove < -yMax.value) {
        yMove = -yMax.value;
    }
    if (xMove > xMax.value) {
        xMove = xMax.value;
    }
    if (xMove < -xMax.value) {
        xMove = -xMax.value;
    }
    gsap.to(".gridContainer", {
        translateX: `${xMove}px`,
        translateY: `${yMove}px`,
        duration: 1.2,
        ease: "power4.out",
    });
};

const mouseStart = () => {
    if (modeMosaique.value) {
        grabState.value = true;
        document.querySelector(".grid").style.cursor = "grabbing";
    }
};
const mouseMove = (e) => {
    if (grabState.value) {
        xMove += e.movementX * 1.4;
        yMove += e.movementY * 1.4;

        grabbing();
    }
};
const mouseEnd = () => {
    if (modeMosaique.value) {
        grabState.value = false;
        document.querySelector(".grid").style.cursor = "grab";
    }
};

let xStart = 0;
let yStart = 0;
let xMoving = 0;
let yMoving = 0;
const touchStart = (e) => {
    if (modeMosaique.value) {
        grabState.value = true;
        xStart = e.touches[0].clientX;
        yStart = e.touches[0].clientY;
    }
};
const touchMove = (e) => {
    if (grabState.value) {
        xMoving = e.changedTouches[0].clientX;
        yMoving = e.changedTouches[0].clientY;

        let xRatio = xStart - xMoving;
        let yRatio = yStart - yMoving;

        if (xRatio <= -10) {
            xStart = xMoving;
            xMove += 20;
        }
        if (xRatio >= 10) {
            xStart = xMoving;
            xMove -= 20;
        }
        if (yRatio <= -10) {
            yStart = yMoving;
            yMove += 20;
        }
        if (yRatio >= 10) {
            yStart = yMoving;
            yMove -= 20;
        }
        grabbing();
    }
};
const touchEnd = (e) => {
    if (modeMosaique.value) {
        grabState.value = false;
        xStart = yStart = xMoving = yMoving = 0;
    }
};
// functions for animations
let duration = 0.7;
//animations translate
const animationTranslate = (el, x, y) => {
    gsap.to(el, {
        translateX: x ? `${x}px` : "0",
        translateY: y ? `${y}px` : "0",
        duration: duration,
        ease: "sine.out",
    });
};
// animation positions of slidercells modeInline
const animationSliderInit = () => {
    let cellWidth = document.querySelector(".gridCell").offsetWidth;
    let sliderCells = gsap.utils.toArray(".gridSliderCell");
    // animation des sliderCells
    sliderCells.forEach((sliderCell, index) => {
        gsap.to(sliderCell, {
            opacity: 1,
            xPercent: mobile.value ? 0 : cells[index].position * 100,
            yPercent: mobile.value ? cells[index].position * 100 : 0,
            top: "auto",
            left: "auto",
            clipPath: "inset(10px calc(0% + 10px) 10px 10px)",
            duration: duration,
            ease: "sine.out",
            delay: modeMosaique.value ? 0 : 1.75,
        });
    });
    //animation du boutton switch mode
    gsap.to(".gridSwitchLeft", {
        scaleX: 0.7,
        scaleY: 1.5,
        yPercent: -150,
        duration: duration,
        ease: "sine.out",
    });
    gsap.to(".gridSwitchMid", {
        scaleX: 0.8,
        scaleY: 1.1,
        yPercent: 50,
        duration: duration,
        ease: "sine.out",
    });
    gsap.to(".gridSwitchRight", {
        scaleX: 0.6,
        scaleY: 1.3,
        yPercent: -100,
        duration: duration,
        ease: "sine.out",
    });
    // animation des lines
    gsap.to(".gridLinesVertical5", {
        opacity: 0,
        duration: duration,
        ease: "sine.out",
    });
    gsap.to(".gridLinesVertical8", {
        opacity: 0,
        duration: duration,
        ease: "sine.out",
        onComplete: () => (modeSlider.value = true),
    });

    animationTranslate(".gridLinesVertical6", cellWidth / -2, false);
    animationTranslate(".gridLinesVertical7", cellWidth / 2, false);
    animationTranslate(".gridLinesVertical9", cellWidth / 2, false);
    animationTranslate(".gridLinesVertical4", cellWidth / -2, false);
    animationTranslate(".gridLinesHorizontal4", false, cellWidth / -2);
    animationTranslate(".gridLinesHorizontal7", false, cellWidth / 2);
};
//animationTransitionMode
const animationTransitionMode = () => {
    xMove = 0;
    yMove = 0;
    if (modeMosaique.value) {
        gsap.killTweensOf(".gridContainer");
        gsap.to(".gridContainer", {
            translateX: "0px",
            translateY: "0px",
            duration: duration,
            ease: "sine.out",
        });
        gsap.to(".gridSliderCellImage", {
            xPercent: 0,
            duration: duration,
            ease: "sine.out",
        });
        animationSliderInit();
        animationSlider();
        modeMosaique.value = false;
    } else {
        let gridCells = gsap.utils.toArray(".gridCell");

        gridCells.forEach((gridCell, index) => {
            gsap.to(`.gridSliderCell${index}`, {
                xPercent: 0,
                yPercent: 0,
                top: gridCell.offsetTop,
                left: gridCell.offsetLeft,
                clipPath: "inset(10px calc(50% + 10px) 10px 10px)",
                duration: duration,
                ease: "sine.out",
            });
        });
        gsap.to(".gridSlider", {
            translateX: 0,
            translateY: 0,
            duration: duration,
            ease: "sine.out",
        });
        gsap.to(".gridSliderCellImage", {
            xPercent: -25,
            duration: duration,
            ease: "sine.out",
        });
        gsap.to(".gridSwitchEach", {
            scaleX: 1,
            scaleY: 1,
            yPercent: 0,
            duration: duration,
            ease: "sine.out",
        });
        gsap.to(".gridLinesVertical5", {
            opacity: 1,
            duration: duration,
            ease: "sine.out",
        });
        gsap.to(".gridLinesVertical8", {
            opacity: 1,
            duration: duration,
            ease: "sine.out",
        });

        animationTranslate(".gridLinesHorizontalEach", false, false);
        animationTranslate(".gridLinesVerticalEach", false, false);

        modeMosaique.value = true;
        modeSlider.value = false;
    }
};
const cellHovered = ref(false);
const cellHoveredIndex = ref([]);

const hoverOn = (e) => {
    if (modeMosaique.value) {
        cellHoveredIndex.value.push(e.target.dataset.index);
        cellHovered.value = true;
    }
};
const hoverOff = (e) => {
    if (modeMosaique.value) {
        cellHoveredIndex.value.splice(0, 1);
        cellHovered.value = false;
    }
};
onMounted(() => {
    setTimeout(animationSliderInit, 100);
    // init slidercell index
    sliderIndex.value = cellSorted.findIndex((element) => element.index === 0);
});
</script>

<template>
    <div
        class="grid"
        @mousedown="mouseStart"
        @mousemove="mouseMove"
        @mouseup="mouseEnd"
        @mouseleave="mouseEnd"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        :style="modeMosaique ? 'cursor: grab' : 'cursor: default'"
    >
        <!-- grid parts -->
        <div class="gridContainer">
            <!-- grid lines -->
            <div class="gridLines gridLinesHorizontal">
                <div
                    v-for="line in 10"
                    :key="line"
                    :class="
                        'gridLinesHorizontalEach gridLinesHorizontal' + line
                    "
                ></div>
            </div>
            <div class="gridLines gridLinesVertical">
                <div
                    v-for="line in 12"
                    :key="line"
                    :class="'gridLinesVerticalEach gridLinesVertical' + line"
                ></div>
            </div>
            <!-- grid cells positions -->
            <div
                v-for="cell in cells"
                :key="cell.index"
                :class="'gridCell gridCell' + cell.index"
            ></div>
            <!-- grid slider -->
            <div
                class="gridSlider"
                @wheel="wheelSlider"
                @touchstart="touchSliderStart"
                @touchmove="touchSliderMove"
                @touchend="touchSliderEnd"
            >
                <!-- grid sliderCells -->
                <div
                    v-for="cell in cells"
                    :key="cell.index"
                    :class="'gridSliderCell gridSliderCell' + cell.index"
                    @mouseover="hoverOn"
                    @mouseout="hoverOff"
                    :data-index="cell.index"
                >
                    <img
                        v-if="cell.image"
                        :src="cell.image"
                        alt="image slider"
                        class="gridSliderCellImage"
                        loading="lazy"
                    />
                    <div
                        :class="
                            (cellSorted[sliderIndex].index !== cell.index &&
                                modeSlider) ||
                            (cellHovered &&
                                !cellHoveredIndex.includes(
                                    cell.index.toString()
                                ))
                                ? 'gridSliderCellOverlay gridSliderCellOverlayOn'
                                : 'gridSliderCellOverlay'
                        "
                    ></div>
                </div>
            </div>
        </div>

        <div class="gridSwitch">
            <div class="gridSwitchButton" @click="animationTransitionMode">
                <div class="gridSwitchEach gridSwitchLeft"></div>
                <div class="gridSwitchEach gridSwitchMid"></div>
                <div class="gridSwitchEach gridSwitchRight"></div>
            </div>
        </div>

        <div class="gridInspired">
            Inspired by
            <a href="https://theud.tv/" target="_blank">theud.tv</a>
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

.grid {
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: black;
    overflow: hidden;
    gap: 5px;
    &Switch {
        z-index: 10;
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        transform: translateY(-50%);
        backdrop-filter: blur(20px);
        clip-path: circle(115px at 50% 50%);
        &Button {
            position: relative;
            top: 80px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        &Each {
            width: 20px;
            height: 10px;
            margin: 0 2px;
            background-color: $orangeColor;
        }
        &Left {
            opacity: 0.6;
            transition: opacity 0.5s ease-in-out;
        }
        &Right {
            opacity: 0.4;
            transition: opacity 0.5s ease-in-out;
        }
        &:hover .gridSwitchEach {
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
        }
    }
    &Container {
        position: fixed;
        display: grid;
        width: 650vw;
        max-width: 3250px;
        height: 550vh;
        max-height: 3300px;
        grid-template-columns: repeat(13, 1fr);
        grid-template-rows: repeat(11, 1fr);
    }
    &Lines {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        height: 100%;
        pointer-events: none;
        &Horizontal {
            flex-direction: column;
            &Each {
                height: 1px;
                background-color: #353535;
            }
        }
        &Vertical {
            &Each {
                width: 1px;
                background-color: #353535;
            }
        }
    }
    &Slider {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        &Cell {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: auto;
            left: auto;
            width: 100vw;
            max-width: 500px;
            height: 50vh;
            max-height: 300px;
            opacity: 0;
            clip-path: inset(10px calc(0% + 10px) 10px 10px);
            &Image {
                object-fit: cover;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }
            &Overlay {
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
                background-color: black;
                transition: opacity 0.7s ease-in-out;
                pointer-events: none;
                &On {
                    opacity: 0.8;
                }
            }
        }
    }
    &Inspired {
        z-index: 10;
        position: fixed;
        top: 0;
        color: $thirdColor;
        & a {
            color: $purpleColor;
            font-weight: bold;
        }
    }

    // positions des sliderCells en mode mosaique
    &Cell0 {
        grid-area: 6/7;
    }
    &Cell1 {
        grid-area: 6/5;
    }
    &Cell2 {
        grid-area: 7/8;
    }
    &Cell3 {
        grid-area: 7/6;
    }
    &Cell4 {
        grid-area: 5/6;
    }
    &Cell5 {
        grid-area: 8/7;
    }
}
@keyframes overlayOpacityOn {
    to {
        opacity: 1;
    }
}
@keyframes overlayOpacityOff {
    to {
        opacity: 0;
    }
}
</style>
