<script setup>
const { cell } = defineProps(["cell"]);

const index = useIndex();
// onMounted(() => {
//     console.log(cell);
// });
</script>

<template>
    <div class="cell" @click="index = cell.index">
        <div class="cellContainer">
            <div class="cellTitle">
                {{ cell.title ? cell.title : "Empty" }}
            </div>
            <div class="cellBack">
                <img :src="cell.image" :alt="cell.title" loading="lazy" />
                <div class="cellBackOverlay"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.cell {
    position: absolute;
    display: flex;
    width: 95%;
    height: 95%;
    cursor: pointer;
    &Container {
        position: relative;
        display: flex;
        align-items: flex-start;
        width: 100%;
        height: 100%;
    }
    &Title {
        z-index: 4;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
        padding: 0 5px;
        font-family: "Anton", sans-serif;
        font-size: 1.5rem;
        background-color: #1c2020;
        color: #e3dfdf;
    }
    &Back {
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        & img {
            object-fit: cover;
            width: 100%;
        }
        &Overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            transform-origin: left;
            backdrop-filter: grayscale(100%);
            -webkit-backdrop-filter: grayscale(100%);
        }
    }
}
</style>
