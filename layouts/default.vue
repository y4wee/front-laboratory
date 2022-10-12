<script setup></script>

<template>
    <main>
        <slot />
        <Footer />
        <Loader />
    </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Anton&family=Montserrat&display=swap");
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style>
