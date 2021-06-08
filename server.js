const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('*', (req, res) => {
      return handler(req, res);
    });

    server.listen(5000, (err) => {
      if (err) throw err;
      console.log('Ready on localhost:5000');
    });
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
