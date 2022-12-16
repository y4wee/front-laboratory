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
    background-color: $thirdColor;
}
</style>
