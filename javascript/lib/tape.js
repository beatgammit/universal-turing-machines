(function () {
	'use strict';

	function Tape(input) {
		this._tape = input.match(/^\s*(.*)\s*$/)[1].split(',');
		this._head = 0;
	}

	Tape.prototype = {
		get head() {
			return this._tape[this._head];
		},
		set head(val) {
			this._tape[this._head] = val;
		},
		move: function (direction) {
			if (direction === 'L') {
				// only move the head if it won't fall off the tape
				this._head -= (this._head >= 0) ? 1 : 0;
			} else if (direction === 'R'){
				this._head += 1;
			} else {
				throw 'Invalid tape move, only L or R are allowed';
			}
		}
	};

	module.exports = Tape;
}());
