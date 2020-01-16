
//Class for any type of level/scene the character goes through
class Level {
    constructor(startX, startY, startLives, text) {
        this.startX = startX;
        this.startY = startY;
        this.startLives = startLives;
        this.text = text;
    }
}

//Class for puzzle levels
class PuzzleLevel extends Level {
    constructor(gameObjectsFunction, startX, startY, startLives, text, facingRight=true) {
        super(startX, startY, startLives, text);
        this.gameObjectsFunction = gameObjectsFunction;
        this.type = "puzzle";
        this.facingRight = facingRight;
    }
}

//Class for dialogue scenes
class DialogueLevel extends Level {
    constructor(startX, startY, secondX, secondY, text, isBartholemew=true, textHeight=400) {
        super(startX, startY, 3, text);
        this.secondX = secondX;
        this.secondY = secondY;
        this.type = "dialogue";
        this.textHeight = textHeight;
        this.isBartholemew = isBartholemew;
    }
}

//Class for only text screens
class textLevel extends Level {
    constructor(text) {
        super(-100, -100, 3, text);
        this.type = "text";
    }
}

//array containg all levels
var levels = [];

//Shows Black Screen with introduction text
levels.push(new textLevel([["The 6 Eyes of Anansi...", 100, 22],
                           ["He is the only one who can collect them…", 200, 22],
                            ["*Albert wakes up with a start", 300, 22],
                            ["What a weird dream. What orbs was that old dude talking about? ", 400, 22],
                            ["Press spacebar to continue", 650, 20]]));

//Albert and Bart first meet
levels.push(new DialogueLevel(150, 550, 300, 550, [["Old dude: So I'm an old dude, huh?", 1],
    ["Albert: Hey! What are you doing in my bathroom", 0],
    ["Old Dude: -It doesn’t matter. But why is your sink and toilet so large? Nevermind that.", 1],
    ["Old dude: Listen up! The world is at stake, and you’re the only one who can save it.", 1],
    ["Albert: Oh I’ve heard this one before. Dumbledore, is that you?", 0],
    ["Dumbledore: This isn’t a joke kid.. Your father", 1],
    ["Dumbledore: …", 1],
    ["Dumbledore: He’s been captured by the evil mastermind", 1],
    ["Dumbledore: Reginald “Evil” Baxley", 1],
    ["Albert: :(", 0],
    ["Dumbledore: His nickname is evil Albert... EVIL", 1],
    ["Albert: I see, alright Dumbl-", 0],
    ["Dumbledore: -My name is Bartholomew the Blue >:(", 1],
    ["Albert: That's... Even Better", 0],
    ["Albert: Alright Bart, it's clear you’re lost, and to be frank, I feel bad for you.", 0],
    ["Albert: Let’s leave the bathroom and take you to Mr. Policeman right down the street.", 0]
]));

//Puzzle Level One Info (tutorial)--------------------------------------------------------------------------------------
var walls2 = [].concat.apply([], [wall({x: 150, y: 0, w: 50, h: 150}, false), wall({x: 150, y: 150, w: 50, h: 150}, true),
    wall({x: 150, y: 300, w: 50, h: 300}, false), wall({x: 550, y: 300, w: 200, h: 50}, false), wall({x: 750, y: 300, w: 50, h: 50}, true),
    wall({x: 550, y: 350, w: 50, h: 250}, false)]);

var createPict2 = function () {
    return {
        walls: walls2.slice(),
        heart: new Picture({x: 0, y: 610, w: 30, h: 30}, "Resources/heart.png", true),
        chest: new Picture({x: 610, y: 540, w: 80, h: 60}, "Resources/chest.png", true),
        bombs: [],
        springs: [new Spring({x: 50, y: 550, w: 50, h: 50}), new Spring({x: 350, y: 550, w: 50, h: 50})],
        sliders: [new Slider(220, 320, 520, 420, 2, 0)],
        launchers: [],
        saws: [new Saw({x: 200, y: 525, w: 75, h: 75}, 4), new Saw({x: 475, y: 525, w: 75, h: 75}, -4)],
        levers: []};
};

