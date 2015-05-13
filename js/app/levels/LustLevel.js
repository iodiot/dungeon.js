define(["levels/Level"], function (Level) {
	return Class.create(Level, {
		initialize: function ($super, core) {
			$super(core, "Lust");

			this.tint = new THREE.Color(0xff0000);
		}
	});
});