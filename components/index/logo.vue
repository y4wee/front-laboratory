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
    width: 230px;
    height: 230px;
    border-radius: 50%;
    &Text {
        position: relative;
        top: 5px;
        font-family: "Anton", sans-serif;
        font-size: 2rem;
        color: #f27405;
    }
    & .lottie-animation-container {
        position: absolute;
        height: 70px;
        width: 70px;
        top: 69px;
        right: 57px;
    }
}
</style>
