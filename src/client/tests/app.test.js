describe('Controller: playerCtrl', function() {
    var $scope, $q, def, playerCtrl;

	beforeEach(module('draftbuddy'));

    beforeEach(inject(function($controller, _$rootScope_, _$q_, playerService, teamService) {
        $q = _$q_;
        $scope = _$rootScope_.$new();
        
        // We use the $q service to create a mock instance of defer
        def = _$q_.defer();

        // Use a Jasmine Spy to return the deferred promise
        spyOn(playerService, 'getAllPlayers').and.returnValue(def.promise);

        // Init the controller, passing our spy service instance
        playerCtrl = $controller('playerCtrl', { 
            $scope: $scope, 
            playerService: playerService,
            teamService: teamService
        });
    }));

	it ('should have players available on load', function() {
	    def.resolve([{"Name":"Jordy Nelson", "ADP":"2.07", "Overall":"17.0", "Team":"GB", "Position":"WR", "Bye":"9", "Times Drafted":"464"}]);
        expect(playerCtrl.players.length).toEqual(1);
	});
});


