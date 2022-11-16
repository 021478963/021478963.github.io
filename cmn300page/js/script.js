function show(element) {
  let current = element.children[0];
  if (element.classList.contains("active")) {
    current.src = "img/plus.webp";
    element.classList.remove("active");
  } else {
    element.classList.add("active");
    current.src = "img/minus.webp";
  }
}