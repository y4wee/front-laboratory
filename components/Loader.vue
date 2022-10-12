<script setup>
import { gsap } from "gsap";
import Loader from "~/assets/lotties/loader.json";

const router = useRouter();
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
        "+=0.3"
    );
    tl.to(
        ".containerSide",
        {
            scaleX: 0,
            duration: 0.4,
            ease: "sine.out",
            onComplete: () => (loading.value = false),
        },
        "+=0.2"
    );
};

const animationTransition = () => {
    loading.value = true;
    let tl = gsap.timeline();

    tl.delay(0.1);

    tl.to(".containerSide", {
        scaleX: 1,
        duration: 0.4,
        ease: "sine.out",
    });
    tl.to(".containerLoader", {
        opacity: 1,
        duration: 0.3,
        ease: "sine.out",
        onComplete: router.push,
        onCompleteParams: [{ path: "/" + hash.value }],
    });
    tl.to(
        ".containerLoader",
        {
            opacity: 0,
            duration: 0.3,
            ease: "sine.out",
        },
        "+=0.3"
    );
    tl.to(
        ".containerSide",
        {
            scaleX: 0,
            duration: 0.4,
            ease: "sine.out",
            onComplete: () => (loading.value = false),
        },
        "+=0.2"
    );
};
onMounted(() => {
    animationInit();
});
watch(hash, (value) => {
    animationTransition();
});
</script>

<template>
    <div class="container" v-show="loading">
        <div class="containerSide containerTop"></div>
        <div class="containerSide containerBottom"></div>
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
