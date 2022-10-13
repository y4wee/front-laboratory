<script setup>
import GithubCat from "~/assets/lotties/github.json";
</script>

<template>
    <div class="footer">
        <a
            href="https://github.com/y4wee/front-challenge"
            target="_blank"
            class="footerContainer"
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
</template>

<style lang="scss">
.footer {
    z-index: 10;
    position: fixed;
    bottom: 10px;
    left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 60px;
    border-radius: 50%;
}
</style>
