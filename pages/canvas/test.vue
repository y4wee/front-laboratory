<script setup>
import { gsap } from "gsap";

let canvas;
let ctx;
let effect;
let reqAnimation;
let text = ["Hello World", "Hello You", "Front Laboratory"];
const textIndex = ref(0);

class Particle {
    constructor(effect, x, y, color) {
        this.effect = effect;
        this.x = Math.random() * this.effect.canvasWidth;
        this.y = Math.random() * this.effect.canvasHeight;
        this.originX = x;
        this.originY = y;
        this.size = this.effect.gap;
        this.color = color;
        this.vx = 0.1;
        this.vy = 0.1;
        this.friction = 0.1;
        this.ease = 0.04;
    }
    update() {
        this.x +=
            (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
        this.y +=
            (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
    }
    draw() {
        // only change colours when this colour is different than previous
        this.effect.context.fillStyle = this.color;
        this.effect.context.fillRect(this.x, this.y, this.size, this.size);
    }
}
class Effect {
    constructor(context, canvasWidth, canvasHeight) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.maxTextWidth = this.canvasWidth * 0.8;
        this.fontSize = 100;
        this.textVerticalOffset = 0;
        this.lineHeight = this.fontSize * 1.2;
        this.textX = this.canvasWidth / 2;
        this.textY = this.canvasHeight / 2 - this.lineHeight / 2;

        this.particles = [];
        this.gap = 2;
    }
    wrapText(text) {
        this.context.font = this.fontSize + "px Anton";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.strokeStyle = "#1c2020";
        this.context.lineWidth = 5;
        this.context.imageSmoothingEnabled = false;
        this.context.fillStyle = "#f27405";
        let linesArray = [];
        let words = text.split(" ");
        let lineCounter = 0;
        let line = "";
        for (let i = 0; i < words.length; i++) {
            let testLine = line + words[i] + " ";
            if (this.context.measureText(testLine).width > this.maxTextWidth) {
                line = words[i] + " ";
                lineCounter++;
            } else {
                line = testLine;
            }
            linesArray[lineCounter] = line;
        }
        let textHeight = this.lineHeight * lineCounter;
        this.textY =
            this.canvasHeight / 2 - textHeight / 2 + this.textVerticalOffset;
        linesArray.forEach((el, index) => {
            this.context.fillText(
                el,
                this.textX,
                this.textY + index * this.lineHeight
            );
            this.context.strokeText(
                el,
                this.textX,
                this.textY + index * this.lineHeight
            );
        });
        this.convertToParticles();
    }
    convertToParticles() {
        this.particles = [];
        const pixels = this.context.getImageData(
            0,
            0,
            this.canvasWidth,
            this.canvasHeight
        ).data;
        for (let y = 0; y < this.canvasHeight; y += this.gap) {
            for (let x = 0; x < this.canvasWidth; x += this.gap) {
                const index = (y * this.canvasWidth + x) * 4;
                const alpha = pixels[index + 3];
                if (alpha > 0) {
                    const red = pixels[index];
                    const green = pixels[index + 1];
                    const blue = pixels[index + 2];
                    const color = `rgb(${red},${green},${blue})`;
                    this.particles.push(new Particle(this, x, y, color));
                }
            }
        }
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
    render() {
        this.particles.forEach((particle) => {
            particle.update();
            particle.draw();
        });
    }
}

const animation = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.render();
    reqAnimation = requestAnimationFrame(animation);
};

const textChange = (way) => {
    if (way === "next") {
        if (textIndex.value === text.length - 1) {
            textIndex.value = 0;
        } else {
            textIndex.value += 1;
        }
    } else {
        if (textIndex.value === 0) {
            textIndex.value = text.length - 1;
        } else {
            textIndex.value--;
        }
    }
};

onMounted(() => {
    setTimeout(() => {
        canvas = document.getElementById("canvas-text");
        ctx = canvas.getContext("2d", { willReadFrequently: true });
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        effect = new Effect(ctx, canvas.width, canvas.height);
        effect.wrapText(text[textIndex.value]);

        animation();
    }, 1000);
});
onBeforeUnmount(() => {
    window.cancelAnimationFrame(reqAnimation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
watch(textIndex, (value) => {
    window.cancelAnimationFrame(reqAnimation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    effect = new Effect(ctx, canvas.width, canvas.height);
    effect.wrapText(text[value]);

    animation();
});
</script>

<template>
    <div class="main" @mousemove="mouseHandle">
        <canvas id="canvas-text"></canvas>

        <div class="mainControls">
            <button @click="textChange('prev')">Prev</button>
            <button @click="textChange('next')">Next</button>
            {{ textIndex }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.main {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #e3dfdf;
    &Controls {
        z-index: 10;
        position: absolute;
        top: 0;
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        padding: 20px;
        & button {
            margin: 0 10px;
        }
    }
}
#canvas {
    position: absolute;
    background: transparent;
}
</style>
