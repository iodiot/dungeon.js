define(["states/State"], function (State) {
	return Class.create(State, {
		initialize: function($super, core) {
			$super(core);

		},

		update: function($super, ticks) {
			$super(ticks);

			
		},

		render: function($super) {
			$super();

			
		},

		dispose: function($super) {
			$super();

		},

		handleEvent: function ($super, event, parameters) {
			$super(event, parameters);

			if (event === "key down") {
				if (parameters.key === 'M'.charCodeAt(0) || parameters.key === 27) {
					this.core.popState();
				}
			}
		}
	});
});
