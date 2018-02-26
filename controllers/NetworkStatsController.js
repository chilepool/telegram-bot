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
            'getHelp': 'getHelp'
        };
    }    

     getHelp($) {
        var help =  '\u{1F310} [ChilePool](http://www.chilepool.cl) Bot v0.0.1\n' +
                    '\u{1F913} [GitHub](https://github.com/chilepool/telegram-bot)\n\n' +
                    '/luka Estadistica de *LUKA*\n'+
                    '/ento Estadistica de *ENTO*\n'+
                    '/prosus Estadistica de *PROSUS*\n'+
                    '/chaucha Estadistica de *CHAUCHA*\n';         
        return $.sendMessage(help, { parse_mode: 'Markdown' });
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
