define(["CorridorBlock"], function (CorridorBlock) {
	return Class.create({
		// consts
		CorridorBlocksCount: 10,

		// fields
		greetingCountdown: 100,

		currentCorridor: [],
		nextCorridor: [],

		initialize: function (core, name) {
			this.core = core;
			this.name = name;

			this.buildCorridor();

			//this.setCorridorTint(1, 0, 0);
		},

		getPlayer: function () {
			return this.core.getCurrentState().player; // TODO: not bulletproof code
		},

		setCorridorTint: function (r, g, b) {
			for (var i = 0; i < this.CorridorBlocksCount/2; ++i) {
				this.currentCorridor[i].setTint(r, g, b);
				this.nextCorridor[i].setTint(r, g, b);
			}
		},

		buildCorridor: function () {
			for (var i = 0; i < this.CorridorBlocksCount; ++i) {
				var block = new CorridorBlock(this.core, i);
				if (i < this.CorridorBlocksCount/2) {
					this.currentCorridor.push(block);
				} else { 
					this.nextCorridor.push(block);
				}
			}
		},

		update: function (ticks) {
			// move corridor blocks
			if (this.getPlayer().z - this.nextCorridor[0].getFloor().position.z > 5) {
				for (var i = 0; i < this.currentCorridor.length; ++i) {
					this.currentCorridor[i].shiftMe(this.nextCorridor.length + this.currentCorridor.length);
				}

				var t = this.currentCorridor;
				this.currentCorridor = this.nextCorridor;
				this.nextCorridor = t;
			}

			if (this.greetingCountdown > 0) { --this.greetingCountdown; } 
		},

		dispose: function () {
			// dispose corridor blocks
			for (var i = 0; i < this.currentCorridor.length; ++i) {
				this.currentCorridor[i].dispose();
			}
			this.currentCorridor.length = 0;

			for (var i = 0; i < this.nextCorridor.length; ++i) {
				this.nextCorridor[i].dispose();
			}    
			this.nextCorridor.length = 0;
		},

		handleEvent: function (event, parameters) {

		},

		render: function () {
			if (this.greetingCountdown > 0) {
				this.core.renderer.renderText("Welcome to " + this.name + "...", 10, 230, 5, new THREE.Vector3(1, 1, 1));
			}
		}
	});
});