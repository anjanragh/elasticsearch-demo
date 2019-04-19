'use strict'

import csv from 'csv-parser';
import fs from 'fs';

fs.createReadStream('./data/books.csv')  
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });