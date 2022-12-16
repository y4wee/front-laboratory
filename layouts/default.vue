<script setup>
const errorScreen = ref(false);
const mobile = useMobile();

const checkScreen = () => {
    if (window.innerWidth < 700 && !mobile.value) {
        mobile.value = true;
        window.location.reload();
    }
    if (window.innerWidth >= 700 && mobile.value) {
        mobile.value = false;
        window.location.reload();
    }
};

onMounted(() => {
    if (window.innerWidth < 700 && !mobile.value) {
        mobile.value = true;
    }
    window.addEventListener("resize", checkScreen);
});
</script>

<template>
    <main v-if="!errorScreen">
        <GlassBottom />
        <GlassTop />
        <Overlay />
        <slot />
        <Footer />
    </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Anton&family=Barlow&family=Montserrat&family=Satisfy&display=swap");
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    user-select: none;
    font-family: "Montserrat", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
