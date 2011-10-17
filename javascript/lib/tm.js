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

			this.input = input.match(/^\s*(.*)\s*$/)[1].split(',');

			// new Tape with copy of input
			this.tape = new Tape(this.input.slice(0));

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
		},
		get Γ() {
			var Γ = [undefined];

			Object.keys(this.states).forEach(function (state) {
				this.states[state].transitions.forEach(function (transition) {
					if (Γ.indexOf(transition.output) === -1 && transition.input !== '*') {
						Γ.push(transition.output);
					}
				}, this);
			}, this);

			this.Σ.forEach(function(symbol) {
				if (Γ.indexOf(symbol) === -1) {
					Γ.push(symbol);
				}
			});

			return Γ;
		},
		get Σ() {
			var Σ = [];

			Object.keys(this.states).forEach(function (state) {
				this.states[state].transitions.forEach(function (transition) {
					// only count input characters
					if (Σ.indexOf(transition.input) === -1 && transition.input !== '*') {
						Σ.push(transition.input);
					}
				});
			}, this);

			return Σ;
		},
		verify: function () {
		}
	};

	function runTuringMachine(transitions, input, cb) {
		var tm = new TuringMachine(transitions);

		return tm.run(input, cb);
	}

	module.exports = TuringMachine;
	module.exports.run = runTuringMachine;
}());
