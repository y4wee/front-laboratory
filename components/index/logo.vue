<script setup>
import SmokeGreen from "~/assets/lotties/smoke_green.json";
</script>

<template>
    <div class="logo">
        <span class="logoText">
            Front <br />
            Laboratory
        </span>
        <client-only>
            <Vue3Lottie :animationData="SmokeGreen" autoPlay loop />
        </client-only>
    </div>
</template>

<style lang="scss">
.logo {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    margin-top: 1vh;
    &Text {
        font-family: "Anton", sans-serif;
        font-size: 5vh;
        color: #f27405;
    }
    & .lottie-animation-container {
        position: absolute;
        top: 0.5vh;
        left: 9.4vh;
        height: 10vh;
        width: 10vh;
    }
}
@media all and (min-width: 600px) {
    .logo {
        &Text {
            position: absolute;
            font-family: "Anton", sans-serif;
            font-size: 7vh;
            color: #f27405;
        }
        & .lottie-animation-container {
            top: -2.5vh;
            left: -2vh;
            height: 14vh;
            width: 14vh;
        }
    }
}
</style>
