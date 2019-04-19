'use strict';

const esClient = require('../../lib/elasticsearch');
module.exports = function (Books) {
    Books.search = function(text) {
        return new Promise((resolve, reject)=>{
            esClient.search('book', 'bookInfo', text)
            .then(resp=>{
                resolve(resp)
            })
            .catch(err=>{
                reject(err);
            })
        })
      }
      Books.remoteMethod (
            'search',
            {
              http: {path: '/search', verb: 'get'},
              accepts: {arg: 'text', type: 'string', required: true, http: { source: 'query' } },
              returns: {arg: 'name', type: 'string'}
            }
        );
};
