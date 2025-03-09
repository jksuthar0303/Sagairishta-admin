const fs = require('fs');
const https = require('https');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  https
    .createServer(
      {
        key: fs.readFileSync('./172.20.10.4-key.pem'),
        cert: fs.readFileSync('./172.20.10.4.pem'),
      },
      (req, res) => {
        handle(req, res);
      }
    )
    .listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on https://172.20.10.4:3000');
    });
});
