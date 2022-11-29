<script setup>
import { gsap } from "gsap";
import Loader from "~/assets/lotties/loader.json";

const route = useRoute();
const router = useRouter();
const hash = useHash();
const started = ref(null);

const animationSlide = () => {
    let tl = gsap.timeline();

    tl.to(".overlaySlideTop", {
        yPercent: hash.value === "/" ? -80 : -100,
        duration: 0.4,
        ease: "power4.in",
    });
    tl.to(
        ".overlaySlideBottom",
        {
            yPercent: hash.value === "/" ? 80 : 100,
            duration: 0.4,
            ease: "power4.in",
        },
        "-=0.4"
    );
    tl.to(
        ".overlaySlideGearTop",
        {
            yPercent: hash.value === "/" ? -40 : -50,
            duration: 0.4,
            ease: "power4.in",
        },
        "-=0.4"
    );
    tl.to(
        ".overlaySlideGearBottom",
        {
            yPercent: hash.value === "/" ? 40 : 50,
            duration: 0.4,
            ease: "power4.in",
        },
        "-=0.4"
    );
    if (route.path === "/") {
        tl.to(".homeLogo", {
            opacity: 1,
            duration: 0.3,
            ease: "sine.out",
        });
        tl.to(
            ".sliderTools",
            {
                opacity: 1,
                duration: 0.3,
                ease: "sine.out",
            },
            "-=0.3"
        );
        tl.to(
            ".footerContainer",
            {
                opacity: 1,
                duration: 0.3,
                ease: "sine.out",
            },
            "-=0.3"
        );
        gsap.to(
            ".footerOpen",
            {
                scale: 1,
                duration: 0.5,
                ease: "elastic.out",
            },
            "+=0.3"
        );
    } else {
        tl.to(".buttonBack", {
            opacity: 1,
            duration: 0.3,
            ease: "sine.out",
        });
    }
};

const animationInit = () => {
    let tl = gsap.timeline();
    //verifie si started
    if (started.value && started.value === "true") {
        tl.delay(1);

        tl.to(".overlayWaiting", {
            opacity: 0,
            duration: 0.3,
            ease: "sine.in",
            onComplete: animationSlide,
        });
    } else {
        tl.delay(2);

        tl.to(".overlayWaiting", {
            xPercent: 100,
            duration: 0.3,
            ease: "sine.in",
        });
        tl.to(
            ".overlayStart",
            {
                xPercent: 90,
                duration: 0.3,
                ease: "sine.in",
            },
            "-=0.3"
        );
        tl.to(".overlayStart", {
            pointerEvents: "all",
            duration: 0,
        });
        tl.to(".overlayWaiting", {
            opacity: 0,
            xPercent: 0,
            duration: 0,
        });
    }
};
const animationStart = () => {
    sessionStorage.setItem("started", "true");
    let tl = gsap.timeline();

    tl.to(".overlayStartOn", {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.3,
        ease: "sine.in",
    });
    tl.to(
        ".overlayStart",
        {
            opacity: 0,
            duration: 0.3,
            ease: "sine.in",
            onComplete: () => {
                started.value = "true";
                animationSlide();
            },
        },
        "+=0.1"
    );
};

const animationTransition = () => {
    let tl = gsap.timeline();

    tl.delay(0.1);

    if (route.path === "/") {
        gsap.to(".footerOpen", {
            scale: 0,
            duration: 0.5,
            ease: "elastic.in",
        });
        tl.to(".homeLogo", {
            opacity: 0,
            duration: 0.3,
            ease: "sine.in",
        });
        tl.to(
            ".sliderTools",
            {
                opacity: 0,
                duration: 0.3,
                ease: "sine.in",
            },
            "-=0.3"
        );
        tl.to(
            ".footerContainer",
            {
                opacity: 0,
                duration: 0.3,
                ease: "sine.in",
            },
            "-=0.3"
        );
    } else {
        tl.to(".buttonBack", {
            opacity: 0,
            duration: 0.3,
            ease: "sine.in",
        });
    }
    tl.to(".overlaySlideTop", {
        yPercent: 0,
        duration: 0.4,
        ease: "power4.out",
    });
    tl.to(
        ".overlaySlideBottom",
        {
            yPercent: 0,
            duration: 0.4,
            ease: "power4.out",
        },
        "-=0.4"
    );
    tl.to(
        ".overlaySlideGearTop",
        {
            yPercent: 0,
            duration: 0.4,
            ease: "power4.out",
        },
        "-=0.4"
    );
    tl.to(
        ".overlaySlideGearBottom",
        {
            yPercent: 0,
            duration: 0.4,
            ease: "power4.out",
        },
        "-=0.4"
    );
    tl.to(
        ".overlayWaiting",
        {
            opacity: 1,
            duration: 0.3,
            ease: "sine.out",
            onComplete: () => {
                router.push({ path: hash.value });
                animationInit();
            },
        },
        "-=0.2"
    );
};

onBeforeMount(() => {
    hash.value = router.currentRoute.value.path;
});
onMounted(() => {
    started.value = sessionStorage.getItem("started");
    animationInit();
});
watch(hash, (value) => {
    if (value != "") {
        animationTransition();
    }
});
</script>

