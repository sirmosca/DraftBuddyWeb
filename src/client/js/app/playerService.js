function PlayerService ($http, $q) {
	var service = {
		players: [],
		getAllPlayers: getAllPlayers
	};
	return service;

	function getAllPlayers() {
		var def = $q.defer();

		$http.get("{{tokens.playersApi}}")
			.success(function(data) {
				service.players = data;
				def.resolve(data);
			})
			.error(function() {
				def.reject("Failed to get players");
			});
		return def.promise;
	}
}
