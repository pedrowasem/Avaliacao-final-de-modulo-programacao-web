const toggle = document.getElementById("toggle");

window.addEventListener("DOMContentLoaded", () => {
    const toggleLocalStorage = JSON.parse(localStorage.getItem("toggle") ?? false);
    if (toggleLocalStorage) {
        toggle.classList.toggle("active");
        mudaModo(document);
    }
});

toggle.onclick = function () {
    toggle.classList.toggle("active");
    mudaModo(document);
};

function mudaModo(elemento) {
    const navbar = elemento.querySelector(".navbar");
    if (toggle.classList.contains("active")) {
        elemento.querySelectorAll(".bg-light-mode").forEach((element) => {
            element.classList.toggle("bg-dark-mode");
            element.classList.toggle("bg-light-mode");
        });
        elemento.querySelectorAll(".bi").forEach((element) => {
            element.classList.add("bi-dark");
        });
        elemento.querySelectorAll(".border-dark").forEach((element) => {
            element.classList.toggle("border-white");
            element.classList.toggle("border-dark");
        });
        elemento.querySelectorAll(".text-dark").forEach((element) => {
            element.classList.toggle("text-white");
            element.classList.toggle("text-dark");
        });
        toggle.toggleAttribute("checked");
        localStorage.setItem("toggle", JSON.stringify(true));
        if (navbar) {
            navbar.classList.toggle("navbar-dark");
        }
        return;
    }
    elemento.querySelectorAll(".bg-dark-mode").forEach((element) => {
        element.classList.toggle("bg-light-mode");
        element.classList.toggle("bg-dark-mode");
    });
    elemento.querySelectorAll(".bi").forEach((element) => {
        element.classList.remove("bi-dark");
    });
    elemento.querySelectorAll(".border-white").forEach((element) => {
        element.classList.toggle("border-dark");
        element.classList.toggle("border-white");
    });
    elemento.querySelectorAll(".text-white").forEach((element) => {
        element.classList.toggle("text-dark");
        element.classList.toggle("text-white");
    });
    toggle.toggleAttribute("checked");
    localStorage.setItem("toggle", JSON.stringify(false));
    if (navbar) {
        elemento.querySelector(".navbar").classList.toggle("navbar-dark");
    }
}
