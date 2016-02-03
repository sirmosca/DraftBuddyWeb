function PlayerController(playerService, teamService) {
	var self = this;
	self.showDrafted = true;
	self.showWatch = false;
	self.searchText = "";
	self.positions = [];
	self.selectedPositions = [];
	self.players = [];
	self.teams = [];

	self.getAllPlayers = function() {
		playerService.getAllPlayers().then(function(players) {
			self.players = players;
			for (var i=0; i < self.players.length; i++) {
				self.players[i].watch = false;
			}
		}, function(response) {
			console.log("error getting playres");
		});	
	};

    self.getAllPositions = function(ary) {
        teamService.getAllPositions().then(function(positions) {
            ary =  positions;
        }, function(response) {
                console.log("error getting positions")
        });
    };

    self.getAllTeams = function() {
        teamService.getAllTeams().then(function(teams) {
            self.teams = teams;
        }, function(response) {
            console.log("error getting teams");
        });
    };

	self.draftPlayer = function(fantasyTeam, player) {
		playerService.draftPlayer(player);
	};

    self.getAllPositions(self.positions);
    self.getAllPositions(self.selectedPositions);
    self.getAllTeams();
	self.getAllPlayers();
}

angular.extend(PlayerController.prototype, {
	draft: function(fantasyTeam, player) {
		player.fantasyTeam = fantasyTeam;
		player.drafted = fantasyTeam !== null;
	},

	getPlayersForTeam: function(fantasyTeam) {
		if (fantasyTeam == null) return;
		var p = this.players.filter(function (player) {
			return player.fantasyTeam && player.fantasyTeam.name === fantasyTeam.name;
		});

		return p;
	},

	showPlayer: function(player) {
		var showDrafted = (player.drafted === this.showDrafted || !player.drafted);		
		var gonnaWatch = this.showWatch ? (player.watch === this.showWatch) : true;
		var viewingPosition = this.selectedPositions.indexOf(player.Position) > -1;
		var searchMatch =  player.Name.toLowerCase().search(this.searchText.toLowerCase()) > -1;

		return (showDrafted && gonnaWatch && viewingPosition && searchMatch);
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
