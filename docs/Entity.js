class Entity {
	constructor(x, y, direction) {
		this.x = x;
		this.y = y;
		this.direction = direction;
	}
}

class Star {
	constructor(x, y, r) {
    	this.x = x;
		this.y = y;
		this.r = r;

		this.twinkle = 2 * Math.PI * Math.random();
  	}

  	Update(dt) {
  		this.twinkle += dt / 100;
  		while(this.twinkle >= 2 * Math.PI) this.twinkle -= 2 * Math.PI;
  	}

  	Render(renderer) {
  		renderer.DrawStar(this.x, this.y, this.r, this.twinkle);
  	}
}

class World {
	constructor(x, y, size, color) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
	}

	Render(renderer) {
  		renderer.DrawPlanet(this.x, this.y, this.size, this.color);
  	}
}

class Ship extends Entity {
	constructor(type, x, y, direction) {
		super(x, y, direction);

		this.type = type;
	}

	Render(renderer) {
		renderer.DrawShip(this.type, this.x, this.y, this.direction);
	}
}