'use strict';

const Telegram = require('telegram-node-bot');

class OtherwiseController extends Telegram.TelegramBaseController {
    handle($) {
        console.log($.message.text);
    }
}

module.exports = OtherwiseController;
