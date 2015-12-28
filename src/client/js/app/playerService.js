function PlayerService ($http, $q) {
	var service = {
		players: [],
		getAllPlayers: getAllPlayers,
		draftPlayer: draftPlayer
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
	};

	function draftPlayer(player) {
		var def = $q.defer();

		$http.post("{{tokens.playersApi}}")
			.success(function(data) {
			})
			.error(function() {
				def.reject("Failed to draft player");
			});
		return def.promise;
	};
}
