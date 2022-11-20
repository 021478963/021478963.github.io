/* 
  x
  y
  dx
  dy
  currentTime
  radius
  top
  bottom
  left
  right
  interactionDistance
*/

const myBubble = document.getElementById("bubble");
const interactionDistance = 450;

var x;
var y
var dx;
var dy;
var last;
var mouseX = 0;
var mouseY = 0;
var radius = 0.1 * window.innerHeight;
var topBorder = window.innerHeight - radius;
var bottomBorder = radius;
var leftBorder = radius;
var rightBorder = window.innerWidth - radius;
var state = true;
var bubbleEnabled = true;
var autoMove = null;

function initialize() {
  x = Math.random() * 0.5 * topBorder;
  y = Math.random() * 0.5 * rightBorder;
  dx = Math.random() - 1;
  dy = Math.random() - 1;
  myBubble.classList.remove("popped");
  myBubble.classList.add("visible");
  requestAnimationFrame(bubble);
  last = Date.now();
  autoMove = true;
}

function bubble() {
  // get time elapsed by subtracting last time from currentTime time
  currentTime = Date.now();
  dt = currentTime - last;
  last = currentTime;

  // calculate new position with dt and dy
  x = x + dx * dt;
  y = y + dy * dt;

  if (y > topBorder) {
    y = topBorder;
    dy = -dy;
  } else if (y < bottomBorder) {
    y = bottomBorder;
    dy = -dy;
  }
  
  if (x > rightBorder) {
    x = rightBorder;
    dx = -dx;
  } else if (x < leftBorder) {
    x = leftBorder;
    dx = -dx;
  }

  // update dx and dy due to friction
  if (!autoMove) {
    dx = 0.99 * dx;
    dy = 0.99 * dy;

    // set new dx and dy with mouse position
    const distanceX = x - mouseX;
    const distanceY = y - mouseY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (state) {
      if (distance < interactionDistance) {
        if (mouseX > x) {
          dx = dx - (1 / distance);
        } else {
          dx = dx + (1 / distance);
        }
        if (mouseY > y) {
          dy = dy - (1 / distance);
        } else {
          dy = dy + (1 / distance);
        }
      }
    } else {
      if (mouseX < x) {
        dx = dx - (1 / distance);
      } else {
        dx = dx + (1 / distance);
      }
      if (mouseY < y) {
        dy = dy - (1 / distance);
      } else {
        dy = dy + (1 / distance);
      }
    }
  }
  // update element;
  myBubble.style.top = `${y}px`;
  myBubble.style.left = `${x}px`;

  if (bubbleEnabled) {
    requestAnimationFrame(bubble);
  }
}

function pop() {
  myBubble.classList.add("popped");
  myBubble.classList.remove("visible");
}

window.addEventListener("pointermove", event => {
  mouseX = event.pageX;
  mouseY = event.pageY;
  refreshDots();
  if (autoMove) {
    clearTimeout(autoMove);
    autoMove = null;
  }
});

window.addEventListener("resize", event => {
  topBorder = window.innerHeight - radius;
  bottomBorder = radius;
  leftBorder = radius;
  rightBorder = window.innerWidth - radius;
  radius = 0.1 * Math.min(window.innerHeight, window.innerWidth);
});

document.querySelector("body").addEventListener("pointerleave", event => {
  if (autoMove) {
    clearTimeout(autoMove);
  }
  autoMove = setTimeout(() => {
  }, 5000);
});

console.log("hey, I see you there");