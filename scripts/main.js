const appData = {
  header: {
    logo: "Epc<br>Hunters",
    navItems: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"],
    rightLink: "LOREM IPSUM",
  },
  steps: [
    {
      number: 1,
      text: "Lorem ipsum dolor sit, amet<br>consectetur adipisicing elit.",
    },
    {
      number: 2,
      text: "Lorem ipsum dolor sit, amet<br>consectetur adipisicing elit.",
    },
    {
      number: 3,
      text: "Lorem ipsum dolor sit, amet<br>consectetur adipisicing elit.",
    },
    {
      number: 4,
      text: "Lorem ipsum dolor sit, amet<br>consectetur adipisicing elit.",
    },
    {
      number: 5,
      text: "Lorem ipsum dolor sit, amet<br>consectetur adipisicing elit.",
    },
    {
      number: 6,
      text: "Lorem ipsum dolor sit, amet<br>consectetur adipisicing elit.",
    },
  ],
  desktopOrder: [1, 4, 5, 2, 3, 6], // порядок номеров
  pathLines: [
    { class: "path-line-img-1", src: "/images/ways/DottedLine-1.svg" },
    { class: "path-line-img-2", src: "/images/ways/DottedLine-2.svg" },
    { class: "path-line-img-3", src: "/images/ways/DottedLine-3.svg" },
    { class: "path-line-img-4", src: "/images/ways/DottedLine-4.svg" },
    { class: "path-line-img-5", src: "/images/ways/DottedLine-5.svg" },
  ],
  infoContent:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In accusantium, aliquid ab doloribus quo possimus minus dolorem. Sequi explicabo quidem rem veniam rerum itaque consectetur accusamus, impedit molestiae ut enim! Lorem ipsum dolor sit, amet consectetur adipisicing elit. In accusantium, aliquid ab doloribus quo possimus minus dolorem. Sequi explicabo quidem rem veniam rerum itaque consectetur accusamus, impedit molestiae ut enim! Lorem ipsum dolor sit, amet consectetur adipisicing elit. In accusantium, aliquid ab doloribus quo possimus minus dolorem. Sequi explicabo quidem rem veniam rerum itaque consectetur accusamus, impedit molestiae ut enim! Lorem ipsum dolor sit, amet consectetur adipisicing elit. In accusantium, aliquid ab doloribus quo possimus minus dolorem. Sequi explicabo quidem rem veniam rerum itaque consectetur accusamus, impedit molestiae ut enim!",
};

let currentMode = "";
let currentStepIndex = 0;

function renderSteps(mode) {
  const stepsWrapper = document.getElementById("stepsWrapper");
  if (!stepsWrapper) return;

  const isMobile = mode === "mobile";
  stepsWrapper.innerHTML = "";

  const steps = isMobile
    ? [...appData.steps]
    : appData.desktopOrder.map((n) =>
        appData.steps.find((s) => s.number === n)
      );

  steps.forEach((step, index) => {
    const stepEl = document.createElement("div");
    stepEl.className = isMobile
      ? "step_slide step"
      : `step step__${step.number}`;
    stepEl.setAttribute("data-index", index);
    stepEl.innerHTML = `
      <div class="step__content">
        <span class="step__number">${step.number}</span>
        <p class="step__text">${step.text}</p>
      </div>
    `;
    stepsWrapper.appendChild(stepEl);
  });

  if (isMobile) {
    initMobileSlider();
  } else {
    renderPathLines();
  }
}

function initMobileSlider() {
  const steps = [...document.querySelectorAll(".step")];
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  if (!steps.length || !prevBtn || !nextBtn) return;

  currentStepIndex = 0;

  const showSlide = (index) => {
    steps.forEach((step, i) => {
      step.classList.remove("fade-in");
      step.style.display = i === index ? "block" : "none";
      step.classList.toggle("active", i === index);
    });

    steps[index].classList.add("fade-in");
  };

  showSlide(currentStepIndex);

  prevBtn.onclick = () => {
    currentStepIndex = (currentStepIndex - 1 + steps.length) % steps.length;
    showSlide(currentStepIndex);
  };
  nextBtn.onclick = () => {
    currentStepIndex = (currentStepIndex + 1) % steps.length;
    showSlide(currentStepIndex);
  };
}

