function startGame() {
    myGameArea.start()
    myGameRed = new component(30, 30, "red", 10, 120)
    myGameYellow = new component(30, 30, "yellow", 10, 170)
    myGameBlue = new component(30, 30, "blue", 10, 70)
}

const myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d")
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
        this.interval = setInterval(updateGameArea, 20)
    },
    clear: function() {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height)
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

function updateGameArea() {
    myGameArea.clear()
    myGameRed = {
        ...myGameRed,
        x: myGameRed.x + 1,
        y: myGameRed.y - 1
    }

    myGameYellow.x += 2
    myGameBlue.x += 3
    
    myGameRed.update()
    myGameYellow.update()
    myGameBlue.update()
}
startGame()