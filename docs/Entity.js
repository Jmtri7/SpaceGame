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

	static RandomPlanet(x, y) {
		var size = 2 * Math.random() + 4;

		var red = 255 * Math.random();
		var green = 255 * Math.random();
		var blue = 255 * Math.random();
		var color = "rgb(" + red + ", " + green + ", " + blue + ")";

		return new World(x, y, size, color);
	}

	static RandomMoon(planet) {
		var randomOrbit = 2 * Math.PI * Math.random();
		var randomDistance = 300 * Math.random() + 2 * planet.size * 10;

		var x = planet.x + randomDistance * Math.cos(randomOrbit);
		var y = planet.y + randomDistance * Math.sin(randomOrbit);

		var size = (planet.size - 4) * Math.random() + 1;

		var red = 255 * Math.random();
		var green = 255 * Math.random();
		var blue = 255 * Math.random();
		var color = "rgb(" + red + ", " + green + ", " + blue + ")";

		return new World(x, y, size, color);
	}

	Render(renderer) {
  		renderer.DrawWorld(this.x, this.y, this.size, this.color);
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

class System {
	constructor() {
		this.size = 1000;

		// STARS
		this.stars = [];
		for(var i = 0; i < 1000; i++) {
			var x = this.size * Math.random();
			var y = this.size * Math.random();
			var r = 5 * Math.random() + 1;

			this.stars.push(new Star(x, y, r));
		}

		// PLANET

		this.worlds = [];

		var x = this.size / 2;
		var y = this.size / 2;

		var planet = World.RandomPlanet(x, y);
		this.worlds.push(planet);

		// MOONS

		for(var i = 0; i < 5; i++) {
			this.worlds.push(World.RandomMoon(planet));
		}

	}

	Update(dt) {
		this.stars.forEach(function(star) {
			star.Update(10);
		});

		this.worlds.forEach(function(world) {
		});
	}

	Render(renderer) {
		this.stars.forEach(function(star) {
			star.Render(R);
		});

		this.worlds.forEach(function(world) {
			world.Render(R);
		});
	}
}