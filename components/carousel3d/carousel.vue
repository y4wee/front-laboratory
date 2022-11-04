<script setup>
import { gsap } from "gsap";

const { cells, cellsNb, zoom, touchSpeed } = defineProps([
    "cells",
    "cellsNb",
    "zoom",
    "touchSpeed",
]);

const cellsShowed = ref([
    cells[cells.length - 3].index,
    cells[cells.length - 2].index,
    cells[cells.length - 1].index,
    cells[0].index,
    cells[1].index,
    cells[2].index,
    cells[3].index,
]);
const selectedIndex = ref(0);
const previousIndex = ref(0);
const theta = 360 / cellsNb;

const horizontal = computed(() => {
    return window.innerWidth < 600 ? false : true;
});
const cellWidth = computed(() => {
    return document.querySelector(".carousel").offsetWidth;
});
const cellHeight = computed(() => {
    return document.querySelector(".carousel").offsetHeight;
});
const cellSize = computed(() => {
    return horizontal.value ? cellWidth.value : cellHeight.value;
});
const radius = computed(() => {
    return Math.round(cellSize.value / 2 / Math.tan(Math.PI / cellsNb));
});
const direction = computed(() => {
    return horizontal.value ? "rotateY" : "rotateX";
});
// carousel init
const carouselInit = () => {
    let angleInit = [-3, -2, -1, 0, 1, 2, 3];
    let cells = gsap.utils.toArray(".carouselCell");
    let cellsShowed = cells.slice(-3).concat(cells.slice(0, 4));
    gsap.to(".carouselPerspective", {
        translateZ: radius.value / zoom + "px",
        duration: 0,
    });
    cellsShowed.forEach((cell, index) => {
        let angle = theta * angleInit[index];
        gsap.to(cell, {
            transform: `${direction.value}(${angle * -1}deg) translateZ(-${
                radius.value
            }px)`,
            duration: 0,
        });
    });
};
// carousel rotation
function rotateCarousel() {
    let angle = (theta * selectedIndex.value) / 2;

    gsap.to(".carousel", {
        rotateY: horizontal.value ? angle + "deg" : "0deg",
        rotateX: horizontal.value ? "0deg" : angle + "deg",
        duration: 0.4,
        ease: "sine.out",
    });
}
// carousel cell changing
const changeCell = (way) => {
    let indexFirst = cellsShowed.value[0];
    let indexLast = cellsShowed.value[cellsShowed.value.length - 1];
    let indexMax = cells[cells.length - 1].index;

    if (selectedIndex.value % 2 === 0) {
        if (way === "down") {
            let tl = gsap.timeline();

            tl.to(
                `.carouselCell${indexLast === indexMax ? 0 : indexLast + 1}`,
                {
                    transform: `${direction.value}(${
                        (theta * (selectedIndex.value + 6)) / -2
                    }deg) translateZ(-${radius.value}px)`,
                    duration: 0,
                }
            );
            tl.fromTo(
                `.carouselCell${indexLast === indexMax ? 0 : indexLast + 1}`,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    duration: 0.3,
                },
                "+=0.1"
            );
            cellsShowed.value.push(indexLast === indexMax ? 0 : indexLast + 1);
            cellsShowed.value.splice(0, 1);
            rotateCarousel();
        } else if (way === "up") {
            let tl = gsap.timeline();

            tl.to(
                `.carouselCell${indexFirst === 0 ? indexMax : indexFirst - 1}`,
                {
                    transform: `${direction.value}(${
                        (theta * (selectedIndex.value - 6)) / -2
                    }deg) translateZ(-${radius.value}px)`,
                    duration: 0,
                }
            );
            tl.fromTo(
                `.carouselCell${indexFirst === 0 ? indexMax : indexFirst - 1}`,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    duration: 0.3,
                },
                "+=0.1"
            );

            cellsShowed.value.splice(
                0,
                0,
                indexFirst === 0 ? indexMax : indexFirst - 1
            );
            cellsShowed.value.splice(cellsShowed.value.length - 1, 1);
            rotateCarousel();
        }
    }
};
// scroll event
const wheel = (e) => {
    e.preventDefault();

    if (e.deltaY > 0) {
        selectedIndex.value++;
        if (selectedIndex.value !== previousIndex.value) {
            changeCell("down");
        }
        previousIndex.value = selectedIndex.value - 1;
    }
    if (e.deltaY < 0) {
        selectedIndex.value--;
        if (selectedIndex.value !== previousIndex.value) {
            changeCell("up");
        }
        previousIndex.value = selectedIndex.value + 1;
    }
};
// touch mobil event
const posStart = ref(0);
const posMove = ref(0);
const touchStart = (e) => {
    posStart.value = horizontal.value
        ? e.touches[0].clientX
        : e.touches[0].clientY;
};
const touchEnd = (e) => {
    posStart.value = posMove.value = 0;
};
const touchMove = (e) => {
    posMove.value = horizontal.value
        ? e.changedTouches[0].clientX
        : e.changedTouches[0].clientY;
    let ratio = posStart.value - posMove.value;
    if (ratio <= -touchSpeed) {
        posStart.value = posMove.value;
        selectedIndex.value += 2;
        changeCell("down");
    }
    if (ratio >= touchSpeed) {
        posStart.value = posMove.value;
        selectedIndex.value -= 2;
        changeCell("up");
    }
};
// carousel init
onMounted(() => {
    setTimeout(() => {
        carouselInit();
    }, 100);
});
</script>

<template>
    <div
        class="carouselContainer"
        @wheel="wheel"
        @touchstart="touchStart"
        @touchend="touchEnd"
        @touchmove="touchMove"
    >
        <div class="carouselPerspective">
            <div class="carousel">
                <Carousel3dCell
                    :class="'carouselCell carouselCell' + cell.index"
                    v-for="cell in cells"
                    :key="cell.index"
                    :cell="cell"
                    v-show="cellsShowed.includes(cell.index)"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.carousel {
    &Container {
        display: flex;
        justify-content: center;
        align-items: center;
        perspective: 1000px;
        width: 100%;
        height: 100%;
        max-height: 300px;
        opacity: 0;
        animation: fade 0.5s 0.3s forwards ease-in;
    }
    &Perspective {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        pointer-events: none;
    }
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 300px;
    max-height: 200px;
    transform-style: preserve-3d;
}
@media all and (max-width: 599px) {
    .carouselContainer {
        max-height: 100%;
        max-width: 300px;
    }
}
@keyframes fade {
    to {
        opacity: 1;
    }
}
</style>
