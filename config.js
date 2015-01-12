Config = {};

Config.maxMinionsOnBoard = 6;

Config.maxBananas = 9;

Config.maxCardsInHand = 9;

Config.lobbyDuration = 5 * 60;

Config.maxCopiesPerCard = 4;

Config.turnDurations = [
	{
		seconds: 30,
		name: "30 seconds"
	},
	{
		seconds: 60,
		name: "1 minute"
	},
	{
		seconds: 120,
		name: "2 minutes"
	},
	{
		seconds: 5*60,
		name: "5 minutes"
	}
]

Config.minCardsInDeck = 10;
Config.maxCardsInDeck = 50;