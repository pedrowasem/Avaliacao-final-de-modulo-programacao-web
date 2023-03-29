const toggle = document.getElementById("toggle");

window.addEventListener("DOMContentLoaded", () => {
    const toggleLocalStorage = JSON.parse(localStorage.getItem("toggle") ?? false);
    if (toggleLocalStorage) {
        toggle.classList.toggle("active");
        mudaModoPagina();
    }
});

toggle.onclick = function () {
    toggle.classList.toggle("active");
    mudaModoPagina();
};

function mudaModoPagina() {
    if (toggle.classList.contains("active")) {
        document.querySelectorAll(".bg-light-mode").forEach((element) => {
            element.classList.toggle("bg-dark-mode");
            element.classList.toggle("bg-light-mode");
        });
        document.querySelector(".navbar").classList.toggle("navbar-dark");
        document.querySelectorAll(".bi").forEach((element) => {
            element.classList.toggle("bi-dark");
        });
        document.querySelectorAll(".border-dark").forEach((element) => {
            element.classList.toggle("border-white");
            element.classList.toggle("border-dark");
        });
        document.querySelectorAll(".text-dark").forEach((element) => {
            element.classList.toggle("text-white");
            element.classList.toggle("text-dark");
        });
        toggle.toggleAttribute("checked");
        localStorage.setItem("toggle", JSON.stringify(true));
        return;
    }
    document.querySelectorAll(".bg-dark-mode").forEach((element) => {
        element.classList.toggle("bg-light-mode");
        element.classList.toggle("bg-dark-mode");
    });
    document.querySelector(".navbar").classList.toggle("navbar-dark");
    document.querySelectorAll(".bi").forEach((element) => {
        element.classList.toggle("bi-dark");
    });
    document.querySelectorAll(".border-white").forEach((element) => {
        element.classList.toggle("border-dark");
        element.classList.toggle("border-white");
    });
    document.querySelectorAll(".text-white").forEach((element) => {
        element.classList.toggle("text-dark");
        element.classList.toggle("text-white");
    });
    toggle.toggleAttribute("checked");
    localStorage.setItem("toggle", JSON.stringify(false));
}
