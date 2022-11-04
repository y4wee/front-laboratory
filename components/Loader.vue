<script setup>
import { gsap } from "gsap";
import Loader from "~/assets/lotties/loader.json";

const router = useRouter();
const index = useIndex();
const hash = useHash();
const loading = ref(true);

const animationInit = () => {
    let tl = gsap.timeline();

    tl.delay(0.1);

    tl.to(".containerLoader", {
        opacity: 1,
        duration: 0.3,
        ease: "sine.out",
    });
    tl.to(
        ".containerLoader",
        {
            opacity: 0,
            duration: 0.3,
            ease: "sine.out",
        },
        "+=0.5"
    );
    tl.to(
        ".containerSlide",
        {
            yPercent: 100,
            duration: 1.2,
            ease: "expo.inOut",
        },
        "-=0.5"
    );
    tl.to(
        ".containerSlideBack",
        {
            scaleY: 1,
            duration: 0.7,
            ease: "expo.in",
        },
        "-=1.4"
    );
    tl.to(
        ".containerSlideBack",
        {
            scaleY: 0,
            duration: 0.5,
            ease: "expo.out",
            onComplete: () => {
                loading.value = false;
                hash.value = "";
                index.value = null;
            },
        },
        "-=0.55"
    );
};

const animationTransition = () => {
    loading.value = true;
    let tl = gsap.timeline();

    tl.delay(0.1);

    tl.to(".containerSlide", {
        yPercent: 0,
        duration: 1.2,
        ease: "expo.inOut",
        onComplete: router.push,
        onCompleteParams: [{ path: hash.value }],
    });
    tl.to(
        ".containerSlideBack",
        {
            scaleY: 1,
            duration: 0.7,
            ease: "expo.in",
        },
        "-=1.4"
    );
    tl.to(
        ".containerSlideBack",
        {
            scaleY: 0,
            duration: 0.5,
            ease: "expo.out",
            onComplete: animationInit,
        },
        "-=0.55"
    );
};

onBeforeMount(() => {
    if (router.currentRoute.value.path != "/") {
        hash.value = router.currentRoute.value.path;
    }
});
onMounted(() => {
    animationInit();
});
watch(hash, (value) => {
    if (value != "") {
        animationTransition();
    }
});
</script>

<template>
    <div class="container" v-show="loading">
        <div class="containerSlide">
            <div class="containerSlideLeft containerSlideBack"></div>
            <div class="containerSlideRight containerSlideBack"></div>
        </div>
        <div class="containerLoader">
            <client-only>
                <Vue3Lottie :animationData="Loader" autoPlay loop />
            </client-only>
        </div>
    </div>
</template>

<style lang="scss">
.container {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    &Slide {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #1c2020;
        transform-origin: bottom;
        &Back {
            position: absolute;
            width: 50%;
            height: 25vh;
            background-color: #f27405;
        }
        &Left {
            top: -25vh;
            left: 0;
            transform-origin: bottom;
            transform: scaleY(0);
        }
        &Right {
            top: 0;
            right: 0;
            transform-origin: top;
            transform: scaleY(0);
        }
    }
    &Side {
        width: 100%;
        height: 50%;
        background-color: #1c2020;
    }
    &Top {
        transform-origin: right;
    }
    &Bottom {
        transform-origin: left;
    }
    &Loader {
        position: absolute;
        display: flex;
        width: 50%;
        max-width: 300px;
        opacity: 0;
    }
}
</style>
