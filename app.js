document.addEventListener('DOMContentLoaded', function() {
    var logo = document.querySelector('.logo');
    var h1 = document.querySelector('h1');

    setTimeout(function() {
        logo.classList.add('show');
        h1.classList.add('show');
    }, 1000);
});



// Modal show/hide

var modalContainer = document.querySelector(".modalContainer");
var modalIframe = modalContainer.querySelector("iframe");
var modalOpenNewTab = modalContainer.querySelector("a.newTab");

function openModal(href) {
    modalIframe.removeAttribute("src");
    modalOpenNewTab.removeAttribute("href");
    modalIframe.src = modalOpenNewTab.href = href;
    modalContainer.removeAttribute("hidden");
}

function closeModal() {
    if (!modalContainer.hasAttribute("hidding") && !modalContainer.hasAttribute("hidden")) {
        modalContainer.setAttribute("hidding", "");

        modalContainer.addEventListener("animationend", (eAnim) => {
            if (eAnim.animationName === "fadeOut") {
                modalContainer.setAttribute("hidden", "");
                modalContainer.removeAttribute("hidding");
                modalIframe.removeAttribute("src");
                modalOpenNewTab.removeAttribute("href");
            }
        }, { once: true });
    }
}

modalIframe.addEventListener("load", (eventIframe) => {
    let lastModalSrc = modalOpenNewTab.href;

    if (!modalContainer.hasAttribute("hidding") && !modalContainer.hasAttribute("hidden")) {
        if (modalIframe.contentWindow.location.href != lastModalSrc) {
            eventIframe.preventDefault(); // prevent navigation
            closeModal();
        }
    }
});

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