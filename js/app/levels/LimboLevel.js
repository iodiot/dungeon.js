define(["levels/Level", "actors/SkeletonActor", "actors/BatActor", "actors/HandActor", "actors/SlimeActor", "actors/TorchActor", "actors/SawActor", "actors/WallTrapActor", "actors/GhostActor"], 
	function (Level, SkeletonActor, BatActor, HandActor, SlimeActor, TorchActor, SawActor, WallTrapActor, GhostActor) {
	return Class.create(Level, {
		initialize: function ($super, core) {
			$super(core, "Limbo");

			this.tint = new THREE.Color(0xffffff);
		},

		update: function ($super, ticks) {
			$super(ticks);

			if (false) { // Release behavior

				// Add torches
				if (ticks % 101 == 0) {
					this.core.handleEvent("add actor", { actor: new TorchActor(this.core, (ticks % 2 == 0) ? 6.8 : -6.8, 5, this.getPlayer().z + 70) });
				} 

				// Add a flock of bats
				if (Utils.getRandomInt(0, 500) === 0) {
					for (var i = 0; i < Utils.getRandomInt(4,10); i++) {
						this.core.handleEvent("add actor", { actor: new BatActor(this.core, Utils.getRandomInt(-5, 5), this.getPlayer().z + 80 + i * 3) });
					}
				} 

				// Add a skeleton
				if (Utils.getRandomInt(0, 50) === 0) {
					this.core.handleEvent("add actor", { actor: new SkeletonActor(this.core, Utils.getRandomInt(-5, 5), this.getPlayer().z + Utils.getRandomInt(80, 85)) });
				} 

				// Add a slime
				if (Utils.getRandomInt(0, 150) === 0) {
					this.core.handleEvent("add actor", { actor: new SlimeActor(this.core, Utils.getRandomInt(-5, 5), this.getPlayer().z + 80) });
				} 

				// Add a forest of hands
				if (Utils.getRandomInt(0, 700) === 0) {
				   var distance = Utils.getRandomInt(80, 100); 
				   for (var i = 0; i < Utils.getRandomInt(0,10); i++) {
						this.core.handleEvent("add actor", { actor: new HandActor(this.core, 0, this.getPlayer().z + distance + i * 2) });
				   }
				} 

				// Saw wave trap
				if (Utils.getRandomInt(0, 700) === 0) {
					for (var i = 0; i < 5; i++) {
						this.core.handleEvent("add actor", { 
							actor: new SawActor(this.core, 0, 0, this.getPlayer().z + 80 + i * 4.5, 
								{type: "slide", size: 4, speed: 0.05, offset: -i}
							) 
						});
					}
				} 	

				// Saw zigzag trap
				if (Utils.getRandomInt(0, 700) === 0) {
					for (var i = 0; i < 4; i++) {
						this.core.handleEvent("add actor", { 
							actor: new SawActor(this.core, -5 + i * 3.5, 0, this.getPlayer().z + 80, 
								{type: "static", size: 4, speed: 0}
							) 
						});
					}
				} 

				// Saw fence trap
				if (Utils.getRandomInt(0, 700) === 0) {
					for (var i = 0; i < 4; i++) {
						this.core.handleEvent("add actor", { 
							actor: new SawActor(this.core, (i % 2 == 0) ? 7 : -7, 0, this.getPlayer().z + 120 + i * 10, 
								{type: "static", size: 12, speed: 0.05}
							) 
						});
					}
				} 	

			} else { // Debug behavior

				// Add torches
				if (ticks % 101 == 0) {
					this.core.handleEvent("add actor", { actor: new TorchActor(this.core, (ticks % 2 == 0) ? 6.8 : -6.8, 5, this.getPlayer().z + 70) });
				} 

				if (ticks % 200 == 0) {
					this.core.handleEvent("add actor", { actor: new GhostActor(this.core, this.getPlayer().x, this.getPlayer().z + 80) });
				} 	
			}
		}
	});
});