levels.push(new PuzzleLevel(createPict2, 5, 499, 3, [["Bart the Blue: This is no time for the police. You need", 260, 100, 22],
    [" to get to the chest. Press arrow keys to throw bombs.", 260, 150, 22],["Use wasd to move. Press r to restart a level.", 300, 200, 22]]));
//----------------------------------------------------------------------------------------------------------------------

//Albert sets on quest to get first 3 eyes of Anansi
levels.push(new DialogueLevel(150, 550, 300, 550, [["Albert: Curse you Bartholomew! What was that?", 0],
    ["Bart the Blue: By goodness, you’re a natural. Just like your father.", 1],
    ["Albert: WHAT WAS THAT? AND WHERE DID YOU TAKE ME?", 0],
    ["Bart the Blue: Alright Al, time to get my eyes.", 1],
    ["Albert: Of Anansi?", 0],
    ["Bart the Blue: I’m glad you were paying attention when I was talking in your dream.", 1],
    ["Bart the Blue: Return when you have gotten the first 3 eyes: red, blue, and yellow.", 1],
    ["Albert: I suppose I don’t have a choice.", 0],
    ["Bart the Blue: That would be correct.", 1],
    ["Bart the Blue: Now, run along...", 1]
]));

//Puzzle Level Two Info ----------------------------------------------------------------------------------------------------
var walls3 = [].concat.apply([], [wall({x: 400, y: 0, w: 50, h: 450}, false), wall({x: 300, y: 100, w: 100, h: 50}, false),
    wall({x: 0, y: 400, w: 400, h: 50}, false), wall({x:0, y:50, w:50, h:50}, false)]);

function leverFunc3r(lever) {
    picts.sliders.push(new Slider(610, 550, 610, 250, 0, -3))
};

function leverFunc3l(lever) {
    lever.funcs[1] = function () {}
};

function leverFunc3R(lever) {
    picts.chest = new Picture({x: 450, y: 540, w: 60, h: 60}, "Resources/redEye.png", true)
};

function leverFunc3L(lever) {
    lever.funcs[1] = function () {}
};

var createPict3 = function () {
    return {
        walls: walls3.slice(),
        heart: new Picture({x: 0, y: 610, w: 30, h: 30}, "Resources/heart.png", true),
        chest: new Picture({x: -100, y: 0, w: 60, h: 60}, "Resources/redEye.png", true),
        bombs: [],
        springs: [],
        sliders: [],
        launchers: [new Launcher({x: 5, y: 0, w: 40, h: 50}, 2, 3, 50)],
        saws: [],
        levers: [new Lever({x: 10, y: 331, w: 80, h: 69}, leverFunc3l, leverFunc3r), new Lever({x: 310, y: 31, w: 80, h: 69}, leverFunc3L, leverFunc3R)]};
};

levels.push(new PuzzleLevel(createPict3, 500, 499, 3, [["Create an explosion near the", 475, 100, 22],
    ["levers to activate them", 510, 150, 22]], false));
//----------------------------------------------------------------------------------------------------------------------
//Puzzle Level Three Info ----------------------------------------------------------------------------------------------
var walls4 = [].concat.apply([], [wall({x: 550, y: 0, w: 50, h: 400}, false), wall({x: 550, y: 400, w: 250, h: 50}, false),
    wall({x: 150, y: 450, w: 50, h: 150}, false), wall({x: 300, y: 450, w: 50, h: 150}, false), wall({x: 750, y: 50, w: 50, h: 50}, false),
    wall({x: 650, y: 150, w: 150, h: 50}, false), wall({x: 600, y: 300, w: 50, h: 50}, false), wall({x: 700, y: 250, w: 100, h: 50}, false)]);

