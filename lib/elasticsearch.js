const elasticsearch = require("elasticsearch");
var elasticClient = new elasticsearch.Client({
  host: "localhost:9200"
});

module.exports = {
  // 1. Create index
  initIndex: function(indexName) {
    return new Promise((resolve, reject) => {
      elasticClient.indices
        .create({
          index: indexName
        })
        .then(function(resp) {
          console.log(resp);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // 2. Check if index exists
  indexExists: function(indexName) {
    return new Promise((resolve, reject) => {
      elasticClient.indices
        .exists({
          index: indexName
        })
        .then(function(resp) {
          resolve(resp);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  },

  // 3.  Preparing index and its mapping
  initMapping: function(indexName, docType) {
    return new Promise((resolve, reject) => {
      elasticClient.indices
        .putMapping({
          index: indexName,
          type: docType,
          include_type_name: true,
          body: {
            properties: {
              title: {
                type: "text"
                // fields: {
                //   completion: {
                //     type: "completion"
                //   },
                //   keyword: { 
                //     type: "text",
                //     analyzer: "simple"
                //   }
                // }
              }
            }
          }
        })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => reject(err));
    });
  },

  // 4. Add/Update a document
  addDocument: function(indexName, docType, payload) {
    return new Promise((resolve, reject) => {
      elasticClient
        .index({
          index: indexName,
          type: docType,
          body: payload
        })
        .then(function(resp) {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // 5. Update a document
  updateDocument: function(req, res, index, _id, docType, payload) {
    elasticClient.update(
      {
        index: index,
        type: docType,
        id: _id,
        body: payload
      },
      function(err, resp) {
        if (err) return res.json(err);
        return res.json(resp);
      }
    );
  },

  // 6. Search
  search: function(indexName, docType, payload) {
    return new Promise((resolve, reject) => {
      elasticClient
        .search({
          index: indexName,
          type: docType,
          size: 1,
          body: {
            query: {
              match: {
                title: payload
              }
            }
          }
        })
        .then(function(resp) {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // 7. AutoSuggest
  autosuggest: function(indexName, docType, payload) {
    return new Promise((resolve, reject) => {
      elasticClient
        .search({
          index: indexName,
          type: docType,
          body: {
            size: 10,
            query: {
              match_phrase_prefix: {
                title: payload
              }
            }
          }
        })
        .then(function(resp) {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  deleteDocument: function(req, res, index, _id, docType) {
    elasticClient.delete(
      {
        index: index,
        type: docType,
        id: _id
      },
      function(err, resp) {
        if (err) return res.json(err);
        return res.json(resp);
      }
    );
  },

  deleteAll: function(req, res) {
    elasticClient.indices.delete(
      {
        index: "_all"
      },
      function(err, resp) {
        if (err) {
          console.error(err.message);
        } else {
          console.log("Indexes have been deleted!", resp);
          return res.json(resp);
        }
      }
    );
  }
};
