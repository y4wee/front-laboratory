<script setup></script>

<template>
    <main>
        <Loader />
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
}
</style>
