//Module containing all gameplay classes

class Picture {
    constructor(pictInfo, src, shouldDraw) {
        this.pict = new Image();
        this.pict.src = src;
        this.pictInfo = pictInfo;
        this.shouldDraw = shouldDraw;
    }

    //draws the picture
    drawPict() {
        var ctx = document.getElementById('myCanvas').getContext("2d");
        ctx.drawImage(this.pict, this.pictInfo.x, this.pictInfo.y, this.pictInfo.w, this.pictInfo.h);
    }

    //checks if the picture is colliding with another image
    checkCollision(pict2) {
        return (this.pictInfo.x + this.pictInfo.w>=pict2.pictInfo.x && this.pictInfo.x<pict2.pictInfo.x+pict2.pictInfo.w &&
                this.pictInfo.y+this.pictInfo.h>=pict2.pictInfo.y && this.pictInfo.y<pict2.pictInfo.y+pict2.pictInfo.h)
    }
}

class MovingPicture extends Picture {
    constructor(pictInfo, src, shouldDraw, changeX, changeY) {
        super(pictInfo, src, shouldDraw);

        //variables that indicate how much the coordinates the picture moves each frame
        this.changeX = changeX;
        this.changeY = changeY;
    }

    updateCoords() {
        this.pictInfo.x += this.changeX;
        this.pictInfo.y += this.changeY;
    }

    //reverses direction if the picture goes off screen
    checkBoundaries() {
        if ((this.pictInfo.x+this.pictInfo.w>=800)||(this.pictInfo.x<=0)) {
            this.changeX*=-1;
        }
        if ((this.pictInfo.y<=0)||(this.pictInfo.y+this.pictInfo.h>=600)) {
            this.changeY*=-1;
        }
    }

    //draws the picture
    drawPict() {
        this.updateCoords();
        this.checkBoundaries();
        var ctx = document.getElementById('myCanvas').getContext("2d");
        ctx.drawImage(this.pict, this.pictInfo.x, this.pictInfo.y, this.pictInfo.w, this.pictInfo.h)
    }
}

//removes element from an array (created so can be used with setTimeout)
function removeElement(array, element) {
    if (element.isBullet) { //creates a new bullet (after a delay) if the picture was a bullet
        setTimeout(createBullet, element.launcher.whenShoot*1000, element.launcher);
    }
    array.splice(array.indexOf(element), 1);
}

//takes a picture and the array it's in. Explodes nearby objects,
//turns the picture into a ball of fire, and soon removes it from the array
function explode(pict, array) {
    pict.updateCoords = function () {}; //makes the picture stay still

    //makes the picture the size of the area that is the explosion is felt in
    pict.pictInfo.w = 130;
    pict.pictInfo.h = 130;
    pict.pictInfo.x -= 35;
    pict.pictInfo.y -= 35;

    for (i = picts.walls.length-1; i >= 0; i--) { //explodes nearby red bricks
        if (picts.walls[i].doesExplode && pict.checkCollision(picts.walls[i])) {
            picts.walls.splice(i, 1);
        }
    }
    //explodes nearby bullets that aren't already exploded if the picture isn't a bullet
    if (!pict.isBullet) {
        for (var k=0; k<picts.launchers.length; k++) {
            for (var i = picts.launchers[k].bullets.length-1; i >= 0; i--) {
                if (pict.checkCollision(picts.launchers[k].bullets[i]) && picts.launchers[k].bullets[i].pict.src.indexOf("Resources/bullet.png")>=0) {
                    explode(picts.launchers[k].bullets[i], picts.launchers[k].bullets);
                }
            }
        }
    }

    for (i = 0; i<picts.levers.length; i++) {//switches nearby levers
        if (pict.checkCollision(picts.levers[i])) {
            picts.levers[i].pos = (picts.levers[i].pos+1) % 2;
            picts.levers[i].pictInfo.x += 8 - 16*picts.levers[i].pos;
            picts.levers[i].funcs[picts.levers[i].pos](picts.levers[i]);
        }
    }

    //makes the picture a ball of fire
    pict.pict.src ="Resources/fire.png";
    pict.pictInfo.w = 80;
    pict.pictInfo.h = 80;
    pict.pictInfo.x += 27;
    pict.pictInfo.y += 35;

    setTimeout(removeElement, 500, array, pict); //removes the picture
}

class Bomb extends MovingPicture {
    constructor(pictInfo, changeX, changeY) {
        super(pictInfo, "Resources/bomb.png", true, changeX, changeY);
        this.isBullet = false;
    }

