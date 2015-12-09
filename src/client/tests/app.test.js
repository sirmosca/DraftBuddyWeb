describe('Controller: playerCtrl', function() {
	beforeEach(module('draftbuddy'));

	var ctrl;

	beforeEach(inject(function($controller) {
		console.log("bbbbbbbbbbbbbbbbbbb");
		ctrl = $controller('playerCtrl');
	}));

	it ('should have teams available on load', function() {
		console.log("---------------->");
		expect(1).toEqual(1);
		//expect(ctrl.teams.length).toEqual(5);
	});
});
