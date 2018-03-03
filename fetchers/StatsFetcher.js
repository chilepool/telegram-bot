'use strict';

const request = require('request');
const numeral = require('numeral');

class StatsFetcher {

    //TODO: we could just have one call with multiple arguments?
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
    
    getChauchaStats(){
        console.log('Getting the stats for Chaucha...');
        return new Promise((resolve, reject) => {
            request('http://artesa.chaucha.cl/public/index.php?page=api&action=getdashboarddata&api_key=4905446471ace8eb2c8daf839e337f8d8951b63453cc77c054368aea21a3d114&id=57', (error, response, body) => {
                console.log('Error: ' + error);
                console.log('Status: ' + response.statusCode);
                if (!error && response.statusCode == 200){
                    var obj = JSON.parse(body);
                    console.log(obj.getdashboarddata.data.network);
                    var message = this.formatMessage(obj.getdashboarddata.data.network, null, 'Chaucha', 0);
                    resolve(message);
                } else {
                    console.log('Something went wrong!');
                    reject(error);
                }
            });
        });
    }

    //TODO: This could be a separated utility?
    formatMessage(network, config, moneda, hash){
        var diffEmoji = '\u2600';

        var divisorHR = 1000000; //Por defecto pasara a MH
        var unidadHR  = 'M';
        if(moneda != 'Chaucha'){
            if((network.difficulty/config.coinDifficultyTarget)<1000000){
                divisorHR = 1000;
                unidadHR = 'K';
            }
        }

        //TODO: Are all these difficulties the same for every coin?
        if (network.difficulty > 300000000 && network.difficulty <= 400000000) diffEmoji = '\u26C5';
        else if (network.difficulty > 400000000 && network.difficulty <= 500000000) diffEmoji = '\u26C8';
        else if (network.difficulty > 500000000) diffEmoji = '\u{1F480}';

        var message = '';
        
        if(moneda=='Chaucha'){
            message =   '*Estadísticas de '+ moneda +'*\n' +
                        'Hash Rate: ' + numeral(network.hashrate).format('0.00') + 'GH/sec \u{1F682}\n' +
                        'Dificultad: ' + numeral(network.difficulty).format('0.00') + 'K ' + diffEmoji + '\n' +
                        'Altura: ' + numeral(network.block).format('0,0') + ' \u23EB\n'+
                        'Recompensa: ' +  numeral(network.esttimeperblock).format('0,0.0000') + ' ' + 'CHA' + ' \u{1F4B0}\n';
        }else{
            message =   '*Estadísticas de '+ moneda +'*\n' +
                        'Hash Rate: ' + numeral((network.difficulty/config.coinDifficultyTarget)/divisorHR).format('0.00') + unidadHR+'H/sec \u{1F682}\n' +
                        'Dificultad: ' + numeral(network.difficulty/1000000).format('0.00') + 'M ' + diffEmoji + '\n' +
                        'Altura: ' + numeral(network.height).format('0,0') + ' \u23EB\n'+
                        'Recompensa: ' +  numeral(network.reward/100000000).format('0,0.0000') + ' ' + config.symbol + ' \u{1F4B0}\n';            
        }

       if(hash==1)
           message = message + 'Hash: [' + network.hash.toString().substring(0,12) + '...](http://www.chilepool.cl/luka-explorer/?hash=' + network.hash + '#blockchain_block';
            
        return message;
    }

    getLukaProfits(args){
        var hr  = args[2];
        var units = args[3];
        var exp = -1;

        if (isNaN(hr)) {
            return new Promise((resolve, reject) => {
                reject('Wrong number format: ' + hr);
            });
        }

        if(units === 'H') {
            exp = 0;
        } else if(units === 'KH') {
            exp = 1;
        } else if(units === 'MH') {
            exp = 2;
        } else {
            return new Promise((resolve, reject) => { 
                reject('Wrong hashrate unit: ' + units);
            });
        }

        console.log('Getting the stats for LuKa...');
        return new Promise((resolve, reject) => {
            request('http://luka.chilepool.cl:8117/stats', (error, response, body) => {
                console.log('Error: ' + error); 
                console.log('Status: ' + response.statusCode);
                if (!error && response.statusCode == 200){
                    var obj = JSON.parse(body);
                    var rateUnit = Math.pow(1024,parseInt(exp));
                    var hashRate = parseFloat(hr) * rateUnit;
                    var profit = (hashRate * 86400 / obj.network.difficulty) * obj.network.reward;
                    var message = '';
                    if(profit) {
                        message = 'Profit estimado: *'+  numeral(profit/100000000).format('0.00') +'* LUK/dia';
                    }
                    resolve(message);
                } else {
                    console.log('Something went wrong!');
                    reject(error);
                }
            });
        });
    }
}

module.exports = new StatsFetcher();
