'use strict';

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.write('Welcome');
  res.end();
});

router.get('/api/v1/pdf', (req, res) => {
  eval(req.body.content);

  createPdfBinary(dd, function (binary) {
      res.contentType('application/pdf');
      res.send(binary);
  }, function (error) {
    res.send('ERROR:' + error);
  });


});


export default router;