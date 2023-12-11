'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Smooth scrolling

btnScrollTo.addEventListener('click', function (event) {
  const s1coords = section1.getBoundingClientRect();

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation

// Event Delegation (Bubbling)
document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    event.preventDefault();

    // Matching strategy
    if (event.target.classList.contains('nav__link')) {
      const id = event.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });

document
  .querySelector('.nav__link--btn')
  .addEventListener('click', function (event) {
    event.preventDefault();
    let id;

    if (event.target.tagName === 'I') {
      id = event.target.parentElement.getAttribute('href');
    } else {
      id = event.target.getAttribute('href');
    }

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });

///////////////////////////////////////
// Menu fade animation

const handleHover = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

document
  .querySelector('.nav')
  .addEventListener('mouseover', handleHover.bind(0.5));

document
  .querySelector('.nav')
  .addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Tabbed Componenet

const tabs = document.querySelectorAll('.team__tab');
const tabsContainer = document.querySelector('.team__tab-container');
const tabsContent = document.querySelectorAll('.team__content');

tabsContainer.addEventListener('click', function (event) {
  const clicked = event.target.closest('.team__tab');

  // Guard clause
  if (!clicked) return;

  tabs.forEach((tab) => tab.classList.remove('team__tab--active'));
  clicked.classList.add('team__tab--active');

  //Activate content area
  tabsContent.forEach((content) =>
    content.classList.remove('team__content--active')
  );

  document
    .querySelector(`.team__content--${clicked.dataset.tab}`)
    .classList.add('team__content--active');
});

///////////////////////////////////////
// Sticky navigation

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
  }
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((sec) => {
  sectionObserver.observe(sec);
  sec.classList.add('section--hidden');
});

///////////////////////////////////////
// Top progress bar

const body = document.querySelector('body');
const progressBartop = document.querySelector('.top_progress_bar');

const getProgress = () => {
  let scrollDist = -body.getBoundingClientRect().top;
  let progresswidth =
    (scrollDist /
      (body.getBoundingClientRect().height -
        document.documentElement.clientHeight)) *
    100;
  let value = Math.floor(progresswidth);
  progressBartop.style.width = value + '%';
};

window.addEventListener('scroll', getProgress);

// Add Confetti
const createConfetti = () => {
  var duration = 15 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
};
createConfetti();

//////////////////////////////////////////////
// Accordian
const accordians = document.querySelectorAll('.accordion button');

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');

  for (let i = 0; i < accordians.length; i++) {
    accordians[i].setAttribute('aria-expanded', 'false');
  }

  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

accordians.forEach((item) => item.addEventListener('click', toggleAccordion));
