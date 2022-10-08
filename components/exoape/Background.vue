<script setup>
const { images, imageShowed } = defineProps(["images", "imageShowed"]);
</script>

<template>
    <div class="background">
        <div
            v-for="image in images"
            :key="image.index"
            class="backgroundContainer"
            v-show="
                imageShowed.find((index) => index === image.index) != undefined
            "
        >
            <img
                class="backgroundContainerImg"
                :src="image.url"
                :alt="image.name"
            />
        </div>
    </div>
</template>

<style lang="scss">
.background {
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    &Container {
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        &Img {
            object-fit: cover;
            width: 100%;
        }
    }
}
</style>
