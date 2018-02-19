'use strict';

const Telegram = require('telegram-node-bot'),
    tg = new Telegram.Telegram('YOUR_KEY', {
        workers: 1
    });

const   LukaNetworkController = require('./controllers/LukaNetworkController'),
        OtherwiseController = require('./controllers/OtherwiseController');

const lukaNetworkController = new LukaNetworkController();
const otherwiseController = new OtherwiseController();

tg.router.when(new Telegram.TextCommand('/luka', 'getLukaStats'), lukaNetworkController)
        .when(new Telegram.TextCommand('/help', 'getHelp'), lukaNetworkController)
	.otherwise(otherwiseController);

function exitHandler(exitCode) {
    process.exit(exitCode);
}

process.on('SIGINT', exitHandler.bind(null, 0));
process.on('uncaughtException', exitHandler.bind(null, 1));
