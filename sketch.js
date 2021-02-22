//Followed along with the Target Function Library example

let scribble;
var distance;
var margin;


function setup() {
    createCanvas(windowWidth, windowHeight);
    var d = select('.div-block')
    d = d.position(0, 0);
    rectMode(CENTER);
    noFill();
    guiSetup();
    scribble = new Scribble();
}


function draw() {
    background(gui.bColor);

    for (let i = windowWidth * gui.margin; i <= windowWidth * (1 - gui.margin); i += windowWidth * gui.xspacing) {
        for (let y = windowHeight * gui.ymargin; y <= windowHeight * (1 - gui.ymargin); y += windowHeight * gui.yspacing) {
            if (gui.randomScale) {
                distance = random(gui.Scale);
            } else {
                distance = gui.Scale;
            }
            target(i, y, distance, gui.Circles);
        }
    }

    noLoop();
}


function target(xPos, yPos, steps, num) {
    strokeWeight(gui.strokeWeight);
    stroke(gui.color);
    for (var i = 0; i <= num; i++) {
        scribble.scribbleEllipse(xPos, yPos, steps * i, steps * i);
    }
}


function update() {
    redraw();
}


function guiSetup() {
    gui = new Gui();
    //set up individual panel
    let gui_setup = new dat.GUI();
    gui_setup.add(gui, 'Circles', 0, 5).step(1).onChange(update);
    gui_setup.add(gui, 'Scale', 10, 50).step(1).onChange(update);
    gui_setup.add(gui, 'strokeWeight', 1, 10).step(1).onChange(update);
    gui_setup.add(gui, 'margin', 0, 1).step(.125).onChange(update);
    gui_setup.add(gui, 'ymargin', 0, 1).step(.125).onChange(update);
    gui_setup.add(gui, 'xspacing', .125, .5).step(.125).onChange(update);
    gui_setup.add(gui, 'yspacing', .125, .5).step(.125).onChange(update);
    gui_setup.add(gui, 'randomScale');


    gui_setup.addColor(gui, 'color').onChange(update);
    gui_setup.addColor(gui, 'bColor').onChange(update);
}


function Gui() {
    this.Circles = 5;
    this.Scale = 50;
    this.strokeWeight = 5;
    this.margin = .5;
    this.ymargin = .5;
    this.xspacing = .25;
    this.yspacing = .25;
    this.randomScale = false;
    this.color = [0, 0, 0];
    this.description = true;
    this.bColor = '#ffd338';
    this.dbWidth = 5;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
