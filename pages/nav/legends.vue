<script setup>
import { gsap } from "gsap";

let nav = [
    {
        index: "01",
        text: "Ahri",
        image: "/img/nav/seacat/ahri.webp",
        imageMin: "/img/nav/seacat/ahri_min.webp",
    },
    {
        index: "02",
        text: "Hecarim",
        image: "/img/nav/seacat/hecarim.webp",
        imageMin: "/img/nav/seacat/hecarim_min.webp",
    },
    {
        index: "03",
        text: "Yasuo",
        image: "/img/nav/seacat/yasuo.webp",
        imageMin: "/img/nav/seacat/yasuo_min.webp",
    },
    {
        index: "04",
        text: "Riven",
        image: "/img/nav/seacat/riven.webp",
        imageMin: "/img/nav/seacat/riven_min.webp",
    },
    {
        index: "05",
        text: "Ekko",
        image: "/img/nav/seacat/ekko.webp",
        imageMin: "/img/nav/seacat/ekko_min.webp",
    },
    {
        index: "06",
        text: "Jinx",
        image: "/img/nav/seacat/jinx.webp",
        imageMin: "/img/nav/seacat/jinx_min.webp",
    },
    {
        index: "07",
        text: "Lee Sin",
        image: "/img/nav/seacat/lee_sin.webp",
        imageMin: "/img/nav/seacat/lee_sin_min.webp",
    },
    {
        index: "08",
        text: "Nasus",
        image: "/img/nav/seacat/nasus.webp",
        imageMin: "/img/nav/seacat/nasus_min.webp",
    },
    {
        index: "09",
        text: "Poppy",
        image: "/img/nav/seacat/poppy.webp",
        imageMin: "/img/nav/seacat/poppy_min.webp",
    },
    {
        index: "10",
        text: "Rengar",
        image: "/img/nav/seacat/rengar.webp",
        imageMin: "/img/nav/seacat/rengar_min.webp",
    },
    {
        index: "11",
        text: "Ryze",
        image: "/img/nav/seacat/ryze.webp",
        imageMin: "/img/nav/seacat/ryze_min.webp",
    },
    {
        index: "12",
        text: "Teemo",
        image: "/img/nav/seacat/teemo.webp",
        imageMin: "/img/nav/seacat/teemo_min.webp",
    },
];
const currentIndex = ref(0);

const listFade = () => {
    let listBottom = gsap.utils.toArray(".navBottomList li");
    let listTop = gsap.utils.toArray(".navTopList li");

    listBottom.forEach((li, index) => {
        let opacity = 0.5 - 0.1 * (index - currentIndex.value);
        gsap.to(li, {
            opacity: opacity,
            duration: 1.2,
            ease: "expo.out",
        });
    });
    listTop.forEach((li, index) => {
        let opacity = 0.5 + 0.1 * (index - currentIndex.value);
        gsap.to(li, {
            opacity: opacity,
            duration: 1.2,
            ease: "expo.out",
        });
    });
};
const navAnimation = () => {
    let percent = 100 / nav.length;
    let tl = gsap.timeline();

    tl.to(".navMiddleList", {
        yPercent: -percent * currentIndex.value,
        duration: 1.2,
        ease: "expo.out",
    });
    tl.to(
        ".navList",
        {
            yPercent: -percent * currentIndex.value,
            duration: 1.2,
            ease: "expo.out",
        },
        "-= 1.1"
    );
    tl.to(
        ".mainWrapBigSlider",
        {
            xPercent: -percent * currentIndex.value,
            duration: 1.6,
            ease: "expo.out",
        },
        "-= 1.1"
    );
    tl.to(
        ".mainWrapLittleSlider",
        {
            xPercent: -percent * currentIndex.value,
            duration: 1.6,
            ease: "expo.out",
        },
        "-= 1.6"
    );
    listFade();
};

const posStart = ref(0);
const posMove = ref(0);

const touchStart = (e) => {
    posStart.value = e.touches[0].clientY;
};
const touchEnd = (e) => {
    posStart.value = posMove.value = 0;
};
const touchMove = (e) => {
    posMove.value = e.changedTouches[0].clientY;
    let ratio = posStart.value - posMove.value;
    if (ratio <= -75) {
        if (currentIndex.value === 0) {
            return false;
        }
        posStart.value = posMove.value;
        currentIndex.value--;
        navAnimation();
    }
    if (ratio >= 75) {
        if (currentIndex.value === nav.length - 1) {
            return false;
        }
        posStart.value = posMove.value;
        currentIndex.value++;
        navAnimation();
    }
};
const onWheel = (e) => {
    e.preventDefault();

    if (e.deltaY > 0) {
        if (currentIndex.value === nav.length - 1) {
            return false;
        }
        currentIndex.value++;
    }
    if (e.deltaY < 0) {
        if (currentIndex.value === 0) {
            return false;
        }
        currentIndex.value--;
    }
    navAnimation();
};

onMounted(() => {
    listFade();
});
</script>

