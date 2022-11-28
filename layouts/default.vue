<script setup></script>

<template>
    <main>
        <Overlay />
        <ButtonBack />
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
}
</style>