    updateCoords() {
        this.pictInfo.x += this.changeX;
        this.pictInfo.y += this.changeY;
        this.changeY+=.20; //appropriates for gravity

        if (!canMove(this, this.changeX, this.changeY)) { //explodes if it can't move anymore
            explode(this, picts.bombs)
        }

        for (var k=0; k<picts.launchers.length; k++) { //explodes if it hits a bullet
            for (var i = picts.launchers[k].bullets.length-1; i >= 0; i--) {
                if (this.checkCollision(picts.launchers[k].bullets[i])) {
                    explode(this, picts.bombs);
                }
            }
        }
    }
}

class RotatingPicture extends Picture {
    constructor(pictInfo, src, shouldDraw) {
        super(pictInfo, src, shouldDraw);
        this.currentDeg = 0;
    }

    updateCoords() {//rotates the picture 15 degrees
        temp.currentDeg += 15
    }

    //draws the picture
    drawPict() {
        var ctx=document.getElementById('myCanvas').getContext("2d");
        this.updateCoords();
        ctx.save();
        ctx.translate(this.pictInfo.x+this.pictInfo.w/2, this.pictInfo.y+this.pictInfo.h/2);
        ctx.rotate(this.currentDeg*Math.PI/180);
        ctx.drawImage(this.pict, -this.pictInfo.w/2, -this.pictInfo.h/2, this.pictInfo.w, this.pictInfo.h);
        ctx.restore();
    }
}

class Bullet extends RotatingPicture {
    constructor(pictInfo, speed, launcher) {
        super(pictInfo, "Resources/bullet.png", true);
        this.speed = speed;
        this.launcher = launcher;
        this.isBullet = true;
    }

    updateCoords() {
        //finds the degree the bullet should rotate to face the player
        this.yDist = (2*man.pictInfo.y+man.pictInfo.h)/2 - this.pictInfo.y;
        this.xDist = (2*man.pictInfo.x+man.pictInfo.w)/2 - this.pictInfo.x;
        this.currentDeg = 90-(Math.atan(this.yDist * -1 / this.xDist) * 180 / Math.PI);
        if (this.xDist < 0) {
            this.currentDeg += 180;
        }

        //finds the amount of pixels the bullet should travel to go towards the player
        //the length the bullet travels is equal to the bullet's speed
        this.changeX = this.xDist * this.speed / Math.sqrt(Math.pow(this.xDist, 2) + Math.pow(this.yDist, 2));
        this.changeY = this.yDist * this.speed / Math.sqrt(Math.pow(this.xDist, 2) + Math.pow(this.yDist, 2));
        this.pictInfo.x += this.changeX;
        this.pictInfo.y += this.changeY;

        if (!canMove(this, this.changeX, this.changeY)) {//explodes if can't move further
            explode(this, this.launcher.bullets);
        }
    }
}

//creates a bullet given the launcher (created to be used with setTimeout)
function createBullet(pict) {
    pict.bullets.push(new Bullet({x: pict.pictInfo.x+pict.pixelsRight, y: pict.pictInfo.y, w: 20, h: 45}, pict.speed, pict))
};

class Launcher extends Picture {
    constructor(pictInfo, speed, whenShoot, pixelsRight) {
        super(pictInfo, "Resources/launcher.png", true);
        this.speed = speed; //how fast the bullets are
        this.whenShoot = whenShoot; //amount of time it takes for the launcher to shoot next bullet
        this.pixelsRight = pixelsRight; //is 50 if the bullet is created to the right of the launcher, -50 if to the left
        this.bullets = [];
        setTimeout(createBullet, this.whenShoot*1000, this);
    }

    //draws the picture
    drawPict() {
        var ctx = document.getElementById('myCanvas').getContext("2d");
        ctx.drawImage(this.pict, this.pictInfo.x, this.pictInfo.y, this.pictInfo.w, this.pictInfo.h);
        for (var i=0; i<this.bullets.length; i++) {
            this.bullets[i].drawPict()
        }
    }
}

//creates an array of wall object
function wall(pictInfo, doesExplode) {
    //creates a rectangular grid of 50X50 walls (all stored in below array) based on the width and height in pictInfo
    walls = [];

    //decides whether bricks are red or black
    source = {false: "Resources/stone.png", true: "Resources/brick.png"}[doesExplode];

    for (i=0; i<pictInfo.w/50; i += 1) {//creates the array of bricks
        for (k=0; k<pictInfo.h/50; k+= 1) {
            walls.push(new Picture({x:pictInfo.x+i*50, y:pictInfo.y+k*50, w:50, h:50}, source, true));
            walls[walls.length-1].doesExplode = doesExplode;
        }
    }
    return walls;
}

class Spring extends Picture {
    constructor(pictInfo) {
        super(pictInfo, "Resources/spring2.png", true);
    }