function leverFunc4r(lever) {
    picts.launchers.push(new Launcher({x: 755, y: 0, w: 40, h: 50}, .4, 3, -50))
};

function leverFunc4l(lever) {
    lever.funcs[1] = function () {}
};

function leverFunc4R(lever) {
    picts.chest = new Picture({x: 450, y: 540, w: 60, h: 60}, "Resources/blueEye.png", true)
};

function leverFunc4L(lever) {
    lever.funcs[1] = function () {}
};

var createPict4 = function () {
    return {walls: walls4.slice(),
    heart: new Picture({x:0, y:610, w:30, h:30}, "Resources/heart.png", true),
    chest: new Picture({x: -100, y: 0, w: 60, h: 60}, "Resources/blueEye.png", true),
    bombs: [],
    springs: [new Spring({x: 50, y: 550, w: 50, h: 50}), new Spring({x: 350, y: 550, w: 50, h: 50})],
    sliders: [],
    launchers: [],
    saws: [new Saw({x: 200, y: 350, w: 100, h: 100}, 4)],
    levers: [new Lever({x: 210, y: 531, w: 80, h: 69}, leverFunc4l, leverFunc4r), new Lever({x: 710, y: 331, w: 80, h: 69}, leverFunc4L, leverFunc4R)]};
};

levels.push(new PuzzleLevel(createPict4, 5, 499, 1, [["Bombs can go through saws without exploding", 35, 100, 22]]));
//----------------------------------------------------------------------------------------------------------------------
//Puzzle Level Four Info -----------------------------------------------------------------------------------------------
function createWalls5() {
    return [].concat.apply([], [wall({x: 150, y: 550, w: 50, h: 50}, false), wall({x: 145, y: 200, w: 50, h: 250}, false),
        wall({x: 250, y: 200, w: 100, h: 50}, false), wall({x: 405, y: 200, w: 100, h: 50}, false), wall({x: 560, y: 200, w: 100, h: 50}, false),
        wall({x: 715, y: 200, w: 100, h: 50}, false), wall({x: 750, y: 100, w: 50, h: 50}, false), wall({x: 300, y: 250, w: 50, h: 200}, false), wall({x: 405, y: 250, w: 50, h: 200}, false)]);
}

function leverFunc5r(lever) {
    picts.springs.push(new Spring({x:0, y: 200, w: 50, h: 50}));
    picts.springs.push(new Spring({x:50, y: 200, w: 50, h: 50}));
    picts.springs.push(new Spring({x:100, y: 200, w: 50, h: 50}));
};

function leverFunc5l(lever) {
    picts.springs = [picts.springs[0]]
};

function leverFunc5R(lever) {
    picts.walls[0].doesExplode = true;
    picts.walls[0].pict.src = "Resources/brick.png";
};

function leverFunc5L(lever) {
    picts.walls[0].doesExplode = false;
    picts.walls[0].pict.src = "Resources/stone.png";

};

var createPict5 = function () {
    return {walls: createWalls5(),
        heart: new Picture({x:0, y:610, w:30, h:30}, "Resources/heart.png", true),
        chest: new Picture({x: 720, y: 540, w: 60, h: 60}, "Resources/yellowEye.png", true),
        bombs: [],
        springs: [new Spring({x: 0, y: 550, w: 50, h: 50})],
        sliders: [],
        launchers: [new Launcher({x: 760, y: 50, w: 40, h: 50}, 1.5, 3, -50)],
        saws: [new Saw({x: 195, y: 200, w: 55, h: 55}, 4),new Saw({x: 350, y: 230, w: 55, h: 55}, 4),new Saw({x: 350, y: 295, w: 55, h: 55}, -4),new Saw({x: 350, y: 360, w: 55, h: 55}, 4),new Saw({x: 505, y: 200, w: 55, h: 55}, 4),new Saw({x: 660, y: 200, w: 55, h: 55}, 4)],
        levers: [new Lever({x: 400, y: 531, w: 80, h: 69}, leverFunc5l, leverFunc5r), new Lever({x: 740, y: 150, w: 60, h: 50}, leverFunc5L, leverFunc5R)]};
};

