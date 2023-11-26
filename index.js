function startGame() {
  myGameArea.start();
  myUpBtn = new component(30, 30, "black", 50, 180);
  myDownBtn = new component(30, 30, "black", 50, 240);
  myLeftBtn = new component(30, 30, "black", 20, 210);
  myRightBtn = new component(30, 30, "black", 80, 210);

  myGameBlue = new component(30, 30, "blue", 10, 120);
}
function mouseHandler(e) {
  myGameArea.x = e.pageX;
  myGameArea.y = e.pageY;
}

function keyDownHandler(e) {
  myGameArea.keys = myGameArea.keys || {};
  myGameArea.keys[e.key] = true;
}

function keyUpHandler(e) {
  myGameArea.keys[e.key] = false;
  myGameBlue.speedX = 0;
  myGameBlue.speedY = 0;
}

function touchHandler(e) {
  myGameArea.x = e.touches[0].screenX;
  myGameArea.y = e.touches[0].screenY;
}

function mouseUpAndMouseStartHandler(e) {
  myGameArea.x = e.pageX;
  myGameArea.y = e.pageY;
}

function mouseDownAndMouseEndHandler(e) {
  myGameArea.x = false;
  myGameArea.y = false;
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
    window.removeEventListener("keydown", keyDownHandler);
    window.removeEventListener("keyup", keyUpHandler);
    window.removeEventListener("mousemove", mouseHandler);
    window.removeEventListener("touchmove", touchHandler);
    window.removeEventListener("mousedown", mouseDownAndMouseEndHandler);
    window.removeEventListener("mouseup", mouseUpAndMouseStartHandler);
    window.removeEventListener("touchstart", mouseUpAndMouseStartHandler);
    window.removeEventListener("touchend", mouseDownAndMouseEndHandler);

    if (type === "touch") {
      window.addEventListener("touchmove", touchHandler);
    } else if (type == "buttons") {
      window.addEventListener("mousedown", function (e) {
        myGameArea.x = e.pageX;
        myGameArea.y = e.pageY;
      });
      window.addEventListener("mouseup", function (e) {
        myGameArea.x = false;
        myGameArea.y = false;
      });
      window.addEventListener("touchstart", function (e) {
        myGameArea.x = e.pageX;
        myGameArea.y = e.pageY;
      });
      window.addEventListener("touchend", function (e) {
        myGameArea.x = false;
        myGameArea.y = false;
      });
    } else if (type === "keyboard") {
      window.addEventListener("keydown", keyDownHandler);
      window.addEventListener("keyup", keyUpHandler);
    } else if (type === "mouse") {
      window.addEventListener("mousemove", mouseHandler);
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
  if (myGameArea.control == "keyboard") {
    // Keyboard
    if (myGameArea.keys && myGameArea.keys["ArrowUp"]) {
      myGameBlue.speedY = -1;
    }
    if (myGameArea.keys && myGameArea.keys["ArrowDown"]) {
      myGameBlue.speedY = 1;
    }
    if (myGameArea.keys && myGameArea.keys["ArrowLeft"]) {
      myGameBlue.speedX = -1;
    }
    if (myGameArea.keys && myGameArea.keys["ArrowRight"]) {
      myGameBlue.speedX = 1;
    }
  } else if (myGameArea.control == "mouse") {
    if (myGameArea.x && myGameArea.y) {
      myGameBlue.x = myGameArea.x;
      myGameBlue.y = myGameArea.y;
    }
  } else if (myGameArea.control == "buttons") {
    if (myGameArea.x && myGameArea.y) {
      if (myUpBtn.clicked()) {
        myGameBlue.y -= 1;
      }
      if (myDownBtn.clicked()) {
        myGameBlue.y += 1;
      }
      if (myLeftBtn.clicked()) {
        myGameBlue.x += -1;
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
