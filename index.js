const Http = require('http');
const Url = require('url');
const Config = require('./config');

const Server = Http.createServer((req, res) => {
  const { url } = req;
  const { pathname } = Url.parse(url, true);
  const _path = pathname.replace(/^\/+|\/+$/g, '');
  req.on('data', () => {});
  req.on('end', () => {
    const _routeHandler = router[_path] ?
    router[_path] : handlers.notFound;
    _routeHandler(null, (status, payload) => {
      const _data = JSON.stringify(payload);
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(status);
      res.end(_data);
    });
  });
});

Server.listen(Config.port, () => {
  console.log(`Server on port ${Config.port}, env: ${Config.name}`);
});

const handlers = {};

handlers.helloHandler = (data, cb) => {
  cb(200, {message: 'hello world!'});
};

handlers.notFound = (data, cb) => {
  cb(404);
};

const router = {
  hello: handlers.helloHandler,
};
