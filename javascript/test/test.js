(function () {
	'use strict';

	var TuringMachine = require('../lib/tm'),
		checks = [
			{
				input: ['a', 'b', 'c'].join(','),
				transitions: [
					'start,a,a,R,start',
					'start,b,b,R,start',
					'start,c,c,R,accept'
				].join('\n'),
				accept: true,
				name: 'simple'
			},
			{
				input: ['a', 'b', 'c'].join(','),
				transitions: [
					'start,a,a,R,start',
					'start,b,b,R,start',
					'start,*,*,R,accept'
				].join('\n'),
				accept: true,
				name: 'simple-wildcard'
			}
		];
	
	checks.forEach(function (check) {
		var tm = new TuringMachine(check.transitions);
		console.log('Γ:', tm.Γ);
		tm.run(check.input);
		console.log('Σ:', tm.Σ);

		TuringMachine.run(check.transitions, check.input, function (obj) {
			console.log('Test:', check.name, (obj.accept === check.accept) ? 'PASSED' : 'FAILED');

			if (!obj.accept) {
				console.log(check.name + ' test output:');
				console.log(JSON.stringify(obj, null, '  '));

				console.log();
			}
		});
	});
}());
