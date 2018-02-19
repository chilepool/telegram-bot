'use strict';

const Telegram = require('telegram-node-bot');
const lukaStatsFetcher = require('../fetchers/LukaStatsFetcher');

class LukaNetworkController extends Telegram.TelegramBaseController {

    get routes() {
        return {
            'getLukaStats': 'getLukaStats',
            'getHelp': 'getHelp'
        };
    }    

    getHelp($) {
        return $.sendMessage('[ChilePool](http://www.chilepool.cl) Bot v0.0.1\n[GitHub](https://github.com/chilepool/telegram-bot)', { parse_mode: 'Markdown' });
    }
    
    getLukaStats($) {
        lukaStatsFetcher.getStats().then((message) => { 
            return $.sendMessage(message, { parse_mode: 'Markdown' });
        }, (error) => {
            console.log(error);
        });
    }
}

module.exports = LukaNetworkController;
