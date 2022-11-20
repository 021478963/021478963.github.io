const sections = document.querySelectorAll(".fullpage");
const projects = document.querySelectorAll(".project__entry");
const dots = document.querySelectorAll(".page-dots__li");
const dotsList = document.querySelector(".page-dots");
const options = document.querySelector(".options__button");
const floatingLinks = document.querySelector(".floating-links");
const sectionDots = {
  "landing": 0,
  "about": 1,
  "whatIKnow": 2,
  "projects": 3,
  "contact": 4,
}

var current = null;
var currentTimeout = null;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active", entry.isIntersecting);
      
      if (current) {
        current.classList.remove("active");
      }
      const activeId = sectionDots[entry.target.id];
      current = dots[activeId];
      current.classList.add("active");

      if (activeId % 2 == 1) {
        dotsList.classList.add("invert");
        floatingLinks.classList.add("invert");
        options.classList.add("invert");
      } else {
        dotsList.classList.remove("invert");
        floatingLinks.classList.remove("invert");
        options.classList.remove("invert");
      }

      refreshDots();
    }
  });
}, {
  threshold: 0.3,
});

sections.forEach(section => {
  observer.observe(section);
});

const projectObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle("visible", entry.isIntersecting);
  });
}, {
  rootMargin: "-500px 0px -100px 0px",
});

projects.forEach(project => {
  projectObserver.observe(project);
});

function redirect(location) {
  window.location.href = `#${location}`;
}

function hideDots() {
  dotsList.classList.remove("visible");
}

function refreshDots() {
  if (currentTimeout) {
    clearTimeout(currentTimeout);
  }
  dotsList.classList.add("visible");
  currentTimeout = setTimeout(() => {
    hideDots();
  }, 5000);
}