'use strict';

const Telegram = require('telegram-node-bot');
const statsFetcher = require('../fetchers/StatsFetcher');

class NetworkStatsController extends Telegram.TelegramBaseController {

    get routes() {
        return {
            'getLukaStats': 'getLukaStats',
            'getEntoStats': 'getEntoStats',
            'getProsusStats': 'getProsusStats', 
            'getChauchaStats': 'getChauchaStats', 
            'getBitchekeStats': 'getBitchekeStats', 
            'getHelp': 'getHelp'
        };
    }    

     getHelp($) {
        var help =  '\u{1F310} [ChilePool](http://www.chilepool.cl) Bot v0.0.1\n' +
                    '\u{1F913} [GitHub](https://github.com/chilepool/telegram-bot)\n\n' +
                    '/luka Estadistica de *LUKA*\n'+
                    '/ento Estadistica de *ENTO*\n'+
                    '/prosus Estadistica de *PROSUS*\n'+
                    '/chaucha Estadistica de *CHAUCHA*\n\n' + 
                    '*Donaciones en LUK al equipo de ChilePool.cl* \n LJMZ5DGJktTbBYH8a3NMwxD4NUd34257HHbrt2eZZfiZCAG7vLd7MVM83oxuW4uURM7zZkzJyxarNbXmuQMEBV89PEJN7A2';
        return $.sendMessage(help, { parse_mode: 'Markdown' });
    }

    getBitchekeStats($) {
        var stats =  '\u{1F4A9}\u{1F4A9}\u{1F4A9}\u{1F4A9}\u{1F4A9}';         
        return $.sendMessage(stats, { parse_mode: 'Markdown' });
    }
    
    //TODO: To be refactored so we can use a single call with arguments for each coin
    getLukaStats($) {
        statsFetcher.getLukaStats().then((message) => { 
            return $.sendMessage(message, { parse_mode: 'Markdown' });
        }, (error) => {
            console.log(error);
        });
    }

    //TODO: To be refactored so we can use a single call with arguments for each coin
    getEntoStats($) {
        statsFetcher.getEntoStats().then((message) => { 
            return $.sendMessage(message, { parse_mode: 'Markdown' });
        }, (error) => {
            console.log(error);
        });
    }

    //TODO: To be refactored so we can use a single call with arguments for each coin
    getProsusStats($) {
        statsFetcher.getProsusStats().then((message) => { 
            return $.sendMessage(message, { parse_mode: 'Markdown' });
        }, (error) => {
            console.log(error);
        });
    }
    
    //TODO: To be refactored so we can use a single call with arguments for each coin
    getChauchaStats($) {
        statsFetcher.getChauchaStats().then((message) => { 
            return $.sendMessage(message, { parse_mode: 'Markdown' });
        }, (error) => {
            console.log(error);
        });
    }    
}

module.exports = NetworkStatsController;
