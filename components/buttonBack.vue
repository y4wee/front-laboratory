<script setup>
const route = useRoute();
const hash = useHash();
</script>

<template>
    <div class="buttonBack" v-if="route.path != '/'" @click="hash = '/'">
        <img
            src="~/assets/svg/home.svg"
            alt="image du bouton pour revenir a l'accueil"
        />
    </div>
</template>

<style lang="scss">
.buttonBack {
    z-index: 10;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    transform: translateY(50%);
    backdrop-filter: blur(20px);
    clip-path: circle(115px at 50% 50%);
    opacity: 0;
    & img {
        position: relative;
        top: -55px;
        width: 60px;
        height: 60px;
        cursor: pointer;
    }
}
</style>
