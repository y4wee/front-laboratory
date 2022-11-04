<script setup>
import { gsap } from "gsap";

const { images, imageShowed, transition } = defineProps([
    "images",
    "imageShowed",
    "transition",
]);

const title = ref({
    index: 0,
});
const titleText = computed(() => {
    return images[title.value.index].name.split(" ");
});

const animationTransition = () => {
    let containers = document.querySelectorAll(".containerBoxImg");
    let current = imageShowed[0];
    let next = imageShowed[1];
    let tl = gsap.timeline();

    if (!tl.isActive()) {
        tl.to(containers[next], {
            zIndex: 4,
            duration: 0,
        });
        tl.from(containers[next], {
            yPercent: transition.down ? -100 : 100,
            duration: 1,
            ease: "circ.out",
        });
        tl.to(
            containers[current],
            {
                yPercent: transition.down ? 50 : -50,
                duration: 1,
                ease: "circ.out",
            },
            "-=1"
        );
        tl.to(
            ".containerTitleMaskText",
            {
                yPercent: transition.down ? -115 : 115,
                rotateZ: transition.down ? "-15deg" : "15deg",
                duration: 0.3,
                ease: "circ.in",
                onComplete: () => (title.value.index = next),
            },
            "-=1"
        );
        tl.to(
            ".containerTitle p",
            {
                opacity: 0,
                duration: 0.45,
                ease: "circ.out",
            },
            "-=1"
        );
        tl.to(
            ".containerTitleMaskText",
            {
                yPercent: transition.down ? 115 : -115,
                rotateZ: transition.down ? "15deg" : "-15deg",
                duration: 0,
                ease: "circ.in",
            },
            "-=0.55"
        );
        tl.to(
            ".containerTitleMaskText",
            {
                yPercent: 0,
                rotateZ: "0deg",
                duration: 0.45,
                ease: "circ.out",
            },
            "-=0.5"
        );
        tl.to(
            ".containerTitle p",
            {
                opacity: 1,
                duration: 0.45,
                ease: "circ.in",
            },
            "-=0.5"
        );
        tl.to(containers[current], {
            yPercent: 0,
            duration: 0,
        });
        tl.to(containers[next], {
            zIndex: 3,
            duration: 0,
        });
    }
};
watch(transition, (value) => {
    if (value.state === true) {
        animationTransition();
    }
});
</script>

<template>
    <div class="front">
        <div class="frontBox">
            <div class="containerTitle">
                <div class="containerTitleMask" v-for="index in 3" :key="index">
                    <span class="containerTitleMaskText">
                        {{ titleText[index - 1] }}
                    </span>
                </div>
                <p>
                    Inspired by
                    <a
                        href="https://dribbble.com/shots/18201219-Exo-Ape-Case-Hero-Header"
                        target="_blank"
                    >
                        Exo Ape
                    </a>
                </p>
            </div>
            <div class="containerBox">
                <div
                    v-for="image in images"
                    :key="image.index"
                    class="containerBoxImg"
                    v-show="
                        imageShowed.find((index) => index === image.index) !=
                        undefined
                    "
                >
                    <img :src="image.url" :alt="image.name" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.front {
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    &Box {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
}
.containerTitle {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 350px;
    width: 85%;
    max-width: 310px;
    color: white;
    font-size: 1.1rem;
    & p {
        position: absolute;
        bottom: 0;
    }
    & a {
        color: rgb(245, 86, 226);
        font-weight: bold;
    }
    &Mask {
        display: flex;
        overflow: hidden;
        &Text {
            font-family: "Anton", sans-serif;
            font-size: 4rem;
            transform-origin: "top left";
        }
    }
}
.containerBox {
    position: relative;
    display: flex;
    width: 85%;
    max-width: 310px;
    height: 85%;
    max-height: 390px;
    overflow: hidden;
    &Img {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        & img {
            object-fit: cover;
            object-position: center;
            height: 100%;
            min-width: 310px;
        }
    }
}
@media all and (max-width: 650px) {
    .frontBox {
        flex-direction: column;
    }
}
</style>
