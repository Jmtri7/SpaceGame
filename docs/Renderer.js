class Renderer {
	constructor() {
		this.window = new Window(this);
		this.canvas = this.window.canvas;
		this.ctx = this.canvas.getContext("2d");

		this.scale = 0.5;
		this.cameraX = 0;
		this.cameraY = 0;
	}

	MoveCamera(x, y) {
		this.cameraX = x;
		this.cameraY = y;
	}

	DrawCircle(x, y, r) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, 2 * Math.PI);
		this.ctx.fill();
	}

	DrawLine(x1, y1, x2, y2, weight = false) {
		if(weight) this.ctx.lineWidth = weight;
		else this.ctx.lineWidth = 1;

		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke(); 
	}

	DrawStar(x, y, r, twinkle) {
		var x = (x - this.cameraX) * this.scale;
		var y = (y - this.cameraY) * this.scale;
		var r = r * (Math.sin(twinkle) + 1) / 2;
		r *= this.scale;

		this.ctx.fillStyle = "white";
		this.DrawCircle(x, y, r);

		this.ctx.fillStyle = "black";
		this.DrawCircle(x - r, y - r, r);
		this.DrawCircle(x + r, y - r, r);
		this.DrawCircle(x - r, y + r, r);
		this.DrawCircle(x + r, y + r, r);
	}

	DrawWorld(x, y, size, color) {
		var x = (x - this.cameraX) * this.scale;
		var y = (y - this.cameraY) * this.scale;
		var r = 10 * size * this.scale;

		this.ctx.fillStyle = color;
		this.DrawCircle(x, y, r);
	}

	DrawShip(type, x, y, direction) {
		var x = (x - this.cameraX) * this.scale;
		var y = (y - this.cameraY) * this.scale;
		var length = 10 * this.scale;

		if(false) {

		} else {
			this.ctx.fillStyle = "gray";
			this.DrawCircle(x, y, 20 * this.scale);

			this.ctx.strokeStyle = "gray";
			this.DrawLine(
				x + 5 * length * Math.cos(direction),
				y + 5 * length * Math.sin(direction),
				x + 2 * length * Math.cos(direction + Math.PI),
				y + 2 * length * Math.sin(direction + Math.PI),
				10
			);
		}
	}

	Clear(color = false) {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		if(color) {
			this.ctx.fillStyle = color;
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}
}

class Window {
	constructor(renderer) {
		var body = document.getElementsByTagName("body")[0];
		this.canvas = document.createElement('canvas');
		body.appendChild(this.canvas);

		this.canvas.style.zIndex = 8;
		this.canvas.style.position = "absolute";

		this.canvas.style.margin = "0px 0px 0px 0px";
		body.style.margin = "0px 0px 0px 0px";
		body.style.padding = "0px 0px 0px 0px";

		this.renderer = renderer;

		// RESIZE BEHAVIOR
		var scrollbarSize = 0;
		this.canvas.width = window.innerWidth - scrollbarSize;
		this.canvas.height = window.innerHeight - scrollbarSize;
		this.renderer.scale = Math.max(this.canvas.width, this.canvas.height) / 1000;

		if(window.attachEvent) {
			var that = this;
    		window.attachEvent('onresize', function() {
        		that.canvas.width = window.innerWidth - scrollbarSize;
				that.canvas.height = window.innerHeight - scrollbarSize;

				that.renderer.scale = Math.max(that.canvas.width, that.canvas.height) / 1000;
    		});
		}
		else if(window.addEventListener) {
			var that = this;
    		window.addEventListener('resize', function() {
        		that.canvas.width = window.innerWidth - scrollbarSize;
				that.canvas.height = window.innerHeight - scrollbarSize;

				that.renderer.scale = Math.max(that.canvas.width, that.canvas.height) / 1000;
    		}, true);
		}
		else {
    		//The browser does not support Javascript event binding
		}
	}
}

