'use strict';

const esClient = require('../../lib/elasticsearch');

module.exports = function(app) {
    esClient.indexExists('book')
    .then(resp=>{
        return esClient.initIndex('book')
        return resp
    })
    .then(resp=>{
        // return esClient.initSetting('book')
        return resp 
    })
    .catch(err=>{
        return;
    })
    .then(resp=>{
        return esClient.initMapping('book', 'bookInfo')
    })
    .catch(err=>{
        console.log("there is an error");
        console.log(err);
    }) 
}; 