(function(){

var app = angular.module("twitchTvApp", ["ngAnimate"]);

var userController = app.controller("UserController", [ "$http", function( $http ){

	var usersObj = this;
	var usersList = ["FreeCodeCamp", "Storbeck", "terakilobyte", "Habathcx","RobotCaleb", "MedryBW", "ThomasBallinger","noobs2ninjas","Beohoff", "Justin", "syndicate",
					 "riotgames", "captainsparklez", "LIRIK", "PhantomL0rd", "brunofin"];

	for ( var i = 0; i < usersList.length; i++ )
	{
		(function (i){

			$http.get("https://api.twitch.tv/kraken/streams/" + usersList[i]).success(function(userData){

				if ( !usersObj.users )
					usersObj.users = [];

				$http.get("https://api.twitch.tv/kraken/channels/" + usersList[i]).success(function(channelData){

					userData.channels = channelData;

				});

				userData.name = usersList[i];
				usersObj.users.push(userData);

			}).error(function(userData){
				userData.name = usersList[i];
				usersObj.users.push(userData);
			});

		})(i)
	}

}]);

})();