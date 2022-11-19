const pageSnap = document.getElementById("page-snap");
const bubbleOption = document.getElementById("bubble-enabled");
const direction = document.getElementById("direction");
const optionsWrapper = document.querySelector(".options__wrapper");
const allOptions = [pageSnap, bubbleOption, direction];

var optionsOpen = false;

function readCookie() {
  let cookies = document.cookie.split("; ");
  cookies.forEach(element => {
    let offset = element.indexOf('=');
    let name = element.substr(0, offset);
    let value = element.substr(offset + 1);
    switch (name) {
      case "bubbleOption":
        if (value == "true") {
          bubbleOption.checked = true;
        } else {
          bubbleOption.checked = false;
        }
        break;
      case "pageSnap":
        if (value == "true") {
          pageSnap.checked = true;
        } else {
          pageSnap.checked = false;
        }
        break;
      case "direction":
        if (value == "true") {
          direction.checked = true;
        } else {
          direction.checked = false;
        }
        break;
    }
  });
  updatePageSnap(pageSnap.checked);
  updateBubbleOption(bubbleOption.checked);
  updateDirection(direction.checked);
};

function createCookie() {
  document.cookie = `pageSnap=${pageSnap.checked}`;
  document.cookie = `bubbleOption=${bubbleOption.checked}`;
  document.cookie = `direction=${direction.checked}`;
}

function updatePageSnap(checked) {
  if (checked === true) {
    document.documentElement.style.setProperty('--scroll', 'mandatory');
  } else {
    document.documentElement.style.setProperty('--scroll', 'none');
  }
}

function updateBubbleOption(checked) {
  if (checked === true) {
    setTimeout(() => {
      if (bubbleEnabled) {
        initialize();
      }
    }, 8000);
    bubbleEnabled = true;
  } else {
    bubbleEnabled = false;
    pop();
  };
}

function updateDirection(checked) {
  if (checked === true) {
    state = true;
  } else {
    state = false;
  }
}

pageSnap.addEventListener('change', event => {
  updatePageSnap(event.target.checked);
});

bubbleOption.addEventListener('change', event => {
  updateBubbleOption(event.target.checked);
});

direction.addEventListener('change', event => {
  updateDirection(event.target.checked);
});


document.addEventListener("pointerdown", event => {
  if (optionsOpen && event.target == optionsWrapper) {
    optionsWrapper.classList.remove("active");
    optionsOpen = false;
    createCookie();
  }
});

document.querySelector(".options__button").addEventListener("pointerdown", event => {
  optionsWrapper.classList.add("active");
  optionsOpen = true;
})

readCookie();