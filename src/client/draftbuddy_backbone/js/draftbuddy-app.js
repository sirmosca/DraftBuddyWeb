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
});

var PlayerView = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#player-template').html()),

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
});

var PlayerListView = Backbone.View.extend({
	el: '#playerSection',

	initialize: function() {
		this.$playerList = $('#playerList');
		this.render();
	},

	render: function() {
		var player = this.collection.each(function(player) {
			var playerView = new PlayerView({model: player});
			this.$playerList.append(playerView.render().el);
		}, this);

		return this;
	}
});

var fantasyTeamCollection = new FantasyTeamCollection([
	{'name': '-- select team --'}, //not drafted
	{'name': 'ben'},
	{'name': 'shannon'},
	{'name': 'mike'},
	{'name': 'dana'}
]);

var playerCollection = new PlayerCollection([
	{'adp': 1.01, 'overall': 1.2, 'name': "DeMarco Murray", 'position': "RB", 'team': "DAL", 'times_drafted': 84, 'bye': 11, 'watch': true, 'drafted': false, 'shouldShow': true, 'fantasyTeams': fantasyTeamCollection },
	{'adp': 1.03, 'overall': 2.7, 'name': "Peyton Manning", 'position': "QB", 'team': "DEN", 'times_drafted': 41, 'bye': 4, 'watch': true, 'drafted': false, 'shouldShow': true, 'fantasyTeams': fantasyTeamCollection},
	{'adp': 1.03, 'overall': 3.4, 'name': "Marshawn Lynch", 'position': "RB", 'team': "SEA", 'times_drafted': 19, 'bye': 4, 'watch': true, 'drafted': false, 'shouldShow': true, 'fantasyTeams': fantasyTeamCollection},
	{'adp': 1.04, 'overall': 4.1, 'name': "LeVeon Bell", 'position': "RB", 'team': "PIT", 'times_drafted': 65, 'bye': 12, 'watch': true, 'drafted': false, 'shouldShow': true, 'fantasyTeams': fantasyTeamCollection},
	{'adp': 1.05, 'overall': 4.9, 'name': "Jamaal Charles", 'position': "RB", 'team': "KC", 'times_drafted': 67, 'bye': 6, 'watch': true, 'drafted': false, 'shouldShow': true, 'fantasyTeams': fantasyTeamCollection},
	{'adp': 1.05, 'overall': 5.1, 'name': "Demaryius Thomas", 'position': "WR", 'team': "DEN", 'times_drafted': 54, 'bye': 4, 'watch': true, 'drafted': false, 'shouldShow': true, 'fantasyTeams': fantasyTeamCollection},
]);

var playerListView = new PlayerListView({ collection: playerCollection });