/*-----------------------/
/                        /
/     MAIN PAGE PART     /
/                        /
/-----------------------*/

document.addEventListener('DOMContentLoaded', () => {
    document.body.setAttribute("locked", "");
    let discoverButton = document.getElementById("discoverButton");
    if (discoverButton && discoverButton != null) {
        discoverButton.addEventListener("click", (event) => {
            let mainPage = document.getElementById("mainPage");
            mainPage.setAttribute("hidding", "");
            document.body.removeAttribute("locked");
            mainPage.addEventListener("animationend", (animationEvent) => {
                if (animationEvent.animationName == "fadeOut") {
                    mainPage.setAttribute("hidden", "");
                    mainPage.removeAttribute("hidding");
                }
            });
        });
    }
});

/*------------------------------/
/                               /
/     END OF MAIN PAGE PART     /
/                               /
/------------------------------*/





/*------------------------/
/                         /
/     MENU LINKS PART     /
/                         /
/------------------------*/

window.addEventListener('click', (event) => {
    const target = event.target.closest('header a.sectionLink');
    if (target) {
        const links = document.querySelectorAll('header a.sectionLink');

        links.forEach(link => {
            link.removeAttribute('selected');
        });

        target.setAttribute('selected', '');
    }
});

window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    const target = document.querySelector(`header a.sectionLink[href="${hash}"]`);

    const links = document.querySelectorAll('header a.sectionLink');

    links.forEach(link => {
        link.removeAttribute('selected');
    });
    if (target) {
        target.setAttribute('selected', '');
    }
});

function isElementVisible(elem) {
    if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');
    const style = getComputedStyle(elem);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < 0.1) return false;
    if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
        elem.getBoundingClientRect().width === 0) {
        return false;
    }
    const elemCenter = {
        x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
        y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };
    if (elemCenter.x < 0) return false;
    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elemCenter.y < 0) return false;
    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
        if (pointContainer === elem) return true;
    } while (pointContainer = pointContainer.parentNode);
    return false;
}

document.body.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section'); // Sélectionnez toutes les sections

    sections.forEach(section => {
        const link = document.querySelector(`header a.sectionLink[href="#${section.id}"]`); // Trouvez le lien correspondant à la section

        if (link && isElementVisible(section)) { // Vérifiez si la section est visible
            const links = document.querySelectorAll('header a.sectionLink');

            links.forEach(link => {
                link.removeAttribute('selected');
            });

            link.setAttribute('selected', '');
        }
    });
});

/*-------------------------------/
/                                /
/     END OF MENU LINKS PART     /
/                                /
/-------------------------------*/





/*-------------------------------/
/                                /
/     HORIZONTAL SCROLL PART     /
/                                /
/-------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('wheel', (event) => {
        if (nextScrollTo == null) {
            nextScrollTo = 0;
        }
        nextScrollTo += event.deltaY*2;
    });
});

var nextScrollTo = null;
setInterval(() => {
    if (nextScrollTo != null && !document.body.hasAttribute('locked')) {
        scrollByPage(nextScrollTo);
    }
    nextScrollTo = null;
}, 85);

function scrollToMax() {
    // Défilement horizontal vers le maximum
    var maxScrollLeft = document.body.scrollWidth - document.body.clientWidth;
    document.body.scrollTo({
        left: maxScrollLeft,
        behavior: 'smooth'
    });
}
function scrollToMin() {
    document.body.scrollTo({
        left: 0,
        behavior: 'smooth'
    });
}
function scrollByPage(delta) {
    document.body.scrollTo({
        left: document.body.scrollLeft + delta,
        behavior: 'smooth'
    });
}

var isKeyDown = false;
document.addEventListener('keydown', (event) => {
    if (isKeyDown == false && !document.body.hasAttribute('locked')) {
        isKeyDown = true;
        if (event.key === 'End') {
            event.preventDefault();
            scrollToMax();
        } else if (event.key === 'Home') {
            event.preventDefault();
            scrollToMin();
        } else if (event.key === 'PageDown') {
            event.preventDefault();
            if (event.altKey) {
                scrollToMax();
            } else {
                scrollByPage(500);
            }
        } else if (event.key === 'PageUp') {
            event.preventDefault();
            if (event.altKey) {
                scrollToMin();
            } else {
                scrollByPage(-500);
            }
        }
        setTimeout(() => {
            isKeyDown = false;
        }, 150)
    }
});

/*--------------------------------------/
/                                       /
/     END OF HORIZONTAL SCROLL PART     /
/                                       /
/--------------------------------------*/