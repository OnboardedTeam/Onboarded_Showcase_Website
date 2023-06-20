document.addEventListener('DOMContentLoaded', function() {
    var logo = document.querySelector('.logo');
    var h1 = document.querySelector('h1');

    setTimeout(function() {
        logo.classList.add('show');
        h1.classList.add('show');
    }, 1000);
});


// Modal show/hide

function openModal(href) {
    var modalContainer = document.querySelector(".modalContainer");
    var modalIframe = modalContainer.querySelector("iframe");

    modalIframe.src = href;
    modalContainer.removeAttribute("hidden");

    modalIframe.addEventListener("load", (eventMainIframe) => {
        modalIframe.addEventListener("load", (eventIframe) => {
            eventIframe.preventDefault(); // prevent navigation
            closeModal();
        }, { once: true });
    }, { once: true });
}

function closeModal() {
    var modalContainer = document.querySelector(".modalContainer");

    if (!modalContainer.hasAttribute("hidding")) {
        modalContainer.setAttribute("hidding", "");

        modalContainer.addEventListener("animationend", (eAnim) => {
            if (eAnim.animationName === "fadeOut") {
                modalContainer.removeAttribute("hidding");
                modalContainer.setAttribute("hidden", "");
            }
        }, { once: true });
    }
}

window.addEventListener("click", (event) => {
    var target = event.target;

    var modalContainer = document.querySelector(".modalContainer");
    var modalIframe = modalContainer.querySelector("iframe");

    if (target.tagName === "A" && target.getAttribute("href")) {
        var href = target.getAttribute("href");

        if (target.hasAttribute("openModal") && target.getAttribute("openModal") !== "false") {
            event.preventDefault(); // cancel navigation

            openModal(href);
        }
    } else if (!modalContainer.hasAttribute("hidden") && !modalContainer.hasAttribute("hidding")) {
        if ((target === modalContainer && target !== modalIframe) || (target.tagName === "BUTTON" && target.classList.contains("goBack"))) {
            closeModal();
        }
    }
});