const sections = document.querySelectorAll(".fullpage");
const projects = document.querySelectorAll(".project__entry");
const dots = document.querySelectorAll(".page-dots__li");
const sectionDots = {
  "landing": 0,
  "about": 1,
  "whatIKnow": 2,
  "projects": 3,
  "contact": 4,
}

var current = null;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle("active", entry.isIntersecting);
    if (entry.isIntersecting) {
      if (current) {
        current.classList.remove("active");
      }
      const activeId = sectionDots[entry.target.id];
      current = dots[activeId];
      current.classList.add("active");

      if (activeId % 2 == 1) {
        current.parentElement.classList.add("invert");
      } else {
        current.parentElement.classList.remove("invert");
      }
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
    // console.log(entry);
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