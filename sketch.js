var states = [];
var statePos = [
  [100, 500],
  [200, 500],
  [300, 500],
  [400, 500],
  [400, 400],
  [500, 500],
  [400, 600]
];

var speaker;
var activeState = 'S1';

function setup() {
  createCanvas(600, 700);
  speaker = new Speaker(100, 100);
  for (var i = 0; i < statePos.length; i++) {
    states[i] = {
      label: 'S' + String(i + 1),
      state: new State(statePos[i][0], statePos[i][1], 'S' + String(i + 1)),
      active: false
    };
  }
}

function draw() {
  mouseHover();
  background(255);
  checkStates();
  text('States', 100, 400);

  states.forEach(function (state) {
    push();
    if (activeState == state.label)
      state.active = true;
    else
      state.active = false;
    if (state.active)
      fill(0, 255, 0);
    else
      fill(255);
    state.state.render();
    pop();
  });

  speaker.render();
}


var State = function (x, y, label) {
  this.x = x;
  this.y = y;

  this.r = 50;
  if (!label)
    this.label = 'None';
  else
    this.label = label;

  this.render = function () {
    push();
    // fill(255);
    ellipse(this.x, this.y, this.r);
    fill(0);
    stroke(0);
    text(this.label, this.x - 10, this.y);
    pop();
  };
};


var Speaker = function (x, y) {
  this.x = x;
  this.y = y;
  this.w = 200;
  this.h = 50;

  this.powerX = this.x + 25;
  this.powerY = this.y + 25;
  this.playX = this.x + 60;
  this.playY = this.y + 25;
  this.nextX = this.x + 100;
  this.nextY = this.y + 25;
  this.prevX = this.x + 140;
  this.prevY = this.y + 25;

  this.chargeX = this.x + 10;
  this.chargeY = this.y + 70;

  this.connectX = this.x + 10;
  this.connectY = this.y + 90;

  this.isConnected = false;
  this.isCharged = true;
  this.isPowered = false;
  this.isPlaying = false;
  this.isNext = false;
  this.isPrev = false;


  this.render = function () {
    push();
    fill(0);
    text('Speaker', this.x - 10, this.y - 10);
    fill(255);
    stroke(0);
    rect(this.x, this.y, this.w, this.h);
    pop();

    this.play();
    this.power();
    this.next();
    this.prev();
    this.battery();
    this.connected();

    this.chargeState();
    this.connectState();
  };

  this.chargeState = function () {
    push();
    if (this.isCharged)
      fill(0, 255, 0);
    else
      fill(255, 0, 0);

    ellipse(this.chargeX, this.chargeY, 10);
    text("Charged: " + this.isCharged, this.chargeX + 10, this.chargeY + 5);
    pop();
  };

  this.connectState = function () {
    push();
    if (this.isConnected)
      fill(0, 255, 0);
    else
      fill(255, 0, 0);

    ellipse(this.connectX, this.connectY, 10);
    text("Connected: " + this.isConnected, this.connectX + 10, this.connectY + 5);
    pop();
  };

  this.power = function () {
    push();
    if (this.isPowered === true)
      fill(0, 255, 0);
    else
      fill(255, 0, 0);

    stroke(255);
    ellipse(this.powerX, this.powerY, 30);
    stroke(255);
    line(this.powerX, this.y + 10, this.x + 25, this.y + 25);
    pop();
  };

  this.play = function () {
    push();
    noStroke();
    if (this.isPlaying)
      fill(0, 255, 0);
    else
      fill(255, 0, 0);

    ellipse(this.playX, this.playY, 30);
    fill(255);
    noStroke();
    triangle(this.playX - 10, this.y + 10, this.playX - 10, this.y + 40, this.playX + 15, this.y + 25);
    pop();
  };

  this.next = function () {
    push();
    fill(255, 0, 0);
    noStroke();
    ellipse(this.nextX, this.nextY, 30);
    fill(255);
    triangle(this.nextX, this.y + 10, this.nextX, this.y + 40, this.nextX + 10, this.y + 25);
    triangle(this.x + 90, this.y + 10, this.x + 90, this.y + 40, this.x + 100, this.y + 25);
    pop();
  };

  this.prev = function () {
    push();
    fill(255, 0, 0);
    noStroke();
    ellipse(this.prevX, this.prevY, 30);
    fill(255);
    triangle(this.prevX, this.y + 10, this.prevX, this.y + 40, this.prevX - 10, this.y + 25);
    triangle(this.prevX + 10, this.y + 10, this.prevX + 10, this.y + 40, this.prevX, this.y + 25);
    pop();
  };

  this.battery = function () {
    push();
    if (this.isPowered)
      if (this.isCharged === true)
        fill(0, 255, 0);
      else
        fill(255, 0, 0);
    else
      fill(0);

    ellipse(this.x + 165, this.y + 25, 10);
    pop();
  };

  this.connected = function () {
    push();
    if (this.isPowered)
      if (this.isConnected === true)
        fill(0, 255, 0);
      else
        fill(255, 0, 0);
    else
      fill(0);

    ellipse(this.x + 180, this.y + 25, 10);
    pop();
  }
};