levels.push(new PuzzleLevel(createPict5, 10, 499, 1, [["Don't get hit by the bullets. You", 480, 350, 22], ["can explode them with bombs", 480, 400, 22]]));
//----------------------------------------------------------------------------------------------------------------------

//Albert returns to Bart and sets out to get the remaining eyes
levels.push(new DialogueLevel(150, 550, 300, 550, [["Albert: Ok, I got them, I still don’t get where I keep going.", 0],
    ["Albert: These weird places with chainsaws, and trampolines.", 0],
    ["Bart the Blue: These are the puzzles of Reginald.", 1],
    ["Bart the Blue: It’s how he hides the eyes.", 1],
    ["Bart the Blue: I teleport you in and out.", 1],
    ["Albert: So this Reginald guy, he doesn’t know what we’re doing here?", 0],
    ["Bart the Blue: Oh he knows. Getting all of them is probably a trap where he’ll kill  you.", 1],
    ["Albert: Uh...", 0],
    ["Bart the Blue: But don’t worry Albert. Because...", 1],
    ["Bart the Blue: I believe in you.", 1],
    ["Albert: :(", 0],
    ["Albert: I’m scared.", 0],
    ["Bart the Blue: Collect the remaining eyes Albert. By then, you’ll be ready.", 1]
]));

//Puzzle Level Five Info ------------------------------------------------------------------------------------------------
var walls6 = [].concat.apply([], [wall({x: 200, y:450 , w:50 , h: 150}, false), wall({x: 0, y:50 , w:50 , h: 50}, false),
    wall({x: 200, y:220 , w:50 , h: 50}, true), wall({x: 200, y:170 , w:50 , h: 50}, false), wall({x: 600, y:200 , w:100 , h: 50}, false),
    wall({x: 550, y:0 , w:50 , h: 150}, false)]); // wall({x: 550, y:150 , w:50 , h: 50}, true)

function leverFunc6r(lever) {
    picts.saws.splice(1, 1);
};

function leverFunc6l(lever) {
    lever.funcs[1] = function () {}
};

function leverFunc7r(lever) {
    picts.saws.splice(0, 1);
};

function leverFunc7l(lever) {
    lever.funcs[1] = function () {}
};

var createPict6 = function () {
    return {walls: walls6.slice(),
        heart: new Picture({x:0, y:610, w:30, h:30}, "Resources/heart.png", true),
        chest: new Picture({x: 720, y: 540, w: 60, h: 60}, "Resources/orangeEye.png", true),
        bombs: [],
        springs: [new Spring({x: 50, y: 550, w: 50, h: 50}), new Spring({x: 300, y: 550, w: 50, h: 50})],
        sliders: [new Slider(10, 429, 550, 430, 1.75, 0)],
        launchers: [new Launcher({x: 5, y: 0, w: 40, h: 50}, .75, 3, 50)],
        saws: [new Saw({x:207.5 , y:360 , w: 35, h: 35}, 4), new Saw({x:715 , y:450 , w: 80, h: 80}, 4)],
        levers: [new Lever({x: 610, y: 130, w: 80, h: 70}, leverFunc6l, leverFunc6r)]};
};

levels.push(new PuzzleLevel(createPict6, 10, 499, 1, []));
//----------------------------------------------------------------------------------------------------------------------
//Puzzle Level Six Info ------------------------------------------------------------------------------------------------

var walls7 = [].concat.apply([], [wall({x: 650, y:200 , w:50 , h: 400}, false), wall({x: 700, y:200 , w:100 , h: 50}, true)]);

