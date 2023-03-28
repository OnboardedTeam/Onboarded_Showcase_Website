function scrollToTopCheck() {
    let scrollTopButton = document.getElementById("backToTop");
    if (window.scrollY > 460) {
        scrollTopButton.removeAttribute("hidden");
        scrollTopButton.style.opacity = "1";
    } else {
        scrollTopButton.style.opacity = "0";
        scrollTopButton.addEventListener('transitionend', (event) => {
            if (event.propertyName == "opacity") {
                scrollTopButton.setAttribute("hidden", "");
            }
        }, {once: true});
    }
};

scrollToTopCheck()
window.addEventListener('scroll', scrollToTopCheck);


/* window.addEventListener('click', function (event) {
    let el = event.target;
    while (el && el.tagName !== 'A') {
        el = el.parentNode;
    }
    if (el && el.getAttribute('href').startsWith('#')) {
        event.preventDefault();
        const targetElement = document.querySelector(el.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
}); */

window.addEventListener('click', function (event) {
    const path = event.path || (event.composedPath && event.composedPath());
    const link = path.find((el) => el.tagName === 'A' && el.getAttribute('href').startsWith('#'));
    if (link) {
        event.preventDefault();
        const targetElement = document.querySelector(link.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});






var lastCard;
var currentCardTransition = false;
var currentCardReady = false;

function resetCard() {
    const cardsList = document.querySelectorAll(":is([effect=cursor3D])");
    cardsList.forEach((card) => {
        card.style.transform = '';
        card.style.transition = '';
    });
    currentCardTransition = currentCardReady = false;
    lastCard = undefined;
};

window.addEventListener('mousemove', (event) => {
    const cardsList = document.querySelectorAll(":is([effect=cursor3D])");
    const path = event.path || (event.composedPath && event.composedPath());
    const card = Array.from(cardsList).find((card) => path.includes(card));
    if (card) {
        if (lastCard && card != lastCard) {
            lastCard.style.transform = '';
            lastCard.style.transition = '';
            currentCardTransition = currentCardReady = false;
        }
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const angleX = deltaY / 15;
        const angleY = -deltaX / 20;

        requestAnimationFrame(() => {
            if (!lastCard || card == lastCard) {
                card.style.transform = `perspective(650px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            }
        });
        lastCard = card;
        if (!currentCardReady && !currentCardTransition) {
            currentCardTransition = true;
            card.addEventListener('transitionend', (transEvent) => {
                if (transEvent.propertyName == "transform") {
                    if (!lastCard || card == lastCard) {
                        currentCardReady = true;
                        currentCardTransition = false;
                        card.style.transition = '0s';
                    }
                }
            }, {once: true});
        }
    } else {
        resetCard();
    }
});

window.addEventListener('blur', (event) => {
    resetCard();
});

window.addEventListener('mouseout', (event) => {
    resetCard();
});