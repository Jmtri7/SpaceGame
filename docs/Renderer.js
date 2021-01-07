class Renderer {
	constructor() {
		this.window = new Window();
		this.canvas = this.window.canvas;
		this.ctx = this.canvas.getContext("2d");	
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
		var r = r * (Math.sin(twinkle) + 1) / 2;

		this.ctx.fillStyle = "white";
		this.DrawCircle(x, y, r);

		this.ctx.fillStyle = "black";
		this.DrawCircle(x - r, y - r, r);
		this.DrawCircle(x + r, y - r, r);
		this.DrawCircle(x - r, y + r, r);
		this.DrawCircle(x + r, y + r, r);
	}

	DrawPlanet(x, y, size, color) {
		var r = 10 * size;

		this.ctx.fillStyle = color;
		this.DrawCircle(x, y, r);
	}

	DrawShip(type, x, y, direction) {
		if(false) {

		} else {
			this.ctx.fillStyle = "gray";
			this.DrawCircle(x, y, 20);

			this.ctx.strokeStyle = "gray";
			var length = 100;
			this.DrawLine(
				x + 50 * Math.cos(direction),
				y + 50 * Math.sin(direction),
				x + 50 * Math.cos(direction + Math.PI),
				y + 50 * Math.sin(direction + Math.PI),
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
	constructor() {
		var body = document.getElementsByTagName("body")[0];
		this.canvas = document.createElement('canvas');
		body.appendChild(this.canvas);

		this.canvas.style.zIndex = 8;
		this.canvas.style.position = "absolute";

		this.canvas.style.margin = "0px 0px 0px 0px";
		body.style.margin = "0px 0px 0px 0px";
		body.style.padding = "0px 0px 0px 0px";

		// RESIZE BEHAVIOR
		var scrollbarSize = 0;
		this.canvas.width = window.innerWidth - scrollbarSize;
		this.canvas.height = window.innerHeight - scrollbarSize;
		if(window.attachEvent) {
			var that = this;
    		window.attachEvent('onresize', function() {
        		that.canvas.width = window.innerWidth - scrollbarSize;
				that.canvas.height = window.innerHeight - scrollbarSize;
    		});
		}
		else if(window.addEventListener) {
			var that = this;
    		window.addEventListener('resize', function() {
        		that.canvas.width = window.innerWidth - scrollbarSize;
				that.canvas.height = window.innerHeight - scrollbarSize;
    		}, true);
		}
		else {
    		//The browser does not support Javascript event binding
		}
	}
}

