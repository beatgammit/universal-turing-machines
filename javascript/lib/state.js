(function () {
	'use strict';

	function State() {
	}

	State.prototype = {
		transitions: [],
		transition: function (tape) {
			var i, transition, match;

			for (i = 0; i < this.transitions.length; i += 1) {
				transition = this.transitions[i];
				// take this as the fallback unless we find a better one
				if (transition.input === '*') {
					match = transition;
					continue;
				}
				
				if (transition.input === tape.head) {
					match = transition;
					break;
				}
			}

			// we have a match, so update and move the head
			if (match) {
				// don't bother writing anything if we have a wildcard
				if (match.output !== '*') {
					tape.head = match.output;
				}

				tape.move(match.direction);
				return match.nextState;
			}

			// no valid state transitions, so reject
			return 'reject';
		}
	};

	module.exports = State;
}());
