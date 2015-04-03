var app = angular.module('draftbuddy', []);

function PlayerController(playerService) {
	this.showDrafted = true;
	this.showWatch = false;
	this.searchText = "";
	this.positions = ['QB', 'RB', 'WR', 'DEF', 'K', 'TE'];
	this.selectedPositions = ['QB', 'RB', 'WR', 'DEF', 'K', 'TE'];
	this.players = playerService.getAllPlayers();;
	this.teams = [
		{'name':"adamo", 'players': []}, 
		{'name':"ben", 'players': []}, 
		{'name':"luke", 'players': []}, 
		{'name':"mike", 'players': []}, 
		{'name':"shannon", 'players': []}
	];
}

angular.extend(PlayerController.prototype, {
	draft: function(fantasyTeam, player) {
		console.log(this.teams);
		for (var i=0; i < this.teams.length; i++) {
			var team = this.teams[i];
			team.players = team.players.filter(function(teamPlayer) {
				return teamPlayer.Rank != player.Rank;
			});
		}

		if (fantasyTeam === null) {
			player.drafted = false;
			return;
		}

		player.drafted = true;
		fantasyTeam.players.push(player);
	},

	shouldShowDraftedPlayer: function(player) {
		var showDrafted = (player.drafted === this.showDrafted || !player.drafted);		
		var showWatch = (player.Watch === this.showWatch) || player.Watch;
		var viewingPosition = this.selectedPositions.indexOf(player.Position) > -1;
		var searchMatch =  player.Name.toLowerCase().search(this.searchText.toLowerCase()) > -1;

		return (showDrafted && showWatch && viewingPosition && searchMatch);
	},

	contains: function(items, searchItem) {
		for (var i=0; i < items.length; i++) {
			if (items[i] === searchItem) {
				return true;
			}
		}

		return false;
	},

	showPosition: function(position) {
		var positionFound = this.contains(this.selectedPositions, position);

		if (positionFound) {
			this.selectedPositions = this.selectedPositions.filter(function(selectedPosition) {
				return selectedPosition != position;
			});
		}
		else {
			this.selectedPositions.push(position);
		}
	},
});

app.controller('playerCtrl', PlayerController);

app.factory("playerService", function($http, $q) {
	return({
		getAllPlayers: getAllPlayers,
	});

	function getAllPlayers() {
		//var request = $http({
		//	method: "get",
		//	url: "http://localhost:8080/players"
		//});

		var data = [
			{'Rank': 1, 'ADP': 1.01, 'Overall': 1.2, 'Name': "DeMarco Murray", 'Position': "RB", 'Team': "DAL", 'Times Drafted': 84, 'Bye': 11, 'Watch': false, 'drafted': false},
			{'Rank': 2, 'ADP': 1.03, 'Overall': 2.7, 'Name': "Peyton Manning", 'Position': "QB", 'Team': "DEN", 'Times Drafted': 41, 'Bye': 4, 'Watch': false, 'drafted': false},
			{'Rank': 3, 'ADP': 1.03, 'Overall': 3.4, 'Name': "Marshawn Lynch", 'Position': "RB", 'Team': "SEA", 'Times Drafted': 19, 'Bye': 4, 'Watch': false, 'drafted': false},
			{'Rank': 4, 'ADP': 1.04, 'Overall': 4.1, 'Name': "LeVeon Bell", 'Position': "RB", 'Team': "PIT", 'Times Drafted': 65, 'Bye': 12, 'Watch': false, 'drafted': false},
			{'Rank': 5, 'ADP': 1.05, 'Overall': 4.9, 'Name': "Jamaal Charles", 'Position': "RB", 'Team': "KC", 'Times Drafted': 67, 'Bye': 6, 'Watch': false, 'drafted': false},
			{'Rank': 6, 'ADP': 1.05, 'Overall': 5.1, 'Name': "Demaryius Thomas", 'Position': "WR", 'Team': "DEN", 'Times Drafted': 54, 'Bye': 4, 'Watch': false, 'drafted': false},
		];
		return data;
		//return (request.then(handleSuccess, handleError));
	}

	// I transform the error response, unwrapping the application dta from
	// the API response payload.
    function handleError( response ) {
		// The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (! angular.isObject( response.data ) ||
            ! response.data.message) {

            return( $q.reject( "An unknown error occurred." ) );
        }

        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }


    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess( response ) {
        return( response.data );
    }
});