define(["actors/Actor", "Sprite", "Animation"], function (Actor, Sprite, Animation) {
	return Class.create(Actor, {
		initialize: function ($super, core, z) {
			$super(core, 0, Config.CorridorWidth / 4, z);

			this.setDimensions(1, 1, 1);

			this.centerX = this.x;

			this.scale = (Config.CorridorWidth / 2) / 40;

			this.addMesh();
			this.updateMesh();
		},

		addMesh: function ($super) {
			$super();
			this.frontWall = Utils.createPlaneMesh(23 * this.scale, 40 * this.scale, this.core.contentManager.getShaderMaterial("atlas_default"), false);
			this.core.contentManager.getSprite("trap_1").applyToMesh(this.frontWall);
			this.frontWall.rotation.set(0, Math.PI, 0);
			this.frontWall.position.set(this.x, this.y, this.z);
		
			this.leftWall = Utils.createPlaneMesh(23 * this.scale, 40 * this.scale, this.core.contentManager.getShaderMaterial("atlas_default"), false);
			this.core.contentManager.getSprite("wall_7").applyToMesh(this.leftWall, 23);
			this.leftWall.rotation.set(0, Math.PI / 2, 0);
			this.leftWall.position.set(this.x + 23 * this.scale * 0.5, this.y, this.z + 23 * this.scale * 0.5);
		

			this.rightWall = Utils.createPlaneMesh(23 * this.scale, 40 * this.scale, this.core.contentManager.getShaderMaterial("atlas_default"), false);
			this.core.contentManager.getSprite("wall_7").applyToMesh(this.rightWall, 23);
			this.rightWall.rotation.set(0, -Math.PI / 2, 0);
			this.rightWall.position.set(this.x - 23 * this.scale * 0.5, this.y, this.z + 23 * this.scale * 0.5);

			this.core.renderer.addMesh(this.frontWall);
			this.core.renderer.addMesh(this.leftWall);
			this.core.renderer.addMesh(this.rightWall);
		},

		updateMesh: function ($super) {
			$super();
		},

		removeMesh: function ($super) {
			$super();

			this.core.renderer.removeMesh(this.frontWall);
			this.core.renderer.removeMesh(this.leftWall);
			this.core.renderer.removeMesh(this.rightWall);
		},

		update: function ($super, ticks) {
			$super(ticks);
		},

		onCollision: function ($super, actor) {
			$super();
		}
	});
});
