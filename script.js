var canvas;
var stage;
var container;
var captureContainers;
var captureIndex;

function init() {
  canvas = document.getElementById("testCanvas");
  stage = new createjs.Stage(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var w = canvas.width;
  var h = canvas.height;

  container = new createjs.Container();
  stage.addChild(container);

  captureContainers = [];
  captureIndex = 0;

		for (var i = 0; i < 100; i++) {
			var heart = new createjs.Shape();
			heart.graphics.beginFill(createjs.Graphics.getHSL(Math.random() * 30 - 45, 100, 50 + Math.random() * 30));
			heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10).curveTo(16, 0, 0, 12);
			heart.graphics.curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20).curveTo(-1, -20, 0, -12);
			heart.y = -100;

			container.addChild(heart);
		}

  var text = new createjs.Text("Voglio continuare ad essere la ragione dei tuoi sorrisi, la compagna delle tue avventure,"+
    "\ncolui che ti prende la mano e ti fa sentire amato in ogni momento."+
    "\nNon c'è niente al mondo che desidero di più che vederti felice,"+
    "\ncondividere ogni momento con voi e continuare a scrivere insieme la nostra storia."+
    "\n\nSei il mio amore, la mia vita, il mio tutto. E oggi, come sempre, ti scelgo mille volte di più."+
    "\n\nTi amo con tutta la mia anima amore mio."
    , "bold 30px Arial", "#312");
  text.textAlign = "center";
  text.x = w / 2;
  text.y = h / 3 - text.getMeasuredLineHeight();
  stage.addChild(text);

  for (i = 0; i < 100; i++) {
    var captureContainer = new createjs.Container();
    captureContainer.cache(0, 0, w, h);
    captureContainers.push(captureContainer);
  }

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.on("tick", tick);
}

function tick(event) {
  var w = canvas.width;
  var h = canvas.height;
  var l = container.numChildren;

  captureIndex = (captureIndex + 1) % captureContainers.length;
  stage.removeChildAt(0);
  var captureContainer = captureContainers[captureIndex];
  stage.addChildAt(captureContainer, 0);
  captureContainer.addChild(container);

		for (var i = 0; i < l; i++) {
			var heart = container.getChildAt(i);
			if (heart.y < -50) {
				heart._x = Math.random() * w;
				heart.y = h * (1 + Math.random()) + 50;
				heart.perX = (1 + Math.random() * 2) * h;
				heart.offX = Math.random() * h;
				heart.ampX = heart.perX * 0.1 * (0.15 + Math.random());
				heart.velY = -Math.random() * 2 - 1;
				heart.scale = Math.random() * 2 + 1;
				heart._rotation = Math.random() * 40 - 20;
				heart.alpha = Math.random() * 0.75 + 0.05;
				heart.compositeOperation = Math.random() < 0.33 ? "lighter" : "source-over";
			}
			var int = (heart.offX + heart.y) / heart.perX * Math.PI * 2;
			heart.y += heart.velY * heart.scaleX / 2;
			heart.x = heart._x + Math.cos(int) * heart.ampX;
			heart.rotation = heart._rotation + Math.sin(int) * 30;
		}

  captureContainer.updateCache("source-over");

  stage.update(event);
}

init();