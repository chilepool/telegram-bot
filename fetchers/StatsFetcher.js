'use strict';

const request = require('request');
const numeral = require('numeral');

class StatsFetcher {

    //TODO: we could just have one call with multiple arguments
    getLukaStats(){
        console.log('Getting the stats for LuKa...');
        return new Promise((resolve, reject) => {
            request('http://luka.chilepool.cl:8117/stats', (error, response, body) => {
                console.log('Error: ' + error);
                console.log('Status: ' + response.statusCode);
                if (!error && response.statusCode == 200){
                    var obj = JSON.parse(body);
                    console.log(obj.network);
                    var message = this.formatMessage(obj.network, obj.config, 'Luka', 1);
                    resolve(message);
                } else {
                    console.log('Something went wrong!');
                    reject(error);
                }
            });
        });
    }

    getEntoStats(){
        console.log('Getting the stats for Ento...');
        return new Promise((resolve, reject) => {
            request('http://178.32.129.122:8117/stats', (error, response, body) => {
                console.log('Error: ' + error);
                console.log('Status: ' + response.statusCode);
                if (!error && response.statusCode == 200){
                    var obj = JSON.parse(body);
                    console.log(obj.network);
                    var message = this.formatMessage(obj.network, obj.config, 'Ento', 0);
                    resolve(message);
                } else {
                    console.log('Something went wrong!');
                    reject(error);
                }
            });
        });
    }

    getProsusStats(){
        console.log('Getting the stats for Prosus...');
        return new Promise((resolve, reject) => {
            request('http://prosus1.bericul.com:8117/stats', (error, response, body) => {
                console.log('Error: ' + error);
                console.log('Status: ' + response.statusCode);
                if (!error && response.statusCode == 200){
                    var obj = JSON.parse(body);
                    console.log(obj.network);
                    var message = this.formatMessage(obj.network,obj.config, 'Prosus', 0);
                    resolve(message);
                } else {
                    console.log('Something went wrong!');
                    reject(error);
                }
            });
        });
    }

    //TODO: This could be a separated utility?
    formatMessage(network,config,  moneda, hash){
        var diffEmoji = '\u2600';

        var divisorHR = 1000000; //Por defecto pasara a MH
        var unidadHR  = 'M';

        if((network.difficulty/config.coinDifficultyTarget)<1000000){
            divisorHR = 1000;
            unidadHR = 'K';
        }

        //TODO: Are all these difficulties the same for every coin?
        if (network.difficulty > 300000000 && network.difficulty <= 400000000) diffEmoji = '\u26C5';
        else if (network.difficulty > 400000000 && network.difficulty <= 500000000) diffEmoji = '\u26C8';
        else if (network.difficulty > 500000000) diffEmoji = '\u{1F480}';

        var message =   '*Estadísticas de '+ moneda +'*\n' +
                        'Hash Rate: ' + numeral((network.difficulty/config.coinDifficultyTarget)/divisorHR).format('0.00') + unidadHR+'H/sec \u{1F682}\n' +
                        'Dificultad: ' + numeral(network.difficulty/1000000).format('0.00') + 'M ' + diffEmoji + '\n' +
                        'Altura: ' + numeral(network.height).format('0,0') + ' \u23EB\n' +
                        'Recompensa: ' +  numeral(network.reward/100000000).format('0,0.0000') + ' ' + config.symbol + ' \u{1F4B0}\n' 

        if(hash==1)
                message = message + 'Hash: [' + network.hash.toString().substring(0,12) + '...](http://www.chilepool.cl/luka-explorer/?hash=' + network.hash + '#blockchain_block';
            
        return message;
    }
}

module.exports = new StatsFetcher();