<template>
    <div class="overlay">
        <div
            v-if="started === null"
            class="overlayStart"
            @click="animationStart"
        >
            <div class="overlayStartButton overlayStartOff">START</div>
            <div class="overlayStartButton overlayStartOn">START</div>
        </div>

        <div class="overlayWaiting">
            <client-only>
                <Vue3Lottie :animationData="Loader" autoPlay loop />
            </client-only>
        </div>

        <div class="overlaySlide overlaySlideTop">
            <div class="overlaySlideBack overlaySlideBackTop"></div>
            <img
                class="overlaySlideBackTopImg"
                src="~/assets/svg/gearback.svg"
                alt="gear back top"
                width="300px"
                height="150px"
            />
            <div class="overlaySlideBackTopGear">
                <img
                    class="gearsRotate"
                    src="~/assets/svg/gear.svg"
                    alt="gear bottom"
                    width="300px"
                    height="300px"
                />
            </div>
        </div>

        <div class="overlaySlide overlaySlideBottom">
            <div class="overlaySlideBack overlaySlideBackBottom"></div>
            <img
                class="overlaySlideBackBottomImg"
                src="~/assets/svg/gearback.svg"
                alt="gear back bottom"
                width="300px"
                height="150px"
            />
            <div class="overlaySlideBackBottomGear">
                <img
                    class="gearsRotate"
                    src="~/assets/svg/gear.svg"
                    alt="gear bottom"
                    width="300px"
                    height="300px"
                />
            </div>
        </div>

        <div class="overlaySlideGear overlaySlideGearTop">
            <div class="overlaySlideGearBlend overlaySlideGearTopBlend">
                <img
                    class="gearsRotate"
                    src="~/assets/svg/gear.svg"
                    alt="gear bottom"
                    width="300px"
                    height="300px"
                />
            </div>
        </div>

        <div class="overlaySlideGear overlaySlideGearBottom">
            <div class="overlaySlideGearBlend overlaySlideGearBottomBlend">
                <img
                    class="gearsRotate"
                    src="~/assets/svg/gear.svg"
                    alt="gear bottom"
                    width="300px"
                    height="300px"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
$mainColor: rgb(28, 32, 32); // 1c2020
$secondColor: rgb(233, 222, 190); // e9debe
$thirdColor: rgb(227, 223, 223); // e3dfdf
$greenColor: rgb(86, 245, 105); // 56f569
$purpleColor: rgb(245, 86, 226); // f556e2
$orangeColor: rgb(242, 116, 5); // f27405

.overlay {
    z-index: 100;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    font-family: "Anton", sans-serif;
    pointer-events: none;
    &Waiting {
        position: absolute;
        width: 230px;
        height: 230px;
        background-color: $mainColor;
    }
    &Start {
        position: absolute;
        width: 230px;
        height: 230px;
        transform: translateX(-90%);
        background-color: $mainColor;
        &Button {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 230px;
            height: 230px;
            font-size: 2.5rem;
            cursor: pointer;
        }
        &Off {
            color: $orangeColor;
        }
        &On {
            background-color: $orangeColor;
            color: $mainColor;
            clip-path: inset(0% 100% 0% 0%);
        }
    }
    &Slide {
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 50%;
        &Back {
            width: 100%;
            height: 100%;
            background-color: $mainColor;
            &Top {
                clip-path: polygon(
                    0 0,
                    0 calc(100% + 0.5px),
                    calc(50% - 149.5px) calc(100% + 0.5px),
                    calc(50% - 149.5px) calc(calc(100% + 0.5px) - 149.5px),
                    calc(50% + 149.5px) calc(calc(100% + 0.5px) - 149.5px),
                    calc(50% + 149.5px) calc(100% + 0.5px),
                    100% calc(100% + 0.5px),
                    100% 0
                );
                &Img {
                    position: absolute;
                    bottom: 0;
                    transform: rotateZ(180deg);
                }
                &Gear {
                    height: 300px;
                    width: 300px;
                    position: absolute;
                    bottom: -150px;
                    clip-path: inset(0 0 calc(50% - 0.5px) 0);
                }
            }
            &Bottom {
                clip-path: polygon(
                    0 0,
                    calc(50% - 149.5px) 0,
                    calc(50% - 149.5px) 149.5px,
                    calc(50% + 149.5px) 149.5px,
                    calc(50% + 149.5px) 0,
                    100% 0,
                    100% 100%,
                    0 100%
                );
                &Img {
                    position: absolute;
                    top: 0;
                }
                &Gear {
                    height: 300px;
                    width: 300px;
                    position: absolute;
                    top: -150px;
                    clip-path: inset(calc(50% - 0.5px) 0 0 0);
                }
            }
        }
        &Gear {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            mix-blend-mode: screen;
            & img {
                width: 300px;
                height: 300px;
            }
            &Blend {
                position: absolute;
                width: 300px;
                height: 300px;
            }
            &Top {
                &Blend {
                    clip-path: inset(50% 0 0 0);
                }
            }
            &Bottom {
                &Blend {
                    clip-path: inset(0 0 50% 0);
                }
            }
        }
    }
}
.gearsRotate {
    animation: gearRotate 30s infinite linear;
}
@keyframes gearRotate {
    to {
        transform: rotateZ(360deg);
    }
}
</style>
