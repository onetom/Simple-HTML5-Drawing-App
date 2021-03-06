var drawingApp = (function () {
	var canvas,
		context,
		canvasWidth = 980,
		canvasHeight = 440,
		colorBlack = "#000000",
		colorBlue = "#0000ff",
		colorGreen = "#00c142",
		colorRed = "#ff0000",
		brushHuge = 20,
		brushLarge = 10,
		brushNormal = 5,
		brushSmall = 2,
		clickX = [],
		clickY = [],
		clickColor = [],
		clickTool = [],
		clickSize = [],
		clickDrag = [],
		paint = false,
		currentColor = colorBlack,
		currentTool = "marker",
		currentSize = brushNormal,

		redraw = function () {
			context.clearRect(0, 0, canvas.width, canvas.height);

			for (i = 0; i < clickX.length; i += 1) {
				context.beginPath();
				if (clickDrag[i] && i > 0) {
					context.moveTo(clickX[i - 1], clickY[i - 1]);
				} else {
					context.moveTo(clickX[i] - 1, clickY[i]);
				}
				context.lineTo(clickX[i], clickY[i]);

				context.strokeStyle = (clickTool[i] === "eraser") ? 'white' : clickColor[i];
				context.lineCap = "round";
				context.lineJoin = "round";
				context.lineWidth = clickSize[i];

				context.stroke();
			}
			context.closePath();
			context.restore();
		},

		addClick = function (x, y, dragging) {
			clickX.push(x);
			clickY.push(y);
			clickTool.push(currentTool);
			clickColor.push(currentColor);
			clickSize.push(currentSize);
			clickDrag.push(dragging);
		},

		setupListeners = function () {
			document.getElementById("marker").addEventListener("click", function () {
				currentTool = "marker";
			});
			document.getElementById("eraser").addEventListener("click", function () {
				currentTool = "eraser"
			});
			document.getElementById("black").addEventListener("click", function () {
				currentColor = colorBlack;
			});
			document.getElementById("blue").addEventListener("click", function () {
				currentColor = colorBlue;
			});
			document.getElementById("green").addEventListener("click", function () {
				currentColor = colorGreen;
			});
			document.getElementById("red").addEventListener("click", function () {
				currentColor = colorRed;
			});
			document.getElementById("huge").addEventListener("click", function () {
				currentSize = brushHuge;
			});
			document.getElementById("large").addEventListener("click", function () {
				currentSize = brushLarge;
			});
			document.getElementById("normal").addEventListener("click", function () {
				currentSize = brushNormal;
			});
			document.getElementById("small").addEventListener("click", function () {
				currentSize = brushSmall;
			});

			var press = function (e) {
				const mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft
				const mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop

				paint = true;
				addClick(mouseX, mouseY, false);
				redraw();
			};
			var drag = function (e) {
				const mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft
				const mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop

				if (paint) {
					addClick(mouseX, mouseY, true);
					redraw();
				}
				// Prevent the whole page from dragging if on mobile
				e.preventDefault();
			};
			var release = function () {
				paint = false;
				redraw();
			};
			var cancel = function () {
				paint = false;
			};

			canvas.addEventListener("mousedown", press, false);
			canvas.addEventListener("mousemove", drag, false);
			canvas.addEventListener("mouseup", release);
			canvas.addEventListener("mouseout", cancel, false);

			// Add touch event listeners to canvas element
			canvas.addEventListener("touchstart", press, false);
			canvas.addEventListener("touchmove", drag, false);
			canvas.addEventListener("touchend", release, false);
			canvas.addEventListener("touchcancel", cancel, false);
		},

		init = function () {
			canvas = document.getElementById('canvas');
			canvas.setAttribute('width', canvasWidth);
			canvas.setAttribute('height', canvasHeight);
			canvas.setAttribute('id', 'canvas');
			canvas.style.border = "1px solid black";
			context = canvas.getContext("2d");

			redraw();
			setupListeners();
		};

	return {
		init: init
	};
}());
