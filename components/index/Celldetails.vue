<script setup>
import { gsap } from "gsap";

const { cells } = defineProps(["cells"]);

const hash = useHash();
const index = useIndex();
const active = ref(true);

const playVideo = () => {
    let video = document.querySelector("video");
    video.play();
};
const openDetails = () => {
    active.value = true;
    let tl = gsap.timeline();

    tl.to(".details", {
        transform: "translateY(0%)",
        duration: 0.3,
        ease: "circle.out",
    });
    tl.from(
        ".detailsVideo",
        {
            opacity: 0,
            xPercent: -30,
            duration: 0.3,
            ease: "circle.out",
            onStart: playVideo,
        },
        "+=0.25"
    );
    tl.from(
        ".detailsContainer",
        {
            opacity: 0,
            xPercent: 30,
            duration: 0.3,
            ease: "circle.out",
        },
        "-=0.3"
    );
    tl.from(
        ".detailsDemo",
        {
            opacity: 0,
            xPercent: -20,
            duration: 0.3,
            ease: "circle.out",
        },
        "-=0.1"
    );
};
const closeDetails = () => {
    let tl = gsap.timeline();

    tl.to(".details", {
        transform: "translateY(100%)",
        duration: 0.3,
        ease: "sine.out",
        onComplete: () => {
            active.value = false;
            index.value = null;
        },
    });
};

watch(index, (value) => {
    if (value != null) {
        openDetails();
    }
});
</script>

<template>
    <div class="details">
        <div class="detailsClose" @click="closeDetails">
            <img
                src="~/assets/svg/cross.svg"
                alt="cross to close"
                height="35"
                width="35"
            />
        </div>
        <div class="detailsMain">
            <div class="detailsVideo">
                <client-only>
                    <video
                        v-if="active"
                        :src="index != null ? cells[index].video : '#'"
                        playsInline
                        muted
                        loop
                    ></video>
                </client-only>
            </div>
            <div class="detailsContainer">
                <div
                    v-if="index != null"
                    class="detailsText"
                    v-for="detail in cells[index].details"
                    :key="detail"
                >
                    {{ detail }}
                </div>
                <div class="detailsDemo">
                    <div
                        class="detailsDemoText"
                        @click="hash = cells[index].link"
                    >
                        Démo
                    </div>
                    <div class="detailsDemoArrow"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.details {
    z-index: 5;
    position: fixed;
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    font-family: "Anton", sans-serif;
    transform: translateY(100%);
    backdrop-filter: blur(5px);
    &::before {
        content: "";
        position: absolute;
        align-self: center;
        width: calc(100vw - 20px);
        height: calc(100vh - 20px);
        background-color: #1c2020;
        background-color: rgba($color: #000000, $alpha: 0.9);
    }
    &Close {
        position: absolute;
        top: 20px;
        right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border: 2px solid #e3dfdf;
        border-radius: 50%;
        font-size: 2rem;
        color: #e3dfdf;
        cursor: pointer;
    }
    &Main {
        z-index: 6;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: calc(95% - 20px);
        height: calc(80% - 20px);
        max-width: 350px;
        margin-top: 192px;
    }
    &Video {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        max-height: 250px;
        overflow: hidden;
        & video {
            object-fit: cover;
            object-position: center;
            width: 100%;
            height: 100%;
        }
    }
    &Container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        color: #1c2020;
        margin-top: 5px;
    }
    &Text {
        padding: 0 10px;
        margin: 5px 0;
        font-size: 1.4rem;
        background-color: #e3dfdf;
    }
    &Demo {
        display: flex;
        align-items: center;
        margin-top: 20px;
        align-self: flex-end;
        &Text {
            padding: 0 40px;
            background-color: #f27405;
            font-size: 2rem;
            cursor: pointer;
        }
        &Arrow {
            display: inline-block;
            height: 0;
            width: 0;
            border-top: 45px solid transparent;
            border-bottom: 45px solid transparent;
            border-left: 45px solid #f27405;
        }
    }
}
@media all and (min-width: 600px) {
    .details {
        &Main {
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
            max-width: 1000px;
            max-height: 400px;
            margin-top: 340px;
        }
        &Video {
            max-height: 100%;
            margin-right: 50px;
        }
        &Container {
            justify-content: center;
            margin-top: 0px;
        }
        &Demo {
            align-self: auto;
        }
    }
}
</style>
