var data = {
    canvas: null,
    ctx: null,
    clickedDot: null,
    dots: []
};

const dotColors = ['pink', 'yellow', 'blue', 'purple'];

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor() {
    return dotColors[randomIntFromRange(0, dotColors.length - 1)];
}

function generateDots(numDots) {
    for (var i = 0; i < numDots; i++) {
        var x = randomIntFromRange(50, window.innerWidth - 50);
        var y = randomIntFromRange(50, window.innerHeight - 50);
        var color = randomColor();
        data.dots.push({ x, y, color });
    }
}

function distanceBetween(c1, c2) {
    var x = c1.x - c2.x,
        y = c1.y - c2.y;
    return Math.sqrt((x * x) + (y * y));
}

function dotClicked(dot, color) {
    if (data.clickedDot === null) {
        data.clickedDot = dot;
        dot.color = color;
    } else {
        if (data.clickedDot.color === color) {
            drawLine(dot);
            data.clickedDot = null;
        } else {
            data.clickedDot = null;
        }
    }
}

function prepCanvas() {
    data.canvas = document.getElementById('dots');
    data.ctx = data.canvas.getContext('2d');

    data.canvas.width = window.innerWidth;
    data.canvas.height = window.innerHeight;

    generateDots(10);
    drawDots();

    data.canvas.addEventListener('mousedown', function (e) {
        checkForDot(e);
    });
}

function drawDots() {
    var i = 0;
    for (; i < data.dots.length; i++) {
        var d = data.dots[i];
        data.ctx.beginPath();
        data.ctx.arc(d.x, d.y, 10, 0, 2 * Math.PI);
        data.ctx.fillStyle = d.color;
        data.ctx.fill();
        data.ctx.closePath();
    }
}

function drawLine(toDot) {
    data.ctx.beginPath();
    data.ctx.moveTo(data.clickedDot.x, data.clickedDot.y);
    data.ctx.lineTo(toDot.x, toDot.y);
    data.ctx.lineWidth = 5;
    data.ctx.strokeStyle = data.clickedDot.color;
    data.ctx.stroke();
    data.ctx.closePath();
}

function checkForDot(e) {
    var i = 0, col = null;
    for (; i < data.dots.length; i++) {
        var d = data.dots[i];
        var c1 = { x: d.x, y: d.y, r: 10 };
        var c2 = { x: e.pageX, y: e.pageY, r: 10 };
        if (distanceBetween(c1, c2) < 20) {
            if (col === null) {
                col = d.color;
                dotClicked(d, col);
            } else if (col === d.color) {
                dotClicked(d, col);
            } else {
                return;
            }
        }
    }
}

function dotClicked(dot, color) {
    if (!data.clickedDot) {
        data.clickedDot = dot;
    } else {
        if (data.clickedDot.color === color) {
            drawLine(dot);
            data.clickedDot = null;
        } else {
            data.clickedDot = dot;
        }
    }
}

function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function animate() {
    requestAnimationFrame(animate);
    drawDots();
}

generateDots(10);
prepCanvas();
animate();