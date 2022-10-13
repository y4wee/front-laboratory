<script setup>
const route = useRoute();
const hash = useHash();
</script>

<template>
    <div class="back" v-show="route.path != '/'" @click="hash = '/'">Back</div>
</template>

<style lang="scss">
.back {
    z-index: 10;
    position: fixed;
    top: 10px;
    left: 10px;
    font-size: 2rem;
    user-select: none;
    cursor: pointer;
}
</style>
