<script setup>
import SmokeGreen from "~/assets/lotties/smoke_green.json";
</script>

<template>
    <div class="logo">
        <div class="logoContainer">
            Front <br />
            Laboratory
            <client-only>
                <Vue3Lottie :animationData="SmokeGreen" autoPlay loop />
            </client-only>
        </div>
    </div>
</template>

<style lang="scss">
.logo {
    display: flex;
    &Container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: "Anton", sans-serif;
        font-size: 4rem;
        color: #f27405;
        & .lottie-animation-container {
            position: relative;
            top: -188px;
            left: 46px;
            height: 8rem;
        }
    }
}
@media all and (min-width: 600px) {
    .logo {
        &Container {
            font-size: 6rem;
            & .lottie-animation-container {
                top: -282px;
                left: 70px;
                height: 12rem;
            }
        }
    }
}
</style>