var createPict7 = function () {
    saws = [new Saw({x:710 , y:260 , w: 80, h: 80}, 4), new Saw({x:710 , y:355 , w: 80, h: 80}, -4), new Saw({x:710 , y:450 , w: 80, h: 80}, 4)];
    for (var i=0; i<650; i += 50) {
        saws.push(new Saw({x:i , y:480 , w: 50, h: 50}, 4))
    }
    for (var i=230; i<480; i+=50) {
        saws.push(new Saw({x:280 , y:i , w: 50, h: 50}, 4))
    }
    for (var i=330; i<480; i+=50) {
        saws.push(new Saw({x:80 , y:i , w: 50, h: 50}, 4))
    }
    return {walls: walls7.slice(),
        heart: new Picture({x:0, y:610, w:30, h:30}, "Resources/heart.png", true),
        chest: new Picture({x: 710, y: 540, w: 60, h: 60}, "Resources/greenEye.png", true),
        bombs: [],
        springs: [new Spring({x: 480, y: 420, w: 50, h: 50}), new Spring({x: 280, y: 180, w: 50, h: 50}), new Spring({x: 80, y: 280, w: 50, h: 50})],
        sliders: [],
        launchers: [],
        saws: saws,
        levers: [new Lever({x: 70, y: 531, w: 80, h: 69}, leverFunc7l, leverFunc7r), new Lever({x: 270, y: 531, w: 80, h: 69}, leverFunc7l, leverFunc7r), new Lever({x: 470, y: 531, w: 80, h: 69}, leverFunc7l, leverFunc7r)]};
};

levels.push(new PuzzleLevel(createPict7, 750, 99, 1, [], false));

//----------------------------------------------------------------------------------------------------------------------
//Puzzle Level Seven Info ----------------------------------------------------------------------------------------------

var walls10 = [].concat.apply([], [wall({x: 0, y: 140, w: 100 , h: 50}, false), wall({x: 0, y: 259, w: 100 , h: 50}, false), wall({x: 610, y: 400, w: 50 , h: 200}, false)]);

function leverFunc10r(lever) {
    picts.sliders[1].extraFunction = function () {
        if (picts.sliders[1].pictInfo.y>=picts.sliders[1].boundaries[2]&&picts.sliders[1].pictInfo.x<=200) {
            picts.sliders[1].boundaries = [picts.sliders[1].pictInfo.x-.1, 750, picts.sliders[1].pictInfo.y, picts.sliders[1].pictInfo.y];
            picts.sliders[1].changeX = 2;
            picts.sliders[1].changeY = 0;
            picts.sliders[1].extraFunction = undefined;
        }
    }
};
function leverFunc10l(lever) {
    picts.sliders[1].extraFunction = function () {
        if (picts.sliders[1].pictInfo.x<=picts.sliders[1].boundaries[0]&&picts.sliders[1].pictInfo.y>=250) {
            picts.sliders[1].boundaries = [picts.sliders[1].pictInfo.x, picts.sliders[1].pictInfo.x, picts.sliders[1].pictInfo.y+.1, 150];
            picts.sliders[1].changeX = 0;
            picts.sliders[1].changeY = -2;
            picts.sliders[1].extraFunction = undefined;
        }
    }
};

function leverFunc10R(lever) {
    picts.chest.pictInfo.x = 0;
};

function leverFunc10L(lever) {
    lever.funcs[1] = function () {}
};

var createPict10 = function () {
    return {walls: walls10.slice(),
        heart: new Picture({x:0, y:610, w:30, h:30}, "Resources/heart.png", true),
        chest: new Picture({x: -100, y: 80, w: 60, h: 60}, "Resources/purpleEye.png", true),
        bombs: [],
        springs: [new Spring({x: 360, y: 470, w: 50, h: 50})],
        sliders: [new Slider(200, 550, 250, 425, 0, -2), new Slider(200, 250, 250, 150, 0, -2)],
        launchers: [],
        saws: [new Saw({x: 250, y: 300, w: 50, h: 50}, -4), new Saw({x: 610, y: 300, w: 50, h: 50}, 4), new Saw({x: 610, y: 350, w: 50, h: 50}, -4)],
        levers: [new Lever({x: 10, y: 190, w: 80, h: 69}, leverFunc10l, leverFunc10r), new Lever({x: 695, y: 531, w: 80, h: 69}, leverFunc10L, leverFunc10R)]};
};

