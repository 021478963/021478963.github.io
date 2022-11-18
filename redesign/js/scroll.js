const sections = document.querySelectorAll(".fullpage");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle("active", entry.isIntersecting);
  });
}, {
  threshold: 0.3,
});

sections.forEach(section => {
  observer.observe(section);
});

const projects = document.querySelectorAll(".project__entry");

const projectObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle("visible", entry.isIntersecting);
    console.log(entry);
  });
}, {
  rootMargin: "-500px 0px -100px 0px",
});

projects.forEach(project => {
  projectObserver.observe(project);
});