/**
 * Main file for the REST API
 */
// Dependencies
const Http = require('http');
const Url = require('url');
const cluster = require('cluster');
const os = require('os');
const Config = require('./config');

// Server container
const server = {};

// Request handlers container
const handlers = {};

// Handlers

handlers.helloHandler = (data, cb) => {
  cb(200, { message: 'hello world!' });
};

handlers.notFound = (data, cb) => {
  cb(404, { message: 'Not found' });
};

// Router
const router = {
  hello: handlers.helloHandler,
};

// add http support to the server
server.http = Http.createServer((req, res) => {
  const { url } = req;
  const { pathname } = Url.parse(url, true);
  const path = pathname.replace(/^\/+|\/+$/g, '');
  req.on('data', () => {});
  req.on('end', () => {
    const routeHandler = router[path]
      ? router[path] : handlers.notFound;
    routeHandler(null, (status, payload) => {
      const data = JSON.stringify(payload);
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(status);
      res.end(data);
    });
  });
});


// Init scripts function
server.init = () => {
  if (cluster.isMaster) {
    const cpuCores = os.cpus().length;
    console.log('===========  Fork the process ===========');
    console.log('CPU CORES: ', cpuCores);
    console.log('Process ID:', process.pid);
    console.log('=========================================');
    // Fork the process
    for (let i = 0; i < cpuCores; i++) {
      cluster.fork();
    }
  } else {
    // Sets the port that the server will listen to
    server.http.listen(Config.port, () => {
      console.log('============ Initializing the server ==========');
      console.log('Process ID:', process.pid);
      console.log(`Server on port ${Config.port}, env: ${Config.name}`);
    });
  }
};

// initialize server if it was self invoked
if (require.main === module) {
  server.init();
}
// Export the module
module.exports = server;
