<script setup>
import { gsap } from "gsap";
import GithubCat from "~/assets/lotties/github.json";

const route = useRoute();
const footerOn = ref(false);

const animationFooter = () => {
    gsap.to(".footerContainer", {
        clipPath: footerOn.value
            ? "inset(100% 0% 0% 0%)"
            : "inset(0% 0% 0% 0%)",
        duration: 0.3,
        ease: "sine.in",
    });
    footerOn.value = !footerOn.value;
};
</script>

<template>
    <div class="footer" v-if="route.path === '/'">
        <div class="footerContainer">
            <div class="footerGithub">
                <a
                    href="https://github.com/y4wee/front-challenge"
                    target="_blank"
                >
                    <client-only>
                        <Vue3Lottie
                            :animationData="GithubCat"
                            autoPlay
                            loop
                            to="https://github.com/y4wee/front-challenge"
                        />
                    </client-only>
                </a>
            </div>
            <div class="footerDev">
                Coded by
                <a href="https://quentin-jt.net/" target="_blank">
                    Quentin-jt
                </a>
            </div>
        </div>

        <div class="footerOpen" @click="animationFooter">
            <img
                src="~/assets/svg/foot.svg"
                alt="image du boutton pour ouvrir le footer"
            />
        </div>
    </div>
</template>

<style lang="scss">
$mainColor: rgb(28, 32, 32); // 1c2020
$secondColor: rgb(233, 222, 190); // e9debe
$thirdColor: rgb(227, 223, 223); // e3dfdf
$greenColor: rgb(86, 245, 105); // 56f569
$purpleColor: rgb(245, 86, 226); // f556e2
$orangeColor: rgb(242, 116, 5); // f27405

.footer {
    z-index: 110;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10%;
    width: 100%;
    pointer-events: none;
    &Open {
        position: absolute;
        left: 0;
        height: 50px;
        width: 50px;
        transform: scale(0);
        cursor: pointer;
        pointer-events: all;
        & img {
            width: 100%;
            height: 100%;
        }
    }
    &Container {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: $mainColor;
        opacity: 0;
        clip-path: inset(100% 0% 0% 0%);
    }
    &Github {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 50%;
        & a {
            height: 50px;
            width: 50px;
            pointer-events: all;
        }
    }
    &Dev {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 50%;
        min-width: 160px;
        color: $thirdColor;
        font-weight: bold;
        & a {
            text-decoration: none;
            color: $purpleColor;
            pointer-events: all;
        }
    }
}
@media all and (min-width: 700px) {
    .footer {
        &Open {
            display: none;
        }
        &Container {
            background-color: transparent;
            justify-content: space-between;
            clip-path: inset(0% 0% 0% 0%);
        }
        &Github {
            width: calc(50% - 115px);
        }
        &Dev {
            width: calc(50% - 115px);
        }
    }
}
</style>
