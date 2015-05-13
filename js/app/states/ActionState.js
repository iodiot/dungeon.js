define(["states/State", "states/GameOverState", "levels/LimboLevel", "levels/LustLevel", "actors/PlayerActor", "states/MapState"], 
	function (State, GameOverState, LimboLevel, LustLevel, PlayerActor, MapState) {
	return Class.create(State, {
		// fields
		actors: [],
		actorsToAdd: [],
		actorsToRemove: [],
		player: null,

		progress: 0,

		currentLevel: null,

		initialize: function($super, core) {
			$super(core);

			this.player = new PlayerActor(this.core);
			this.actors.push(this.player);

			this.changeLevelTo(new LimboLevel(core));
		},

		changeLevelTo: function (newLevel) {
			if (this.currentLevel !== null) {
				this.currentLevel.dispose();
			}

			this.currentLevel = newLevel;
		},

		checkCollisions: function (actor) {
			for (var i = 0; i < this.actors.length; ++i) {
				var other = this.actors[i];

				if (actor !== other && !other.ignoresPhysics && actor.getBoundingBox().intersects(other.getBoundingBox())) {
					actor.onCollision(other);
					other.onCollision(actor);
				}
			}
		},

		removeOffScreenActors: function () {
			var newActors = [];

			for (var i = 0; i < this.actors.length; ++i) {
				if (this.player.z - this.actors[i].z > 5) {
					this.core.handleEvent("remove actor", { actor: this.actors[i] });
				}
			}
		},

		processActors: function (ticks) {
			if (ticks % 100 === 0) {
				this.removeOffScreenActors();
			}

			// add new actors
			for (var i = 0; i < this.actorsToAdd.length; ++i) {
				this.actors.push(this.actorsToAdd[i]);
			}
			this.actorsToAdd.length = 0;

			// remove old actors
			for (var i = 0; i < this.actorsToRemove.length; ++i) {
				var n = this.actors.indexOf(this.actorsToRemove[i]);
				if (n > -1) { 
					this.actors[n].removeMesh(); 
					this.actors.splice(n, 1); 
				}
			}
			this.actorsToRemove.length = 0;

			// update actors
			for (var i = 0; i < this.actors.length; ++i) {
				this.actors[i].update(ticks);
			}

			// check collisions
			for (var i = 0; i < this.actors.length; ++i) {
				if (!this.actors[i].ignoresPhysics) { 
					this.checkCollisions(this.actors[i]);
				}
			}

			// update meshes
			for (var i = 0; i < this.actors.length; ++i) {
				this.actors[i].updateMesh();
			}
		},

		update: function ($super, ticks) {
			$super(ticks);

			this.processActors(ticks);

			if (ticks % 50 === 0) {
				this.progress += 5;
			}

			this.currentLevel.update(ticks);

			// set camera
			this.core.renderer.camera.position.z = this.player.z - 5.3;
			this.core.renderer.camera.position.x = this.player.x * 0.6;
			this.core.renderer.camera.rotation.z = Math.PI + this.player.x * 0.005;
			this.core.renderer.camera.position.y = this.player.y + 2.5 - (this.player.y - 2.5) * 0.3;
		},

		render: function ($super) {
			$super();

			// progress
			this.core.renderer.renderText(this.progress.toString() + "m", 10, 10, 5, new THREE.Vector3(1, 1, 1));

			this.currentLevel.render();
		},

		dispose: function ($super) {
			$super();

			this.currentLevel.dispose();

			// dispose actors
			for (var i = 0; i < this.actors.length; ++i) {
				this.actors[i].removeMesh();
			}
			this.actors.length = 0;
		},

		handleEvent: function ($super, event, parameters) {
			$super(event, parameters);

			for (var i = 0; i < this.actors.length; ++i) {
				this.actors[i].handleEvent(event, parameters);
			}

			if (event === "add actor") {
				this.actorsToAdd.push(parameters.actor);
			}

			if (event === "remove actor") {
				this.actorsToRemove.push(parameters.actor);
			}

				if (event === "game over") {
				this.core.changeState(new GameOverState(this.core, { progress: this.progress }));
			}

			if (event === "key down") {
				if (parameters.key === 'M'.charCodeAt(0)) {
					this.core.pushState(new MapState(this.core));
				}
			}

			this.currentLevel.handleEvent(event, parameters);
		},

		getCurrentLevel: function () {
			return this.currentLevel;
		}
	});
});
