export default defineNuxtPlugin(() => {
    let projects = [
        {
            index: 0,
            image: "/img/home/slider_exoape.jpg",
            video: "/video/slider_exoape.mp4",
            link: "/slider/exo-ape",
            refName: "ExoApe",
            refLink:
                "https://dribbble.com/shots/18201219-Exo-Ape-Case-Hero-Header",
            refColor: "rgb(227, 223, 223)",
        },
        {
            index: 1,
            image: "/img/home/carousel_3d.jpg",
            video: "/video/carousel_3d.mp4",
            link: "/carousel/3d",
            refName: "MySelf",
            refLink: "#",
            refColor: "rgb(28, 32, 32)",
        },
        {
            index: 2,
            image: "/img/home/canvas_hat.png",
            video: "/video/canvas_hat.mp4",
            link: "/canvas/particles-hat",
            refName: "Frank's lab",
            refLink: "https://www.youtube.com/c/Frankslaboratory",
            refColor: "rgb(28, 32, 32)",
        },
        {
            index: 3,
            image: "/img/home/nav_legends.jpg",
            video: "/video/nav_legends.mp4",
            link: "/nav/legends",
            refName: "Seacat",
            refLink: "https://seacat.rossinavi.it/",
            refColor: "rgb(227, 223, 223)",
        },
        {
            index: 4,
            image: "/img/home/grid_miles.jpg",
            video: "/video/grid_miles.mp4",
            link: "/grid/miles",
            refName: "Theud.tv",
            refLink: "https://theud.tv/",
            refColor: "rgb(227, 223, 223)",
        },
    ];
    return {
        provide: {
            projects: projects,
        },
    };
});
