import express      = require('express');
import fs           = require('fs');
import https        = require('https');

import path         = require('path');
let certsPath       = path.resolve(__dirname, '../certs/')
var    proxy        = require('http-proxy-middleware');

var privateKey      = fs.readFileSync(certsPath+'/private.key', 'utf8');
var certificate     = fs.readFileSync(certsPath+'/certificate.crt', 'utf8');
var ca_bundle       = fs.readFileSync(certsPath+'/ca_bundle.crt', 'utf8');

var credentials     = {key: privateKey, cert: certificate, ca : ca_bundle};

var app = express();
var httpsServer = https.createServer(credentials, app);

let proxyFinance = proxy("/", {
    target: "https://www.google.com/finance",
    changeOrigin: true
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
});

app.use('/', proxyFinance);

httpsServer.listen(30443);