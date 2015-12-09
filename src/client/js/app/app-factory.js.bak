app.factory("playerService", function($http, $q) {
	var service = {
		players: [],
		getAllPlayers: getAllPlayers
	};
	return service;

	function getAllPlayers() {
		var def = $q.defer();

		$http.get("http://192.168.0.102/players")
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
