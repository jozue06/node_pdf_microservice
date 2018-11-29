'use strict';

import express from 'express';
import api from './api.js';

const app = express();
app.use(express.json());
app.use(api);

let isRunning = false;

let server;

module.exports = {
  start: (port) => {
    if(! isRunning) {
      server = app.listen(port, (err) => {
        if(err) { throw err; }
        isRunning = true;
        console.log('Server is up on port', port);
      });
    }
    else {
      console.log('Server is already running');
    }
  },

  stop: () => {
    server.close( () => {
      isRunning = false;
      console.log('Server has been stopped');
    });
  },
};