    //draws the spring and makes the player jump if he is supposed to
    drawPict() {
        //checks if the player is on top of the spring
        if (this.pictInfo.x + this.pictInfo.w>=man.pictInfo.x && this.pictInfo.x<man.pictInfo.x+man.pictInfo.w &&
            this.pictInfo.y+20>=man.pictInfo.y+man.pictInfo.h && this.pictInfo.y<man.pictInfo.y+man.pictInfo.h && man.velocity>=0) {
            man.velocity=-13; //makes the player jump high

            //extends the spring temporarily
            this.pict.src = "Resources/spring.png";
            this.pictInfo.h = 60;
            this.pictInfo.y-= 10;
            setTimeout(function(spring){spring.pict.src = "Resources/spring2.png";spring.pictInfo.h = 50;
                spring.pictInfo.y+= 10}, 500, this);
        }

        var ctx = document.getElementById('myCanvas').getContext("2d");
        ctx.drawImage(this.pict, this.pictInfo.x, this.pictInfo.y, this.pictInfo.w, this.pictInfo.h);
    }
}

class Slider extends MovingPicture {
    constructor(startX, startY, endX, endY, changeX, changeY) {
        super({x: startX, y: startY, w: 140, h: 20}, "Resources/slider2.PNG", true, changeX, changeY);
        this.boundaries = [startX, endX, startY, endY];
        this.extraFunction = undefined;
    }

    checkBoundaries() {
        if (this.extraFunction !== undefined) {
            this.extraFunction();
        }

        //reverses the direction of the slider if it goes out of its boundaries
        if ((this.pictInfo.x+this.pictInfo.w>=this.boundaries[1])||(this.pictInfo.x<=this.boundaries[0])) {
            this.changeX*=-1;
            this.pictInfo.x+=this.changeX;
        }
        if ((this.pictInfo.y>=this.boundaries[2])||(this.pictInfo.y+this.pictInfo.h<=this.boundaries[3])) {
            this.changeY*=-1;
            this.pictInfo.y+=this.changeY;
        }

        // //reverses the direction of the slider if it can't move that direction
        if (!canMove(this, this.changeX, 0)) {
            this.changeX*=-1;
        }
        if (!canMove(this, 0, this.changeY)) {
            this.changeY*=-1;
        }
        //checks if player is colliding with or on top of the slider
        if (this.pictInfo.x + this.pictInfo.w>=man.pictInfo.x && this.pictInfo.x<man.pictInfo.x+man.pictInfo.w &&
            this.pictInfo.y+this.pictInfo.h>=man.pictInfo.y && this.pictInfo.y-1<man.pictInfo.y+man.pictInfo.h) {
            //moves the player in the same direction as the slider if the player can move in this direction
            // or if the slider is going down and the man is on the slider
            if (canMove(man, this.changeX, this.changeY) || (this.changeY>0 && man.pictInfo.y+man.pictInfo.h<this.pictInfo.y)) {
                man.pictInfo.x+=this.changeX;
                man.pictInfo.y+=this.changeY;
            }
            else {//otherwise changes the direction of the slider
                this.changeX*=-1;
                this.changeY*=-1;
            }
        }
    }
}

class Saw extends RotatingPicture {
    constructor(pictInfo, changeDeg) {
        super(pictInfo, "Resources/saw.png", true);
        this.changeDeg = changeDeg;
        this.canHit = true;//turns false temporarily after the player hits the saw so they don't lose all their lives
    }

    updateCoords() {
        this.currentDeg += this.changeDeg;
    }
}

class Lever extends Picture {
    constructor(pictInfo, func0, func1) {
        super(pictInfo, "Resources/lever0.png", true);
        this.pos = 0;
        this.funcs = [func0, func1];
    }

    drawPict() {
        //draws the correct lever depending on its position
        if (this.pos === 0) {
            this.pict.src = "Resources/lever0.png"
        }
        else {
            this.pict.src = "Resources/lever1.png"
        }

        var ctx = document.getElementById('myCanvas').getContext("2d");
        ctx.drawImage(this.pict, this.pictInfo.x, this.pictInfo.y, this.pictInfo.w, this.pictInfo.h);
    }
}

//creates a button object
function createButton(text, x, y, height, width, func) {
    return {
        text: text,
        left: x,
        bottom: y,
        height: height,
        width: width,
        color: '000000',
        func: func,

        //turns button a different color and allows the given function to run upon a mouse click if the mouse is over the button
        checkHover: function () {
            if (mousePos.x > this.left && mousePos.x < this.left + this.width
                && mousePos.y < this.bottom && mousePos.y > this.bottom - this.height) {
                this.color = 'ffb900'; //gold
                document.getElementById('myCanvas').addEventListener('click', this.func);
            }
            else {
                this.color = '000000';
                document.getElementById('myCanvas').removeEventListener('click', this.func)
            }
        },

        drawPict: function () { //draws the button
            this.checkHover();
            drawText(this.text, this.left, this.bottom, this.height, this.color);
        }
    }
}