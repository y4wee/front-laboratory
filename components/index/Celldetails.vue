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
        ".detailsDemo",
        {
            opacity: 0,
            xPercent: 30,
            duration: 0.3,
            ease: "circle.out",
        },
        "-=0.3"
    );
};
const closeDetails = () => {
    console.log("ok");
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
        <div class="detailsClose" @click="closeDetails">X</div>
        <div class="detailsContainer">
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
            <div class="detailsText"></div>
            <div
                class="detailsDemo"
                @click="
                    () => {
                        hash = cells[index].link;
                        index = null;
                    }
                "
            >
                Démo
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.details {
    z-index: 5;
    position: fixed;
    display: flex;
    align-items: flex-end;
    width: 100vw;
    height: 100vh;
    background-color: #1c2020;
    font-family: "Anton", sans-serif;
    transform: translateY(100%);
    &Close {
        position: absolute;
        top: 20px;
        right: 10px;
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
    &Container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: calc(100% - 192px);
        // background-color: white;
    }
    &Video {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 95%;
        height: 50%;
        max-width: 350px;
        max-height: 250px;
        margin: 20px 0;
        overflow: hidden;
        // border: 1px solid #e3dfdf;
        & video {
            width: 100%;
        }
    }
    &Demo {
        padding: 0 5px;
        font-size: 2rem;
        background-color: #e3dfdf;
        cursor: pointer;
    }
}
@media all and (min-width: 600px) {
    .details {
        &Container {
            height: calc(100% - 340px);
        }
        &Video {
            max-width: 500px;
            max-height: 400px;
            // border: 1px solid #e3dfdf;
            & video {
                width: 100%;
            }
        }
    }
}
</style>