levels.push(new PuzzleLevel(createPict10, 5, 499, 2, []));
//----------------------------------------------------------------------------------------------------------------------

//Albert gets all the eyes and tries to find Reginald
levels.push(new DialogueLevel(150, 550, 300, 550, [["Albert: Ok, you’ve got your eyes, and no Reginald.", 0],
    ["Bart the Blue: This must be a trick, go back out there and destroy him.", 1],
    ["Albert: But I don’t think he even cares about the eyes.", 0],
    ["Bart the Blue: Do it.", 1],
    ["Albert: I’ll talk to him first.", 0],
    ["Bart the Blue: No, he’ll fill your brain with fallacies.", 1],
    ["Albert: I’ll be the judge of that, and I’m taking the eyes with me.", 0],
    ["Bart the Blue: Do what you must, but don’t say I didn’t warn you.", 1]
]));

levels.push(new textLevel([["With the 6 Eyes of Anansi in his possession, Albert managed to locate Reginald", 300, 22],
    ["Press spacebar to continue", 650, 20]]));

//Puzzle Level Eight Info ------------------------------------------------------------------------------------------------------
var walls11 = [].concat.apply([], [wall({x: 750, y: 450, w: 50, h: 150}, false), wall({x: 550, y: 130, w: 50, h: 50}, false),
    wall({x: 100, y: 0, w: 50, h: 150}, true), wall({x: 0, y: 450, w: 200, h: 150}, false), wall({x: 550, y: 550, w: 50, h: 50}, false), wall({x: 500, y: 250, w: 50, h: 350}, false)]);

function leverFunc11r(lever) {
    picts.springs.push(new Spring({x: 550, y: 500, w: 50, h: 50}))
};

function leverFunc11l(lever) {
    lever.funcs[1] = function () {}
};

var createPict11 = function () {
    var saws = [new Saw({x: 630, y: 460, w: 60, h: 60}, 4),new Saw({x: 690, y: 460, w: 60, h: 60}, -4), new Saw({x: 480, y: 200, w: 50, h: 50}, -4), new Saw({x: 320, y: 100, w: 50, h: 50}, 4)];
    for (var i=200; i<=450; i += 50) {
        saws.push(new Saw({x: i , y:550 , w: 50, h: 50}, 4))
    }
    for (var i=150; i<=400; i += 50) {
        saws.push(new Saw({x: 100 , y:i , w: 50, h: 50}, 4))
    }
    return {walls: walls11.slice(),
    heart: new Picture({x:0, y:610, w:30, h:30}, "Resources/heart.png", true),
    chest: new Picture({x: 20, y: 360, w: 40, h: 90}, "Resources/reginald.png", true),
    bombs: [],
    springs: [new Spring({x: 150, y: 400, w: 50, h: 50})],
    sliders: [new Slider(650, 331, 650, 100, 0, -2),new Slider(210, 400, 500, 178, 1.2, -1.935)],
    launchers: [],
    saws: saws,
    levers: [new Lever({x: 640, y: 531, w: 80, h: 69}, leverFunc11l, leverFunc11r)]};
}

levels.push(new PuzzleLevel(createPict11, 750, 349, 1, [], false));
//----------------------------------------------------------------------------------------------------------------------

