(function () {
	'use strict';

	function State() {
	}

	State.prototype = {
		transitions: [],
		transition: function (tape) {
			var i;

			for (i = 0; i < this.transitions.length; i += 1) {
				if (this.transitions[i].input === tape.head) {
					tape.head = this.transitions[i].output;
					tape.move(this.transitions[i].direction);
					return this.transitions[i].nextState;
				}
			}

			// no valid state transitions, so reject
			return 'reject';
		}
	};

	module.exports = State;
}());
