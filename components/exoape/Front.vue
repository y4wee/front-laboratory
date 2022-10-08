<script setup>
const { images, imageShowed } = defineProps(["images", "imageShowed"]);
</script>

<template>
    <div class="front">
        <div class="frontBox">
            <div class="containerTitle">
                {{ images[imageShowed[0]].name }}
            </div>
            <div class="containerBox">
                <div
                    v-for="image in images"
                    :key="image.index"
                    class="containerBoxImg"
                    v-show="
                        imageShowed.find((index) => index === image.index) !=
                        undefined
                    "
                >
                    <img :src="image.url" :alt="image.name" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.front {
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    &Box {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
}
.containerTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85%;
    max-width: 310px;
}
.containerBox {
    position: relative;
    display: flex;
    width: 85%;
    max-width: 310px;
    height: 85%;
    max-height: 390px;
    &Img {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow: hidden;
        & img {
            object-fit: cover;
            object-position: center;
            height: 100%;
        }
    }
}
</style>
