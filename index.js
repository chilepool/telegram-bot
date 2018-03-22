'use strict';

const Telegram = require('telegram-node-bot'),
    tg = new Telegram.Telegram('YOUR_KEY', {
        webAdmin: {
            port: 7777,
            host: 'localhost'
        },
        workers: 1
    });

const   NetworkStatsController = require('./controllers/NetworkStatsController'),
        OtherwiseController    = require('./controllers/OtherwiseController');

const networkStatsController = new NetworkStatsController();
const otherwiseController = new OtherwiseController();

tg.router.when(new Telegram.TextCommand('/luka',    'getLukaStats'),    networkStatsController)
         .when(new Telegram.TextCommand('/prosus',  'getProsusStats'),  networkStatsController)
         .when(new Telegram.TextCommand('/chaucha', 'getChauchaStats'), networkStatsController)
         .when(new Telegram.TextCommand('/bitcheke','getBitchekeStats'),networkStatsController)
         .when(new Telegram.TextCommand('/profit',  'getProfits'),      networkStatsController)
         .when(new Telegram.TextCommand('/price',   'getPrice'),        networkStatsController)
         .when(new Telegram.TextCommand('/help',    'getHelp'),         networkStatsController)
         .otherwise(otherwiseController);

function exitHandler(exitCode) {
    process.exit(exitCode);
}

process.on('SIGINT', exitHandler.bind(null, 0));
process.on('uncaughtException', exitHandler.bind(null, 1));
