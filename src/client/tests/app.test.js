describe('Controller: playerCtrl', function() {
	beforeEach(module('draftbuddy'));

	var ctrl;

	beforeEach(inject(function($controller) {
		ctrl = $controller('playerCtrl');
	}));

	it ('should have teams available on load', function() {
		expect(ctrl.teams.length).toEqual(5);
	});
});
