(function () {
	'use strict';

	var Transition = require('./transition'),
		State = require('./state'),
		Tape = require('./tape');

	function TuringMachine(transitions) {
		transitions = transitions.split('\n');

		// get the first state name
		this.firstState = transitions[0].split(',')[0];

		this.states = {};
		transitions.sort().forEach(function (transition) {
			var arr,
				state;

			if (/^\s*$/.test(transition)) {
				return;
			}

			arr = transition.split(',');

			if (arr.length !== 5) {
				throw 'Invalid transition: ' + transition;
			}

			state = arr[0];

			// if we haven't seen this state name yet
			if (!this.states[state]) {
				this.states[state] = new State();
			}

			this.states[state].transitions.push(new Transition(arr[1], arr[2], arr[3], arr[4]));
		}, this);
	}

	TuringMachine.prototype = {
		run: function (input, cb) {
			var state = this.firstState,
				trace = [];

			cb = (typeof cb === 'function') ? cb : function () {};

			this.tape = new Tape(input);

			while(state !== 'accept' && state !== 'reject') {
				trace.push({
					state: state,
					head: this.tape.head
				});

				state = this.states[state].transition(this.tape);
			}

			cb({
				tape: this.tape._tape,
				head: this.tape._head,
				trace: trace,
				accept: state === 'accept'
			});

			return (state === 'accept') ? true : false;
		}
	};

	function runTuringMachine(transitions, input, cb) {
		var tm = new TuringMachine(transitions);

		return tm.run(input, cb);
	}

	module.exports = TuringMachine;
	module.exports.run = runTuringMachine;
}());
