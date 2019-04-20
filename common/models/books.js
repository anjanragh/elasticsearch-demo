'use strict';

const esClient = require('../../lib/elasticsearch');
module.exports = function (Books) {
    Books.suggest = function (text, cb) {
        return new Promise((resolve, reject) => {
            esClient.autosuggest('book', 'bookInfo', text)
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
    Books.remoteMethod(
        'suggest',
        {
            http: { path: '/suggest', verb: 'get' },
            accepts: { arg: 'text', type: 'string', required: true, http: { source: 'query' } },
            returns: { arg: 'text', type: 'array' }
        }
    );

    Books.search = function (title) {
        return new Promise((resolve, reject) => {
            esClient.search('book', 'bookInfo', title)
                .then(resp => {
                    console.log(resp);
                    resolve(resp);
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    Books.remoteMethod(
        'search',
        {
            http: { path: '/search', verb: 'get' },
            accepts: { arg: 'title', type: 'string', required: true, http: { source: 'query' } },
            returns: { arg: 'name', type: 'string' }
        }
    );

};
