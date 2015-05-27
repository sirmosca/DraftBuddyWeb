var app = angular.module('draftbuddy', []);

function PlayerController(playerService) {
	$(function() {
	  $('[data-toggle="popover"]').popover()
	})

	var self = this;
	self.showDrafted = true;
	self.showWatch = false;
	self.searchText = "";
	self.positions = ['QB', 'RB', 'WR', 'DEF', 'PK', 'TE'];
	self.selectedPositions = ['QB', 'RB', 'WR', 'DEF', 'PK', 'TE'];
	self.players = [];

	self.teams = [
		{'name':"adamo", 'players': []}, 
		{'name':"ben", 'players': []}, 
		{'name':"luke", 'players': []}, 
		{'name':"mike", 'players': []}, 
		{'name':"shannon", 'players': []}
	];

	self.getAllPlayers = function() {
		playerService.getAllPlayers().then(function(players) {
			self.players = players;
			for (var i=0; i < self.players.length; i++) {
				self.players[i].watch = true;
			}
		}, function(response) {
			console.log("error getting playres");
		});	
	}

	self.getAllPlayers();
}

angular.extend(PlayerController.prototype, {
	draft: function(fantasyTeam, player) {
		player.fantasyTeam = fantasyTeam;
		player.drafted = fantasyTeam !== null;
	},

	showFantasyTeamPlayers: function(fantasyTeam) {
		if (fantasyTeam === undefined) return;

		var p = this.players.filter(function (player) {
			return player.fantasyTeam === fantasyTeam;
		});

		var teamPlayers = "";
		for (var i=0; i < p.length; i++) {
			teamPlayers = teamPlayers + p[i].Name + "\n";
		}

 		return teamPlayers;
	},

	showPlayer: function(player) {
		var showDrafted = (player.drafted === this.showDrafted || !player.drafted);		
		var showWatch = (player.watch === this.showWatch) || player.watch;
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
	var service = {
		players: [],
		getAllPlayers: getAllPlayers
	};
	return service;

	function getAllPlayers() {
		var def = $q.defer();

		$http.get("http://192.168.0.102/test")
			.success(function(data) {
				service.players = data;
				def.resolve(data);
			})
			.error(function() {
				def.reject("Failed to get players");
			});
		return def.promise;
	}
});