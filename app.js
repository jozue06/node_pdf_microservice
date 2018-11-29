'use strict';

// import express from 'express';

// const app = express();
// app.use(express.json());

// let isRunning = false;

// let server;

// module.exports = {
//   start: (port) => {
//     if(! isRunning) {
//       server = app.listen(port, (err) => {
//         if(err) { throw err; }
//         isRunning = true;
//         console.log('Server is up on port', port);
//       });
//     }
//     else {
//       console.log('Server is already running');
//     }
//   },

//   stop: () => {
//     server.close( () => {
//       isRunning = false;
//       console.log('Server has been stopped');
//     });
//   },
// };





import http from 'http';
import express from 'express';
import  path from 'path';
import bodyParser from 'body-parser';
import pdfMakePrinter from './printer';
import api from './api.js';

let app = express();

let rootDir = path.resolve(path.dirname('.'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(api);

function createPdfBinary(pdfDoc, callback) {

  let fontDescriptors = {
    Roboto: {
      normal: path.join(__dirname, '..', 'examples', '/fonts/Roboto-Regular.ttf'),
      bold: path.join(__dirname, '..', 'examples', '/fonts/Roboto-Medium.ttf'),
      italics: path.join(__dirname, '..', 'examples', '/fonts/Roboto-Italic.ttf'),
      bolditalics: path.join(__dirname, '..', 'examples', '/fonts/Roboto-MediumItalic.ttf')
    }
  };

  let printer = new pdfMakePrinter(fontDescriptors);

  let doc = printer.createPdfKitDocument(pdfDoc);

  let chunks = [];
  let result;

  doc.on('data', function (chunk) {
    chunks.push(chunk);
  });
  doc.on('end', function () {
    result = Buffer.concat(chunks);
    callback('data:application/pdf;base64,' + result.toString('base64'));
  });
  doc.end();

}

let server = http.createServer(app);
let port = process.env.PORT || 1234;
server.listen(port);

console.log('http server listening on %d', port);