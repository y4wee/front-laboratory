<script setup>
const { $projects } = useNuxtApp();
</script>

<template>
    <div class="home">
        <IndexSlider :projects="$projects" />
    </div>
</template>

<style scoped lang="scss">
$mainColor: rgb(28, 32, 32); // 1c2020
$secondColor: rgb(233, 222, 190); // e9debe
$thirdColor: rgb(227, 223, 223); // e3dfdf
$greenColor: rgb(86, 245, 105); // 56f569
$purpleColor: rgb(245, 86, 226); // f556e2
$orangeColor: rgb(242, 116, 5); // f27405
.home {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    user-select: none;
    background-color: #e3dfdf;
    &Logo {
        z-index: 10;
        position: fixed;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        transform: translateY(-40%);
        backdrop-filter: blur(20px);
        clip-path: circle(115px at 50% 50%);
        opacity: 0;
        pointer-events: none;
    }
}
</style>
