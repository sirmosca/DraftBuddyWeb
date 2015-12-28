var app = angular.module('draftbuddy', ['ui.bootstrap']);
app.controller('playerCtrl', PlayerController);
app.factory('playerService', PlayerService);
app.factory('teamService', TeamService);
