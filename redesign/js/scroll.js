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
  // threshold: 1,
  rootMargin: "-400px 0px -400px 0px",
});

projects.forEach(project => {
  // console.log(project);
  projectObserver.observe(project);
});