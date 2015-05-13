define(["actors/EnemyActor", "Animation", "actors/FireballActor"], function (EnemyActor, Animation, FireballActor) {
	return Class.create(EnemyActor, {
		initialize: function ($super, core, x, z) {
			$super(core, x, 2.5, z);

			this.setDimensions(2, 4, 2);

			this.scale = 7;

			// animations
			this.animations = {};
			this.animations["move"] = new Animation(0.1);
			this.animations["move"].addSprite(this.core.contentManager.getSprite("ghost_1"));
			this.animations["move"].addSprite(this.core.contentManager.getSprite("ghost_2"));
			this.animations["move"].addSprite(this.core.contentManager.getSprite("ghost_3"));

			this.currentAnimation = this.animations["move"];

			this.addMesh();
			this.updateMesh();
		},

		update: function ($super, ticks) {
			$super(ticks);

			var player = this.core.getCurrentState().player;
			var distance = this.z - player.z;
			var speed = 0;

			if (distance > 45) { 
				speed = 0.7;
			} else if (distance > 35) { 
				speed = 0.08; 
				this.x += (player.x - this.x) * 0.04;
			} else  if (distance > 20) { 
				speed = 1.5;
				this.x += (player.x - this.x) * 0.02;
			} else { 
				speed = 2.0; 
			}

			this.z -= -0.3 + speed;
			this.y = 2.5 + Math.sin(ticks * 0.06) * 0.4;


			this.currentAnimation.update(ticks);
		},

		updateMesh: function ($super) {
			$super();

			this.currentAnimation.applyToMesh(this.mesh);
		},

		onCollision: function ($super, actor) {
			$super();

			if (actor instanceof FireballActor) {

			}
		}

	});
});