function renderPathLines() {
  const pathContainer = document.getElementById("pathContainer");
  if (!pathContainer) return;

  if (window.innerWidth > 768) {
    pathContainer.innerHTML = `
      <div class="path__line">
        ${appData.pathLines
          .map(
            (line) =>
              `<img src="${line.src}" alt="Path line" class="${line.class}">`
          )
          .join("")}
      </div>
    `;
  } else {
    pathContainer.innerHTML = "";
  }
}

function checkModeAndRender() {
  const isMobile = window.innerWidth <= 768;
  const newMode = isMobile ? "mobile" : "desktop";

  if (newMode !== currentMode) {
    currentMode = newMode;
    renderSteps(currentMode);
  }
}

function renderHeader() {
  const header = document.getElementById("header");

  header.innerHTML = `
    <div class="left__header">
      <div class="logo" id="logo">${appData.header.logo}</div>
      <nav class="nav">
        <ul class="nav__list">
          ${appData.header.navItems
            .map((item) => `<li><a href="#">${item}</a></li>`)
            .join("")}
        </ul>
      </nav>
    </div>
    <div class="rigth__header desktop">
      <a href="#">${appData.header.rightLink}</a>
      <img src="./images/search_image.svg" alt="Search">
    </div>
    <button class="burger" id="burgerBtn">
      <span class="burger-line top"></span>
      <span class="burger-line middle"></span>
      <span class="burger-line bottom"></span>
    </button>
    <div class="mobile-menu-overlay" id="mobileOverlay"></div>
    <div class="mobile-menu" id="mobileMenu">
      <ul class="nav__list">
        ${appData.header.navItems
          .map((item) => `<li><a href="#">${item}</a></li>`)
          .join("")}
      </ul>
      <div class="rigth__header mobile">
        <a href="#">${appData.header.rightLink}</a>
        <img src="./images/search_image.svg" alt="Search">
      </div>
    </div>
  `;

  const burgerBtn = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileOverlay = document.getElementById("mobileOverlay");
  const logo = document.getElementById("logo");

  burgerBtn.addEventListener("click", () => {
    burgerBtn.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    mobileOverlay.classList.toggle("active");
    logo.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  mobileOverlay.addEventListener("click", () => {
    burgerBtn.classList.remove("active");
    mobileMenu.classList.remove("active");
    mobileOverlay.classList.remove("active");
    logo.classList.toggle("active");
    document.body.style.overflow = "";
  });
}

function renderInfoContent() {
  const infoContent = document.querySelector(".info__content");
  if (infoContent) {
    infoContent.innerHTML = `<p>${appData.infoContent}</p>`;
  }
}

function initApp() {
  renderHeader();
  renderInfoContent();
  checkModeAndRender();

  window.addEventListener("resize", () => {
    clearTimeout(window.__resizeTimeout);
    window.__resizeTimeout = setTimeout(checkModeAndRender, 200);
  });

  const infoBtn = document.getElementById("infoBtn");
  const infoOverlay = document.getElementById("infoOverlay");
  const closeInfo = document.getElementById("closeInfo");

  if (infoBtn && infoOverlay && closeInfo) {
    infoBtn.addEventListener("click", () => {
      infoOverlay.classList.add("show");
      document.body.style.overflow = "hidden";
    });

    closeInfo.addEventListener("click", () => {
      infoOverlay.classList.remove("show");
      document.body.style.overflow = "";
    });

    infoOverlay.addEventListener("click", (e) => {
      if (e.target === infoOverlay) {
        infoOverlay.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", initApp);
