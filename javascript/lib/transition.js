(function () {
	'use strict';

	function Transition(input, output, direction, nextState) {
		this.input = input;
		this.output = output;
		this.direction = direction;
		this.nextState = nextState;
	}

	module.exports = Transition;
}());
