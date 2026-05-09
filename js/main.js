import { renderAutos } from "./cards.js";
import { initFiltros } from "./filter.js";

const API = "/api/autos";

document.addEventListener("DOMContentLoaded", async () => {

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll(".porque-item").forEach((item) => {
        observer.observe(item);
    });

    try {

        const res = await fetch(API);
        const autos = await res.json();

        renderAutos(autos);
        initFiltros(autos);

    } catch (error) {

        console.error("Error cargando autos:", error);

    }

});
