<script setup>
import { gsap } from "gsap";

const { $projects } = useNuxtApp();
const route = useRoute();
const index = useIndex();

const projectIndex = computed(() => {
    return $projects.findIndex((el) => el.link === route.path);
});

onMounted(() => {
    // init l'index value en cas de refresh
    index.value = route.path !== "/" ? projectIndex.value : 0;
});
</script>

<template>
    <div class="glassTop">
        <div class="glassTopLogo" v-if="route.path === '/'">
            <IndexLogo />
        </div>
        <div
            class="glassTopRef"
            v-if="route.path !== '/' && $projects[projectIndex].refName"
        >
            <p :style="`color: ${$projects[projectIndex].refName}`">
                Inspired by
            </p>
            <a :href="$projects[projectIndex].refLink" target="_blank">{{
                $projects[projectIndex].refName
            }}</a>
        </div>
    </div>
</template>

<style lang="scss">
$mainColor: rgb(28, 32, 32); // 1c2020
$secondColor: rgb(233, 222, 190); // e9debe
$thirdColor: rgb(227, 223, 223); // e3dfdf
$greenColor: rgb(86, 245, 105); // 56f569
$purpleColor: rgb(245, 86, 226); // f556e2
$orangeColor: rgb(242, 116, 5); // f27405

.glassTop {
    z-index: 10;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(20px);
    clip-path: circle(115px at 50% 50%);
    &Ref {
        position: relative;
        top: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        & p {
            mix-blend-mode: difference;
        }
        & a {
            color: $purpleColor;
            font-weight: bold;
        }
    }
}
</style>
