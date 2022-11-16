var state = 'light';

function show(element) {
  element.classList.toggle("active");
}

function invert() {
  if (state === 'light') {
    document.documentElement.style.setProperty('--your-variable', '#YOURCOLOR');
    state = 'dark';
  } else {
    document.documentElement.style.setProperty('--your-variable', '#YOURCOLOR');
    state = 'light';
  }
}