const sections = document.querySelectorAll(".fullpage");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle("active", entry.isIntersecting);
  });
}, {
  threshold: 1,
});

sections.forEach(section => {
  observer.observe(section);
});