define([], function () {
	return Class.create({
		initialize: function (core, steps) {
			this.core = core;

			var material = core.contentManager.getShaderMaterial("atlas_default");

			// floor
			this.floor = Utils.createPlaneMesh(Config.CorridorWidth, Config.CorridorWidth, material);
			this.floor.rotation.set(-Math.PI/2, 0, Math.PI);
			this.core.contentManager.getSprite("floor").applyToMesh(this.floor);
			this.floor.position.set(0, 0, steps * Config.CorridorWidth);
			this.core.renderer.addMesh(this.floor);

			// ceiling
			this.ceiling = Utils.createPlaneMesh(Config.CorridorWidth, Config.CorridorWidth, material);  
			this.ceiling.rotation.set(Math.PI/2, 0, 0);
			this.core.contentManager.getSprite("ceiling").applyToMesh(this.ceiling);
			this.ceiling .position.set(0, Config.CorridorHeight, steps * Config.CorridorWidth);
			this.core.renderer.addMesh(this.ceiling);

			// left wall
			this.leftWall = Utils.createPlaneMesh(Config.CorridorWidth, Config.CorridorWidth/2, material);
			this.leftWall.rotation.set(0, -Math.PI/2, 0);
			this.core.contentManager.getSprite("wall_" + Utils.getRandomInt(1, 1).toString()).applyToMesh(this.leftWall);
			this.leftWall.position.set(Config.CorridorWidth/2, Config.CorridorWidth/4, steps * Config.CorridorWidth);
			this.core.renderer.addMesh(this.leftWall);

			// right wall
			this.rightWall = Utils.createPlaneMesh(Config.CorridorWidth, Config.CorridorWidth/2, material);
			this.rightWall.rotation.set(0, Math.PI/2, 0);
			this.core.contentManager.getSprite("wall_" + Utils.getRandomInt(1, 1).toString()).applyToMesh(this.rightWall);
			this.rightWall.position.set(-Config.CorridorWidth/2, Config.CorridorWidth/4, steps * Config.CorridorWidth);
			this.core.renderer.addMesh(this.rightWall);
		},

		setTint: function (r, g, b) {
			Utils.setMeshTint(this.getFloor(), r, g, b);
			Utils.setMeshTint(this.getCeiling(), r, g, b);
			Utils.setMeshTint(this.getLeftWall(), r, g, b);
			Utils.setMeshTint(this.getRightWall(), r, g, b);
		},

		getFloor: function () { 
			return this.floor; 
		},
			
		getCeiling: function () { 
			return this.ceiling; 
		},
			
		getLeftWall: function () { 
			return this.leftWall; 
		},
			
		getRightWall: function () { 
			return this.rightWall; 
		},
			
		shiftMe: function (steps) {
			var d = steps * Config.CorridorWidth; 

			this.getFloor().position.z += d;
			this.getCeiling().position.z += d;
			this.getLeftWall().position.z += d;
			this.getRightWall().position.z += d;
		},

		dispose: function () {
			this.core.renderer.removeMesh(this.getFloor());
			this.core.renderer.removeMesh(this.getCeiling());
			this.core.renderer.removeMesh(this.getLeftWall());
			this.core.renderer.removeMesh(this.getRightWall());
		}
	});
});