<script setup>
import { gsap } from "gsap";
import FluideGreen from "~/assets/lotties/fluide_green.json";

const { $projects } = useNuxtApp();
const route = useRoute();
const hash = useHash();
const index = useIndex();
</script>

<template>
    <div
        class="glassBottom"
        :style="
            route.path === '/'
                ? 'transform: translateY(40%)'
                : 'transform: translateY(50%)'
        "
    >
        <div class="glassBottomTools" v-if="route.path === '/'">
            <!-- horyzontal segment -->
            <div class="glassBottomToolsSegmentH"></div>
            <!-- background animated lottiefile -->
            <div class="glassBottomToolsBack">
                <client-only>
                    <Vue3Lottie :animationData="FluideGreen" autoPlay loop />
                </client-only>
            </div>
            <!-- text scroll warp -->
            <div class="warp" aria-labelledby="warp-label">
                <span id="warp-label" class="warp__placeholder"> Scroll </span>

                <span>
                    <span class="warp__0"> S </span>
                    <span class="warp__1"> c </span>
                    <span class="warp__2"> r </span>
                    <span class="warp__3"> o </span>
                    <span class="warp__4"> l </span>
                    <span class="warp__5"> l </span>
                </span>
            </div>
            <!-- circle -->
            <div class="glassBottomToolsCircle">
                <div class="glassBottomToolsCircleSegment"></div>
            </div>
            <!-- boutton play -->
            <div
                class="glassBottomToolsPlay"
                @click="hash = $projects[index].link"
            ></div>
        </div>
        <!-- boutton back to home  -->
        <div class="glassBottomBack" v-if="route.path !== '/'">
            <div class="glassBottomBackSegment"></div>
            <div class="glassBottomBackCircle"></div>
            <div class="glassBottomBackButton" @click="hash = '/'"></div>
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

.glassBottom {
    z-index: 10;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(20px);
    clip-path: circle(115px at 50% 50%);
    &Back {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 185px;
        height: 185px;
        &Circle {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 185px;
            height: 185px;
            border: solid 2px $mainColor;
            border-radius: 50%;
            clip-path: polygon(
                0 0,
                50% 0,
                50% 50%,
                100% 35%,
                100% 100%,
                0 100%
            );
        }
        &Segment {
            position: absolute;
            top: 35%;
            left: 50%;
            width: 90px;
            height: 2px;
            background-color: $mainColor;
        }
        &Button {
            position: absolute;
            top: calc(35% - 40px);
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: $mainColor;
            cursor: pointer;
            &::after {
                content: "";
                height: 35px;
                width: 35px;
                background-color: $orangeColor;
                border-radius: 10%;
            }
        }
    }
    &Tools {
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        &SegmentH {
            position: absolute;
            left: 50%;
            width: 90px;
            height: 2px;
            background-color: $mainColor;
        }
        &Back {
            position: absolute;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            width: 230px;
            height: 230px;
            overflow: hidden;
            & .lottie-animation-container {
                min-width: 510px;
            }
        }
        &Play {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: $mainColor;
            cursor: pointer;
            &::after {
                content: "";
                display: inline-block;
                height: 0;
                width: 0;
                border-top: 20px solid transparent;
                border-bottom: 20px solid transparent;
                border-left: 35px solid $orangeColor;
                border-radius: 10%;
            }
        }
        &Circle {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 185px;
            height: 185px;
            border: solid 2px $mainColor;
            border-radius: 50%;
            clip-path: polygon(
                0 0,
                60px 0,
                60px 40%,
                129px 40%,
                129px 0,
                100% 0,
                100% 40%,
                60px 40%,
                60px 100%,
                0 100%
            );
            &Segment {
                position: absolute;
                width: 185px;
                height: 185px;
                border: solid 2px $orangeColor;
                border-radius: 50%;
                clip-path: polygon(50% 0, 60% 0, 50% 50%);
                box-shadow: inset 0 0 2px $orangeColor;
                animation: rotateSegment 3s 2s ease-in-out infinite;
            }
        }
    }
}
@keyframes rotateSegment {
    to {
        transform: rotateZ(360deg);
    }
}
.warp__placeholder {
    position: absolute;
    color: transparent;
    font-size: 0.1px;
}

.warp {
    display: block;
    position: relative;
    width: 230px;
    height: 230px;
    font-family: "Satisfy", cursive;
    font-size: 1.5rem;
    color: $orangeColor;
}

[class*="warp__"] {
    display: block;
    position: absolute;
}

.warp__0 {
    transform-origin: 50% 17px;
    transform: translate(90.2902px, 9.4093px) rotate(-0.243373rad);
}

.warp__1 {
    transform-origin: 50% 17px;
    transform: translate(101.5336px, 7.58240000000001px) rotate(-0.109092rad);
}

.warp__2 {
    transform-origin: 50% 17px;
    transform: translate(110.7481px, 7.14019999999999px) rotate(0.018246rad);
}

.warp__3 {
    transform-origin: 50% 17px;
    transform: translate(120.953px, 7.9375px) rotate(0.145485rad);
}

.warp__4 {
    transform-origin: 50% 17px;
    transform: translate(130.1776px, 9.349500000000006px) rotate(0.240241rad);
}

.warp__5 {
    transform-origin: 50% 17px;
    transform: translate(135.543px, 9.866600000000005px) rotate(0.310651rad);
}
</style>