//Albert speaks with Reginald
levels.push(new DialogueLevel(550, 550, 250, 550, [["Albert: Reginald?", 0],
    ["Reginald: Yo, what up?", 1],
    ["Albert: You don’t seem “evil” to me.", 0],
    ["Reginald: I ain’t evil, but I do have enemies.", 1],
    ["Albert: Like Bartholomew the Blue.", 0],
    ["Reginald: Yeah, that guy hates me.", 1],
    ["Albert: Why?", 0],
    ["Reginald: It’s a long story, but it had to do with these orbs, worth a lot of money.", 1],
    ["Albert: Did you steal them?", 0],
    ["Reginald: NO! I won them fair and square in some guy’s bomb throwing tournament.", 1],
    ["Reginald: He cared an unhealthy amount for those orbs.", 1],
    ["Reginald: He even ended up killing the guy who gave em to me.", 1],
    ["Albert: Bart, a murderer?", 0],
    ["Albert: Yeah, his reasoning was off, and he wanted me to kill you.", 0],
    ["Reginald: There you go. Dudes got some screws loose.", 1],
    ["Reginald: So, what are you gonna do?", 1],
    ["Albert: I’m gonna confront him.", 0]
], false, 175));

levels.push(new textLevel([["Reginald and Albert discuss how to confront Bartholemew.", 300, 22],
    ["Press spacebar to continue", 650, 20]]));

levels.push(new DialogueLevel(150, 550, 300, 550, [["Albert: It’s done Bart. Reginald is no more.", 0],
    ["Bart the Blue: Good, Albert, good. Now hand me the eyes.", 1],
    ["Albert: But he did have a good point.", 0],
    ["Albert: He mentioned how you have always had a strange obsession with the eyes.", 0],
    ["Bart the Blue: I told  you not to listen to his fallacies.", 1],
    ["Albert: But I did, and I don’t know what power these orbs hold, you can't be trusted.", 0],
    ["Bart the Blue: You fool… You shouldn’t have brought them this close.", 1],
    ["Bart the Blue: Wait, these aren’t the eyes, these are balloons.", 1],
    ["Albert: Yeah, Reginald and I had the orbs destroyed.", 0],
    ["Bart the Blue:...", 1],
    ["Bart the Blue:...", 1],
    ["Bart the Blue: How stupid can  you be?", 1],
    ["Albert: Pretty stupid.", 0],
    ["Bart the Blue: Well, I no longer have a use for you.", 1],
    ["Bart the Blue: So, any last words before I blast you into oblivion?", 1],
    ["Albert: Yeah, you can’t do that.", 0],
    ["Bart the Blue: What do you mean?", 1],
    ["Albert: Reginald and I actually used the orbs to take away your power.", 0],
    ["Bart the Blue: Oh...", 1],
    ["Bart the Blue: I was actually joking this whole time.", 1],
    ["Bart the Blue: :)", 1],
    ["Albert: Get out of my bathroom Bartholemew", 0],
    ["Bart the Blue: …", 1],
    ["Albert: Now!", 0],
    ["Bart the Blue: Fine", 1]
]));

levels.push(new textLevel([["THE END", 300, 22]]));

//
// template for adding a new Puzzle level
// var wallsk = [].concat.apply([], [wall({x: , y: , w: , h: }, doesExplode)]);
//
// function leverFunckr(lever) {
//
// };
//
// function leverFunckl(lever) {
//     lever.funcs[1] = function () {}
// };
//
// var createPictk = function () {
//     return {walls: wallsK.slice(),
//     heart: new Picture({x:0, y:610, w:30, h:30}, "Resources/heart.png", true),
//     chest: new Picture({x: , y: , w: 80, h: 60}, "Resources/chest.png", true),
//     bombs: [],
//     springs: [new Spring({x: , y: , w: 50, h: 50})],
//     sliders: [new Slider(startX, startY, endX, endY, changeX, changeY)],
//     launchers: [new Launcher({x: , y: , w: 40, h: 50}, 1.5, 3, 50)],
//     saws: [new Saw({x: , y: , w: 100, h: 100}, 4)],
//     levers: [new Lever({x: , y: , w: 80, h: 69}, leverFunckl, leverFunckr)]};
// }
//
// levels.push(new PuzzleLevel(createPictk, 10, 499, 1, [["Text", x, y, size]]));