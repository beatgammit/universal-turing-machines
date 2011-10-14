(function () {
	'use strict';

	var fs = require('fs'),
		TuringMachine = require('./tm'),
		input,
		transitions,
		usage = [
			'node tm.js <transitions-file> <input-file>'
		];

	// 2 arguments for node and program name, plus the two input files	
	if (process.argv.length !== 4) {
		console.error('Invalid number of arguments, see usage:');
		console.error(usage.join('\n'));
		process.exit(1);
	}

	transitions = fs.readFileSync(process.argv[2], 'utf8');
	input = fs.readFileSync(process.argv[3], 'utf8');

	TuringMachine.run(transitions, input);
}());
