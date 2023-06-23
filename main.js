AOS.init();

window.mobileCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

function scrollToTopCheck() {
  let scrollTopButton = document.getElementById("backToTop");
  if (window.scrollY > 460) {
    scrollTopButton.removeAttribute("hidden");
    scrollTopButton.style.opacity = "1";
  } else {
    scrollTopButton.style.opacity = "0";
    scrollTopButton.addEventListener(
      "transitionend",
      (event) => {
        if (event.propertyName == "opacity") {
          scrollTopButton.setAttribute("hidden", "");
        }
      },
      { once: true }
    );
  }
}

if (!window.mobileCheck()) {
  scrollToTopCheck();
  window.addEventListener("scroll", scrollToTopCheck);
}

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

window.addEventListener("click", function (event) {
  const path = event.path || (event.composedPath && event.composedPath());
  const link = path.find(
    (el) => el.tagName === "A" && el.getAttribute("href").startsWith("#")
  );
  if (link) {
    event.preventDefault();
    const targetElement = document.querySelector(link.getAttribute("href"));
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  }
});

const cursorEffects_cursor3D_perspective = "650px";
const cursorEffects_cursor3D_reset_timing = "0.25s";

var lastCard;
var currentCardTransition = false;
var currentCardReady = false;

function resetCard(card) {
  const cursorEffects_cursor3D_reset_timing = "0.25s";

  let reset = false;
  if (card.hasAttribute("effect-reset")) {
    reset = card.getAttribute("effect-reset") != "false";
  }
  if (reset == true) {
    card.style.transition = `${cursorEffects_cursor3D_reset_timing}`;
    card.style.transform = `perspective(${cursorEffects_cursor3D_perspective}) rotateX(0deg) rotateY(0deg)`;
  } else {
    card.style.transform = "";
    card.style.transition = "";
  }
}

function resetCards() {
  const cardsList = document.querySelectorAll(":is([effect=cursor3D])");
  cardsList.forEach((card) => {
    resetCard(card);
  });
  currentCardTransition = currentCardReady = false;
  lastCard = undefined;
}

window.addEventListener("mousemove", (event) => {
  const cardsList = document.querySelectorAll(":is([effect=cursor3D])");
  const path = event.path || (event.composedPath && event.composedPath());
  const card = Array.from(cardsList).find((card) => path.includes(card));
  if (card) {
    if (lastCard && card != lastCard) {
      resetCard(lastCard);
      currentCardTransition = currentCardReady = false;
    }

    if (!currentCardReady && !currentCardTransition) {
      let reset = false;
      if (card.hasAttribute("effect-reset")) {
        reset = card.getAttribute("effect-reset") != "false";
      }
      if (reset == true) {
        resetCard(card);
      }
    }

    let power = 1;
    if (card.hasAttribute("effect-power")) {
      power = card.getAttribute("effect-power") || power;
    }

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const angleX = (deltaY / 15) * power;
    const angleY = (-deltaX / 20) * power;

    requestAnimationFrame(() => {
      if (!lastCard || card == lastCard) {
        card.style.transform = `perspective(${cursorEffects_cursor3D_perspective}) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      }
    });
    lastCard = card;
    if (!currentCardReady && !currentCardTransition) {
      currentCardTransition = true;
      card.addEventListener(
        "transitionend",
        (transEvent) => {
          if (transEvent.propertyName == "transform") {
            if (!lastCard || card == lastCard) {
              currentCardReady = true;
              currentCardTransition = false;
              card.style.transition = "0s";
            }
          }
        },
        { once: true }
      );
    }
  } else {
    resetCards();
  }
});

window.addEventListener("blur", (event) => {
  resetCards();
});

window.addEventListener("mouseout", (event) => {
  resetCards();
});

window.addEventListener("scroll", (event) => {
  var background = document.querySelector("div.background_full video");
  if (background && background != null) {
    var scrollPercent =
      (window.scrollY * 100) /
      Math.max(
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight,
        1
      );
    var minScale = -8; // Valeur minimale de la plage de mise à l'échelle
    var maxScale = 8; // Valeur maximale de la plage de mise à l'échelle
    var scaledValue = (maxScale - minScale) * (scrollPercent / 100) + minScale;
    background.style.transform = `scale(120%) translateY(${scaledValue}%)`;
  }
});
