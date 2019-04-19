'use strict'

const csv = require('csv-parser');
const fs = require('fs');
const esClient = require('./elasticsearch');
const async = require('async');
var list = []
var errList = [];
fs.createReadStream('./data/books.csv')
    .pipe(csv())
    .on('data', (row) => {
        let insertIntoElastic = {
            bookId: row.book_id,
            isbn: row.isbn,
            author: row.authors,
            title: row.original_title,
            publicationYear: row.original_publication_year
        };

        esClient.addDocument('book', 'bookInfo', insertIntoElastic)
        .catch((err)=>{
            console.log("Error!!")
            console.log(err);
            errList.push(err)
        });
    })
    .on('end', () => {
        console.log(errList);
        console.log('CSV file successfully processed');
    });