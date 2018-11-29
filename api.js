'use strict';

import express from 'express';

const router = express.Router();

router.get('/', (req,res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.write('Welcome');
  res.end();
});

router.get('/api/v1/pdf', (req,res) => {
  if (!req.query.id) {
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.write('Bad Request');
    res.end();
  }

});


export default router;