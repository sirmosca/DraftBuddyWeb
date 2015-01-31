var FantasyTeam = Backbone.Model.extend({
	defaults: {
		name: '',
		players: [],
	},
});

var Player = Backbone.Model.extend({
	defaults: {
		name: '',
		adp: 0,
		overall: 0,
		position: '',
		team: '',
		times_drafted: 0,
		bye: 0,
		watch: false,
		drafted: false,
		shouldShow: false,
	 },
}); 

var FantasyTeamCollection = Backbone.Collection.extend({
	model: FantasyTeam,
});

var PlayerCollection = Backbone.Collection.extend({
	model: Player,


	initialize: function(models, options) {
		this.allModels = models;
	},

	getQBs: function() {
		var qbs = this.allModels.filter(function(player) {
			return player.position == "QB";
		});
		return qbs;
	},
});

var PlayerView = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#player-template').html()),

	 events: {
		"click #watch-player" : "watchPlayer",
	    "change #fantasyTeamId": "playerDrafted"
	  },

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	watchPlayer: function() {
	},

	playerDrafted: function(a) {
		var selectedValue = $('#fantasyTeamId').val();
		var self = this;
		this.$el.addClass("player-drafted");

		fantasyTeamCollection.each(function(team) {
			var players = team.get('players');

			var foundPlayer = _.find(players, function(player) {
				return player.rank == self.model.get('rank');;
			});

			if (foundPlayer != undefined) {
				var updatedPlayers = [];

				_.each(team.get('players'), function(player) {
					if (player.rank != foundPlayer.rank) {
						updatedPlayers.push(player);
					}
				});

				team.set({
					'players': updatedPlayers,
				});
			}
		});

		var fantasyTeam = fantasyTeamCollection.find(function(team) {
			return team.get('name') == selectedValue;
		});

		this.model.set({ 
		    'players' : fantasyTeam.get('players').push(this.model.toJSON()),
		});
		this.model.set({
			'drafted': true,
		});
	},
});

var PlayerListView = Backbone.View.extend({
	el: '#mainView',

	events: {
		"click #show-qb" : "showQB",
		"click #show-drafted": "showDrafted",
	},

	initialize: function() {
		this.$playerList = $('#playerList');
		this.render();

	},

	showDrafted: function() {
		var showDrafted = $('#show-drafted').is(":checked");
		var notDrafted = playerCollection.filter(function(player) {
			if (showDrafted) {
				return !showDrafted
			}
			return !player.get('drafted');
		});
		this.renderCollection(notDrafted);
	},

	showQB: function() {
		var showQBOption = $('#show-qb').is(":checked");
		

		var qbs = playerCollection.filter(function(player) {
			var pos = player.get('position');
			if (showQBOption) {
				return pos == "QB";
			}
			return !showQBOption;
		});
		this.renderCollection(qbs);
	},

	render: function() {
		var player = this.collection.each(function(player) {
			var playerView = new PlayerView({model: player});
			this.$playerList.append(playerView.render().el);
		}, this);

		return this;
	},

	renderCollection: function(coll) {
		this.$playerList.html("");
		var player = _.each(coll, function(player) {
			var playerView = new PlayerView({model: player});
			this.$playerList.append(playerView.render().el);
		}, this);
		return this;
	}
});

var fantasyTeamCollection = new FantasyTeamCollection([
	{'name': '-- select team --', 'players': []}, //not drafted
	{'name': 'ben', 'players': []},
	{'name': 'shannon', 'players': []},
	{'name': 'mike', 'players': []},
	{'name': 'dana', 'players': []}
]);

var playerCollection = new PlayerCollection([
	{'rank': 1, 'adp': 1.01, 'overall': 1.2, 'name': "DeMarco Murray", 'position': "RB", 'team': "DAL", 'times_drafted': 84, 'bye': 11, 'watch': true, 'drafted': false, 'shouldShow': true, 'fantasyTeams': fantasyTeamCollection },
	{'rank': 2, 'adp': 1.03, 'overall': 2.7, 'name': "Peyton Manning", 'position': "QB", 'team': "DEN", 'times_drafted': 41, 'bye': 4, 'watch': true, 'drafted': false, 'shouldShow': true, 'fantasyTeams': fantasyTeamCollection},
	{'rank': 3, 'adp': 1.03, 'overall': 3.4, 'name': "Marshawn Lynch", 'position': "RB", 'team': "SEA", 'times_drafted': 19, 'bye': 4, 'watch': true, 'drafted': false, 'shouldShow': true, 'fantasyTeams': fantasyTeamCollection},
	{'rank': 4, 'adp': 1.04, 'overall': 4.1, 'name': "LeVeon Bell", 'position': "RB", 'team': "PIT", 'times_drafted': 65, 'bye': 12, 'watch': true, 'drafted': false, 'shouldShow': true, 'fantasyTeams': fantasyTeamCollection},
	{'rank': 5, 'adp': 1.05, 'overall': 4.9, 'name': "Jamaal Charles", 'position': "RB", 'team': "KC", 'times_drafted': 67, 'bye': 6, 'watch': true, 'drafted': false, 'shouldShow': true, 'fantasyTeams': fantasyTeamCollection},
	{'rank': 6, 'adp': 1.05, 'overall': 5.1, 'name': "Demaryius Thomas", 'position': "WR", 'team': "DEN", 'times_drafted': 54, 'bye': 4, 'watch': true, 'drafted': false, 'shouldShow': true, 'fantasyTeams': fantasyTeamCollection},
]);

var playerListView = new PlayerListView({ collection: playerCollection });