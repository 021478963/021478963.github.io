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


function initialize() {
  x = window.innerWidth >> 1;
  y = window.innerHeight >> 1;
  dx = Math.random() * 2 - 1;
  dy = Math.random() * 2 - 1;
  myBubble.classList.remove("popped");
  myBubble.classList.add("visible");
  requestAnimationFrame(bubble);
}

function bubble() {
  // get time elapsed by subtracting last time from currentTime time
  if (!last) {
    last = new Date();
    last.getTime();
  }
  currentTime = new Date();
  currentTime = currentTime.getTime();
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
  dx = 0.99 * dx;
  dy = 0.99 * dy;

  // update element;
  myBubble.style.top = `${y}px`;
  myBubble.style.left= `${x}px`;

  // set new dx and dy with mouse position
  let distanceX = x - mouseX;
  let distanceY = y - mouseY;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // if (distance < 0.5 * radius) {
  //   pop();
  //   return;
  // } else 
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
  requestAnimationFrame(bubble);
}

function pop() {
  myBubble.classList.add("popped");
  myBubble.classList.remove("visible");
  setTimeout(() => {
    initialize();
  }, 5000);
}

setTimeout(() => {
  initialize();
}, 8000);

window.addEventListener("pointermove", event => {
  mouseX = event.pageX;
  mouseY = event.pageY;
  refreshDots();
});

window.addEventListener("resize", event => {
  topBorder = window.innerHeight - radius;
  bottomBorder = radius;
  leftBorder = radius;
  rightBorder = window.innerWidth - radius;
  radius = 0.1 * window.innerHeight;
});