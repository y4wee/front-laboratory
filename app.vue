<script setup>
useHead({
    title: "Front Laboratory",
    viewport: "width=device-width, initial-scale=1, maximum-scale=5",
    charset: "utf-8",
    htmlAttrs: {
        lang: "fr-FR",
    },
    meta: [
        {
            name: "description",
            content:
                "Site regroupant mes front challenges, reproductions ou créations de composants, codés en Nuxt3",
        },
        {
            name: "msapplication-TileColor",
            content: "#da532c",
        },
        {
            name: "theme-color",
            content: "#ffffff",
        },
    ],
    link: [
        {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/apple-touch-icon.png",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon-32x32.png",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/favicon-16x16.png",
        },
        {
            rel: "manifest",
            href: "/site.webmanifest",
        },
        {
            rel: "mask-icon",
            href: "/safari-pinned-tab.svg",
            color: "#5bbad5",
        },
    ],
});
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
