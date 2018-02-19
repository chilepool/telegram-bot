'use strict';

const request = require('request');
const numeral = require('numeral');

class LukaStatsFetcher {

    getStats(){
        console.log('Getting the stats for LuKa...');
        return new Promise((resolve, reject) => {
            request('http://tu.url/stats', (error, response, body) => {
                console.log('Error: ' + error);
                console.log('Status: ' + response.statusCode);
                if (!error && response.statusCode == 200){
                    var obj = JSON.parse(body);
                    console.log(obj.network);
                    var message = this.formatMessage(obj.network);
                    resolve(message);
                } else {
                    console.log('Something went wrong!');
                    reject(error);
                }
            });
        });
    }

    formatMessage(network){
        var diffEmoji = '\u2600';
        if (network.difficulty > 300000000 && network.difficulty <= 400000000) diffEmoji = '\u26C5';
        else if (network.difficulty > 400000000 && network.difficulty <= 500000000) diffEmoji = '\u26C8';
        else if (network.difficulty > 500000000) diffEmoji = '\u{1F480}';
        var message =   '*Estadísticas de LuKa*\n' +
                        'Hash Rate: ' + numeral((network.difficulty/90)/1000000).format('0.00') + 'MH/sec \u{1F682}\n' +
                        'Dificultad: ' + numeral(network.difficulty/1000000).format('0') + 'M ' + diffEmoji + '\n' +
                        'Altura: ' + numeral(network.height).format('0,0') + ' \u23EB\n' +
                        'Recompensa: ' +  numeral(network.reward/100000000).format('0,0.0000') + ' LUK \u{1F4B0}\n' +
                        'Hash: [' + network.hash.toString().substring(0,12) + '...](http://www.chilepool.cl/luka-explorer/?hash=' + network.hash + '#blockchain_block';
        return message;
    }
}

module.exports = new LukaStatsFetcher();
