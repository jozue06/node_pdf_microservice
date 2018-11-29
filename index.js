'use strict';


require('dotenv').config();

const PORT = process.env.PORT;

require('babel-register');

require('./app.js').start( PORT, () => console.log(`Server up on ${PORT}`));


