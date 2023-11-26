function startGame() {
  myGameArea.start();
  myUpBtn = new component(30, 30, "black", 50, 180);
  myDownBtn = new component(30, 30, "black", 50, 240);
  myLeftBtn = new component(30, 30, "black", 20, 210);
  myRightBtn = new component(30, 30, "black", 80, 210);

  myGameBlue = new component(30, 30, "blue", 10, 120);
}

const controlHandlers = {
  mouse: function(e) {
    myGameArea.x = e.pageX;
    myGameArea.y = e.pageY;
  },
  keyDown: function(e) {
    myGameArea.keys = myGameArea.keys || {};
    myGameArea.keys[e.key] = true;
  },
  keyUp: function(e) {
    myGameArea.keys[e.key] = false;
    myGameBlue.speedX = 0;
    myGameBlue.speedY = 0;
  },
  touch: function(e) {
    const rect = document.querySelector('canvas').getBoundingClientRect();
    const touch = e.touches[0];
    myGameArea.x = touch.clientX - rect.left;
    myGameArea.y = touch.clientY - rect.top;
  },
  mouseDonwAndTouchStart: function(e) {
    myGameArea.x = e.pageX;
    myGameArea.y = e.pageY;
  },
  mouseUpAndMouseEnd:function(e) {
    myGameArea.x = false;
    myGameArea.y = false;
  }
}

const myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    this.interval = setInterval(updateGameArea, 20);
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.setControl();
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  setControl: function (type = "keyboard") {
    myGameArea.control = type;
    window.removeEventListener("keydown", controlHandlers.keyDown);
    window.removeEventListener("keyup", controlHandlers.keyUp);
    window.removeEventListener("mousemove", controlHandlers.mouse);
    window.removeEventListener("touchmove", controlHandlers.touch);
    window.removeEventListener("mousedown", controlHandlers.mouseDonwAndTouchStart);
    window.removeEventListener("mouseup", controlHandlers.mouseUpAndMouseEnd);
    window.removeEventListener("touchstart", controlHandlers.mouseUpAndMouseEnd);
    window.removeEventListener("touchend", controlHandlers.mouseDonwAndTouchStart);

    if (type === "touch") {
      window.addEventListener("touchmove", controlHandlers.touch);
    } else if (type == "buttons") {
      window.addEventListener("mousedown", controlHandlers.mouseDonwAndTouchStart);
      window.addEventListener("mouseup", controlHandlers.mouseUpAndMouseEnd);
      window.addEventListener("touchstart", controlHandlers.mouseDonwAndTouchStart);
      window.addEventListener("touchend", controlHandlers.mouseUpAndMouseEnd);
    } else if (type === "keyboard") {
      window.addEventListener("keydown", controlHandlers.keyDown);
      window.addEventListener("keyup", controlHandlers.keyUp);
    } else if (type === "mouse") {
      window.addEventListener("mousemove", controlHandlers.mouse);
    }
  },
};

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function () {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.clicked = function () {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var clicked = true;
    if (
      mybottom < myGameArea.y ||
      mytop > myGameArea.y ||
      myright < myGameArea.x ||
      myleft > myGameArea.x
    ) {
      clicked = false;
    }
    return clicked;
  };
  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;
  };
}

function changeControl(type) {
  myGameArea.x = undefined;
  myGameArea.y = undefined;
  myGameBlue.x = 10;
  myGameBlue.y = 120;
  myGameArea.setControl(type);
}

function setControl() {
  const { keys } = myGameArea;
  const { control } = myGameArea;

  if (control === "keyboard") {
    // Keyboard
    if (keys && (keys["ArrowUp"] || keys["w"])) {
      myGameBlue.speedY = -1;
    }
    if (keys && (keys["ArrowDown"] || keys["s"])) {
      myGameBlue.speedY = 1;
    }
    if (keys && (keys["ArrowLeft"] || keys["a"])) {
      myGameBlue.speedX = -1;
    }
    if (keys && (keys["ArrowRight"] || keys["d"])) {
      myGameBlue.speedX = 1;
    }
  } else if (control === "mouse" || control === "touch") {
    if (myGameArea.x && myGameArea.y) {
      myGameBlue.x = myGameArea.x;
      myGameBlue.y = myGameArea.y;
    }
  } else if (control === "buttons") {
    if (myGameArea.x && myGameArea.y) {
      if (myUpBtn.clicked()) {
        myGameBlue.y -= 1;
      }
      if (myDownBtn.clicked()) {
        myGameBlue.y += 1;
      }
      if (myLeftBtn.clicked()) {
        myGameBlue.x -= 1;
      }
      if (myRightBtn.clicked()) {
        myGameBlue.x += 1;
      }
    }

    myUpBtn.update();
    myDownBtn.update();
    myLeftBtn.update();
    myRightBtn.update();
  }
}

function updateGameArea() {
  myGameArea.clear();
  setControl()
  myGameBlue.newPos();
  myGameBlue.update();
}

startGame();