<template>
    <div
        class="main"
        @wheel="onWheel"
        @touchstart="touchStart"
        @touchend="touchEnd"
        @touchmove="touchMove"
    >
        <p class="mainSponsor">
            Inspired by
            <a href="https://seacat.rossinavi.it/" target="_blank">Seacat</a>
        </p>
        <nav class="navTop">
            <ul class="navList navTopList">
                <li v-for="charac in nav" :key="charac.index">
                    <span class="navListText">
                        {{ charac.text }}
                    </span>
                </li>
            </ul>
        </nav>
        <nav class="navMiddle">
            <ul class="navMiddleList">
                <li v-for="charac in nav" :key="charac.index">
                    <div class="navMiddleListIndex">
                        {{ charac.index }}
                    </div>
                    <span class="navMiddleListText">
                        {{ charac.text.toLocaleUpperCase() }}
                    </span>
                </li>
            </ul>
        </nav>
        <nav class="navBottom">
            <ul class="navList navBottomList">
                <li v-for="charac in nav" :key="charac.index">
                    <span class="navListText">
                        {{ charac.text }}
                    </span>
                </li>
            </ul>
        </nav>
        <div class="mainWrap mainWrapBig">
            <div class="mainWrapBigSlider mainWrapSlider">
                <div
                    class="mainWrapBigContainer"
                    v-for="charac in nav"
                    :key="charac.index"
                >
                    <img
                        :src="charac.image"
                        :alt="charac.text"
                        width="1100"
                        height="600"
                        loading="lazy"
                    />
                </div>
            </div>
            <div class="mainWrapBigOverlay"></div>
        </div>
        <div class="mainWrap mainWrapLittle">
            <div class="mainWrapLittleSlider mainWrapSlider">
                <div
                    class="mainWrapLittleContainer"
                    v-for="charac in nav"
                    :key="charac.index"
                >
                    <img
                        :src="charac.imageMin"
                        :alt="charac.text"
                        width="458"
                        height="250"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
        <img
            class="mainSquare"
            src="/img/nav/seacat/square.png"
            alt="cadre du little wrap"
            width="300"
            height="300"
        />
    </div>
</template>

<style scoped lang="scss">
.main {
    z-index: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: black;
    font-family: "Barlow", sans-serif;
    font-weight: bold;
    color: white;
    overflow: hidden;
    user-select: none;
    &Sponsor {
        z-index: 10;
        position: absolute;
        top: 0;
        align-self: center;
        color: #e3dfdf;
        & a {
            color: rgb(245, 86, 226);
            font-weight: bold;
        }
    }
    & * {
        box-sizing: border-box;
    }
    & ul {
        margin: 0;
        padding: 0;
        width: 100%;
        height: fit-content;
    }
    & li {
        display: flex;
        list-style-type: none;
    }
    &Wrap {
        position: absolute;
        align-self: center;
        &Big {
            width: 100vw;
            min-width: 750px;
            height: 100vh;
            transform: rotateZ(-20deg);
            &Slider {
                display: flex;
                align-items: center;
                height: 100%;
                width: fit-content;
            }
            &Container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 750px;
                min-width: 100vw;
                height: 100%;
                & img {
                    width: 750px;
                    height: auto;
                }
            }
            &Overlay {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 200%;
                height: 100%;
                min-height: 1100px;
                background-color: rgba($color: black, $alpha: 0.75);
            }
        }
        &Little {
            width: 200px;
            height: 200px;
            clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
            background-color: black;
            &Slider {
                display: flex;
                align-items: center;
                height: 100%;
                width: fit-content;
            }
            &Container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 200px;
                height: 100%;
                & img {
                    width: 200px;
                    height: auto;
                }
            }
        }
    }
    &Square {
        position: absolute;
        align-self: center;
        mix-blend-mode: screen;
        width: 200px;
        height: 200px;
    }
}
nav {
    z-index: 5;
    display: flex;
    overflow: hidden;
    white-space: nowrap;
}
.nav {
    &List {
        font-size: 1.4rem;
        & li {
            height: 40px;
            padding: 0 50px;
            margin: 10px 0;
            opacity: 0.5;
        }
        &Text {
            margin: auto 0;
        }
    }
    &Top {
        align-items: flex-end;
        width: 100%;
        height: calc(40vh - 35px);
        &List {
            transform: translateY(100%);
        }
    }
    &Middle {
        width: 100%;
        height: 70px;
        &List {
            &Index {
                margin: 20px;
                font-size: 1.2rem;
                color: #f27405;
                letter-spacing: 0.2rem;
            }
            &Text {
                margin: auto 0;
                font-size: 2rem;
                letter-spacing: 0.1rem;
            }
        }
        & li {
            height: 70px;
        }
    }
    &Bottom {
        width: 100%;
        height: calc(60vh - 35px);
        &List {
            transform: translateY(-60px);
        }
    }
}

@media all and (min-width: 700px) {
    .main {
        &Wrap {
            &Big {
                min-width: 1100px;
                &Container {
                    width: 1100px;
                    & img {
                        width: 1100px;
                    }
                }
            }
            &Little {
                width: 300px;
                height: 300px;
                &Container {
                    width: 300px;
                    & img {
                        width: 300px;
                    }
                }
            }
        }
        &Square {
            width: 300px;
            height: 300px;
        }
    }
    .nav {
        &List {
            font-size: 2rem;
            & li {
                padding-left: 22.5%;
                height: 60px;
            }
        }
        &Top {
            height: calc(40vh - 55px);
        }
        &Middle {
            height: 110px;
            &List {
                &Index {
                    margin: 30px;
                    font-size: 1.4rem;
                }
                &Text {
                    font-size: 3.5rem;
                }
            }
            & li {
                height: 110px;
                padding-left: 17%;
            }
        }
        &Bottom {
            height: calc(60vh - 55px);
            &List {
                transform: translateY(-80px);
            }
        }
    }
}
</style>