function mouseReleased() {
  // powerButton
  if (dist(mouseX, mouseY, speaker.powerX, speaker.powerY) < 15) {
    speaker.isPowered = !speaker.isPowered;
  } else if (dist(mouseX, mouseY, speaker.playX, speaker.playY) < 15) {
    if (speaker.isConnected && speaker.isCharged) {
      speaker.isPlaying = !speaker.isPlaying;
      speaker.isNext = false;
      speaker.isPrev = false;
    }
  } else if (dist(mouseX, mouseY, speaker.nextX, speaker.nextY) < 15) {
    if (speaker.isConnected && speaker.isCharged) {
      speaker.isPlaying = false;
      speaker.isPrev = false;
      speaker.isNext = true;
    }
  } else if (dist(mouseX, mouseY, speaker.prevX, speaker.prevY) < 15) {
    if (speaker.isConnected && speaker.isCharged) {
      speaker.isPlaying = false;
      speaker.isNext = false;
      speaker.isPrev = true;
    }
  } else if (dist(mouseX, mouseY, speaker.chargeX, speaker.chargeY) < 5) {
    if (speaker.isPowered)
      speaker.isCharged = !speaker.isCharged;
    if (!speaker.isCharged) {
      speaker.isPrev = false;
      speaker.isPlaying = false;
      speaker.isNext = false;
    }
  } else if (dist(mouseX, mouseY, speaker.connectX, speaker.connectY) < 5) {
    if (speaker.isPowered && speaker.isCharged)
      speaker.isConnected = !speaker.isConnected;
    if (!speaker.isConnected) {
      speaker.isPrev = false;
      speaker.isPlaying = false;
      speaker.isNext = false;
    }
  }
}

function mouseHover() {
  if (dist(mouseX, mouseY, speaker.powerX, speaker.powerY) < 15) {
    cursor(HAND);
  } else if (dist(mouseX, mouseY, speaker.playX, speaker.playY) < 15) {
    cursor(HAND);
  } else if (dist(mouseX, mouseY, speaker.nextX, speaker.nextY) < 15) {
    cursor(HAND);
  } else if (dist(mouseX, mouseY, speaker.prevX, speaker.prevY) < 15) {
    cursor(HAND);
  } else if (dist(mouseX, mouseY, speaker.chargeX, speaker.chargeY) < 5) {
    cursor(HAND);
  } else if (dist(mouseX, mouseY, speaker.playX, speaker.playY) < 15) {
    cursor(HAND);
  } else if (dist(mouseX, mouseY, speaker.nextX, speaker.nextY) < 15) {
    cursor(HAND);
  } else if (dist(mouseX, mouseY, speaker.prevX, speaker.prevY) < 15) {
    cursor(HAND);
  } else if (dist(mouseX, mouseY, speaker.chargeX, speaker.chargeY) < 5) {
    cursor(HAND);
  } else if (dist(mouseX, mouseY, speaker.connectX, speaker.connectY) < 5) {
    cursor(HAND);
  }
 else if (dist(mouseX, mouseY, speaker.connectX, speaker.connectY) < 5) {
    cursor(HAND);
  }
  else
    cursor(ARROW);
}


function checkStates() {
  if (speaker.isPowered)
    if (!speaker.isCharged)
      return activeState = 'S7';
    else if (speaker.isPlaying)
    return activeState = 'S4';
  else if (speaker.isNext)
    return activeState = 'S6';
  else if (speaker.isPrev)
    return activeState = 'S5';
  else if (speaker.isConnected)
    return activeState = 'S3';
  else
    return activeState = 'S2';
  else {
    speaker.isNext = false;
    speaker.isPlaying = false;
    speaker.isPrev = false;
    return activeState = 'S1';
  }
}