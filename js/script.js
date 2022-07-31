// menu-burger
const burger = document.querySelector(".menu__burger");
const menu = document.querySelector(".menu__body");
const menuLinks = menu.querySelectorAll(".menu__link");
const menuBurgerBg = document.querySelector(".menu-burger-bg ");

function openBurgerMenu() {
  burger.classList.toggle("burger-active");
  menu.classList.toggle("burger-menu-active");
  menuBurgerBg.classList.add("visible");
  document.body.classList.add("stop-scroll");
}

function closeBurgerMenu(event) {
  burger.classList.remove("burger-active");
  menu.classList.remove("burger-menu-active");
  menuBurgerBg.classList.remove("visible");
  document.body.classList.remove("stop-scroll");
}

document.addEventListener("click", (event) => {
  if (event.target.contains(menuBurgerBg)) {
    closeBurgerMenu();
  }
});

burger.addEventListener("click", () => {
  if (burger.classList.contains("burger-active")) {
    closeBurgerMenu();
  } else {
    openBurgerMenu();
  }
});
menuLinks.forEach((el) => el.addEventListener("click", closeBurgerMenu));

// destinations-slider
const swiper = document.querySelector(".swiper");

let slider = new Swiper(swiper, {
  slideToClickedSlide: true,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 3000,
  },

  slidesPerView: "auto",
  spaceBetween: 30,

  pagination: {
    el: ".swiper-pagination",
    bulletActiveClass: "bullet-active",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  grabCursor: true,

  breakpoints: {
    768: {
      slidesPerView: 1.745,
      spaceBetween: 60,
    },
  },

  a11y: {
    prevSlideMessage: "Предыдущий",
    nextSlideMessage: "Следующий",
  },
});

slider.activeIndex = 2;

//see more stories

function isHidden(el) {
  const style = window.getComputedStyle(el);
  return style.display === "none";
}

function setShowMore(showQuantity) {
  const btnStories = document.querySelector(".js-show-btn");

  btnStories.addEventListener("click", function () {
    const articles = Array.from(document.querySelectorAll(".stories__item"));
    const hiddenIndex = articles.findIndex((article) => isHidden(article));

    for (let k = hiddenIndex; k < hiddenIndex + showQuantity; k++) {
      if (articles[k]) {
        articles[k].style.display = "block";
      } else {
        btnStories.style.display = "none";
        break;
      }
    }
  });
}

setShowMore(2);

// popup
const loginLink = document.querySelectorAll(".js-login");
const popupLogin = document.querySelector(".popup-login");
const popupTitle = document.querySelector(".popup-title");
const registerLink = document.querySelector(".register-link");
const popupRegisterHideElements = document.querySelectorAll(".js-register");
const popupForm = document.querySelector(".form");
const formBtn = document.querySelector(".form__button-login");
const registerText = document.querySelector(".popup-text");
const formInput = document.querySelectorAll(".form__input");
const formSearch = document.querySelector(".search");
const formInputSearch = document.querySelector(".search__input");

const inertClick = document.querySelectorAll(".inert");

let activeTypePopup = false;
const arrayInputData = [];

function logIn() {
  closeBurgerMenu();
  returnlogIn();
  inertContent();
  popupLogin.classList.add("visible");
  document.body.classList.add("stop-scroll");
}

function closeLogIn() {
  inertContentRemove();
  popupLogin.classList.remove("visible");
  document.body.classList.remove("stop-scroll");
}

function signIn() {
  popupRegisterHideElements.forEach((el) => el.classList.add("hide"));
  popupTitle.textContent = "Create account";
  formBtn.textContent = "Sign Up";
  registerLink.textContent = "Log in";
  registerText.textContent = "Already have an account?";
  popupForm.style.marginBottom = "48px";
  popupForm.style.setProperty("--border-indent", "22px");

  activeTypePopup = true;
}

function returnlogIn() {
  popupRegisterHideElements.forEach((el) => el.classList.remove("hide"));
  popupTitle.textContent = "Log in to your account";
  formBtn.textContent = "Sign In";
  formBtn.classList.remove("form__button-signup");
  registerLink.textContent = "Register";
  registerText.textContent = "Don’t have an account?";
  popupForm.style.marginBottom = "11px";
  popupForm.style.setProperty("--border-indent", "0");

  activeTypePopup = false;
}

function getFormData() {
  formInput.forEach((el) => arrayInputData.push(el.value));
  alert(`
  E-mail: ${arrayInputData[0]}
  Password: ${arrayInputData[1]}`);
  formInput.forEach((el) => (el.value = ""));
}

// функции, которые добавляют и убирают атрибут inert всем элементам, кроме модального окна, чтобы они были недоступны для фокуса и т.п.
function inertContent() {
  inertClick.forEach((element) => element.setAttribute("inert", true));
}

function inertContentRemove() {
  inertClick.forEach((element) => element.removeAttribute("inert"));
}

//Слушатели
loginLink.forEach((el) =>
  el.addEventListener("click", (event) => {
    event.preventDefault();
    logIn();
  })
);

document.addEventListener("click", (event) => {
  if (event.target.contains(popupLogin)) {
    closeLogIn();
    event.preventDefault();
  }
});

registerLink.addEventListener("click", () => {
  if (activeTypePopup === true) {
    returnlogIn();
  } else {
    signIn();
  }
});

// validate forms
const validatePlan = new window.JustValidate(formSearch, {
  errorLabelStyle: {
    color: "#ffffff",
  },
});

validatePlan.onSuccess(function () {
  formSearch.submit();
  formInputSearch.value = "";
});

validatePlan.addField("#plan", [
  {
    rule: "required",
    errorMessage: "Request can not be empty!",
  },
  {
    rule: "minLength",
    value: 3,
    errorMessage: "Request cannot be less than 3 characters",
  },
]);

const validateLogin = new window.JustValidate(popupForm, {
  errorLabelStyle: {
    color: "#f2785c",
  },
});

validateLogin.onSuccess(function () {
  // popupForm.submit();
  getFormData();
});

validateLogin
  .addField("#email", [
    {
      rule: "required",
      errorMessage: "E-mail is required",
    },
    {
      rule: "email",
      errorMessage: "E-mail is invalid!",
    },
  ])
  .addField("#password", [
    {
      rule: "required",
      errorMessage: "Password is required (min 8 chars, min 1 capital letter)",
    },
    {
      rule: "password",
      errorMessage: "Password is invalid!",
    },
  ]);
