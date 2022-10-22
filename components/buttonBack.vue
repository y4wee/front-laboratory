<script setup>
const route = useRoute();
const hash = useHash();
</script>

<template>
    <div class="back" v-if="route.path != '/'">
        <div class="backArrow"></div>
        <div class="backText" @click="hash = '/'">Back</div>
    </div>
</template>

<style lang="scss">
.back {
    z-index: 10;
    position: fixed;
    bottom: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    font-size: 2rem;
    user-select: none;
    animation: backTranslate 0.3s 1.7s both ease;
    &Arrow {
        display: inline-block;
        height: 0;
        width: 0;
        border-top: 30px solid transparent;
        border-bottom: 30px solid transparent;
        border-right: 30px solid #f27405;
    }
    &Text {
        padding: 0 20px;
        color: #1c2020;
        background-color: #f27405;
        font-family: "Anton", sans-serif;
        font-size: 1.4rem;
        cursor: pointer;
    }
}
@media all and (min-width: 600px) {
    .back {
        top: 10px;
        bottom: auto;
    }
}
@keyframes backTranslate {
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0%);
    }
}
</style>
