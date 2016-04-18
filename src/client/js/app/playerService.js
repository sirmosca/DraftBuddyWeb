function PlayerService ($http, $q) {
	var service = {};
	

	service.getAllPlayers = function getAllPlayers() {
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

	service.draftPlayer = function draftPlayer(player) {
		var def = $q.defer();

		$http.post("{{tokens.playersApi}}")
			.success(function(data) {
			})
			.error(function() {
				def.reject("Failed to draft player");
			});
		return def.promise;
	};
    
    return service;
}
