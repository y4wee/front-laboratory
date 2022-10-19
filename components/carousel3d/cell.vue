<script setup>
const { cell } = defineProps(["cell"]);

const index = useIndex();
const hash = useHash();
</script>

<template>
    <div class="cell" @click="cell.category ? (index = cell.index) : false">
        <div class="cellContainer">
            <div class="cellBack">
                <img
                    v-if="cell.image"
                    class="cellBackImg"
                    :src="cell.image"
                    :alt="cell.title"
                    loading="lazy"
                />
                <div v-else class="cellBackSvg">
                    <img
                        src="~/assets/svg/work_progress.svg"
                        alt="work in progress"
                        loading="lazy"
                    />
                </div>
            </div>
            <div class="cellCategory">
                {{ cell.category ? cell.category : "..." }}
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
    pointer-events: all;
    cursor: pointer;
    &Container {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    &Category {
        z-index: 3;
        position: absolute;
        top: 15%;
        right: -30%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 100%;
        font-family: "Satisfy", cursive;
        font-size: 1.4rem;
        background-color: rgba($color: black, $alpha: 0.8);
        color: #e3dfdf;
        transform: rotateZ(45deg);
    }
    &Back {
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        & img {
            filter: grayscale(100%);
        }
        &Img {
            object-fit: cover;
            width: 100%;
        }
        &Svg {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background-color: #1c2020;
            & img {
                height: 100%;
            }
        }
    }
}
</style>
