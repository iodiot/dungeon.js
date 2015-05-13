define(["BoundingBox"], function (BoundingBox) {
	return Class.create({
		initialize: function (core, x, y, z) {
			this.core = core;

			Utils.assert(this.x === undefined, "Argument is missing in Actor::initialize");
			Utils.assert(this.y === undefined, "Argument is missing in Actor::initialize");
			Utils.assert(this.z === undefined, "Argument is missing in Actor::initialize");

			this.setPosition(x || 0, y || 0, z || 0);
			this.setDimensions(0, 0, 0);

			// other properties
			this.scale = 1;
			this.ticksAlive = 0;
			this.ignoresPhysics = false;
		},

		setPosition: function (x, y, z) {
			this.x = x;
			this.y = y;
			this.z = z;
		},

		setDimensions: function (dx, dy, dz) {
			this.dx = dx;
			this.dy = dy;
			this.dz = dz;
		},

		update: function (ticks) {
			this.ticksAlive += 1;
		},

		addMesh: function () {

		},

		updateMesh: function () {

		},

		removeMesh: function () {

		},

		getBoundingBox: function () {
			return new BoundingBox(this.x - this.dx/2, this.y - this.dy/2, this.z - this.dz/2, this.dx, this.dy, this.dz);
		},

		onCollision: function (actor) {
			
		},

		handleEvent: function (event, parameters) {

		}
	});
});