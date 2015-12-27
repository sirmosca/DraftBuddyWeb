function TeamService ($http, $q) {
	var service = {
		teams: [],
		positions: [],
		getAllTeams: getAllTeams,
	};
	return service;

	function getAllTeams() {
		var def = $q.defer();

		$http.get("{{tokens.playersApi}}")
			.success(function(data) {
				service.teams = data;
				def.resolve(data);
			})
			.error(function() {
				def.reject("Failed to get all teams");
			});
		return def.promise;
	},

	function getAllPositions() {
		var def = $q.defer();

		$http.get("{{tokens.playersApi}}")
			.success(function(data) {
				service.positions = data;
				def.resolve(data);
			})
			.error(function() {
				def.reject("Failed to get all positions");
			});
	}
}
