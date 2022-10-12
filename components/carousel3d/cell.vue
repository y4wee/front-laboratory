<script setup>
const { cell } = defineProps(["cell"]);

const hash = useHash();
// onMounted(() => {
//     console.log(cell);
// });
</script>

<template>
    <div class="cell">
        <div class="cellContainer">
            <div class="cellBack">
                <img :src="cell.image" :alt="cell.title" loading="lazy" />
                <div class="cellBackOverlay"></div>
            </div>
            <div class="cellButton" @click="hash = cell.title">
                {{ cell.title ? cell.title : "Empty" }}
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
    &Container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
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
    &Button {
        z-index: 4;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 50%;
        font-family: "Anton", sans-serif;
        font-size: 1.5rem;
        padding: 5px;
        & a {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            text-decoration: none;
            background-color: #1c2020;
            color: #e3dfdf;
        }
    }
}
</style>
