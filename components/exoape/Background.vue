<script setup>
import { gsap } from "gsap";

const emit = defineEmits(["transitionEnd"]);
const { images, imageShowed, transition } = defineProps([
    "images",
    "imageShowed",
    "transition",
]);
const animationTransition = () => {
    let containers = document.querySelectorAll(".backgroundContainer");
    let current = imageShowed[0];
    let next = imageShowed[1];
    let tl = gsap.timeline();

    if (!tl.isActive()) {
        tl.to(containers[next], {
            zIndex: 2,
            duration: 0,
        });
        tl.from(containers[next], {
            yPercent: transition.down ? 100 : -100,
            duration: 1,
            ease: "circ.out",
        });
        tl.from(
            containers[next],
            {
                clipPath: transition.down
                    ? "polygon(0 20%, 100% 40%, 100% 100%, 0 100%)"
                    : "polygon(0 0, 100% 0, 100% 60%, 0 80%)",
                duration: 1,
                ease: "circ.out",
            },
            "-=1"
        );
        tl.to(
            containers[current],
            {
                yPercent: transition.down ? -50 : 50,
                rotateZ: transition.down ? "-15deg" : "15deg",
                scale: 1.6,
                duration: 0.9,
                ease: "circ.out",
            },
            "-=0.9"
        );
        tl.to(containers[current], {
            yPercent: 0,
            rotateZ: "0deg",
            scale: 1,
            duration: 0,
        });
        tl.to(containers[next], {
            zIndex: 1,
            duration: 0,
            onComplete: emit,
            onCompleteParams: ["transitionEnd"],
        });
    }
};
const animationEnd = () => {
    emit("transitionEnd");
};
watch(transition, (value) => {
    if (value.state === true) {
        animationTransition();
    }
});
</script>

<template>
    <div class="background">
        <div
            v-for="image in images"
            :key="image.index"
            class="backgroundContainer"
            v-show="
                imageShowed.find((index) => index === image.index) != undefined
            "
        >
            <img
                class="backgroundContainerImg"
                :src="image.url"
                :alt="image.name"
            />
        </div>
        <div class="backgroundOverlay"></div>
    </div>
</template>

<style lang="scss">
.background {
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    width: 100vw;
    height: 100vh;
    &Container {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        width: 105%;
        height: 100%;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        &Img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }
    &Overlay {
        z-index: 2;
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba($color: black, $alpha: 0.5);
    }
}
</style>
