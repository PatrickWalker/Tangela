var restify = require('restify'),
fs = require('fs');

var server = restify.createServer({
  name: 'Tangela',
});

var pjson = require('./package.json');
var version = pjson.version
var portNumber = 8080;
var Vendors = new Map();

console.log(`Listening on Port ${portNumber} `);
server.listen(portNumber);

function getVersion(req, res, next){
   res.send(200, version);
   return next();
}

function getVendor(req, res, next) {
	//pull the vendor name out of the request pathname
	val= Vendors[req.params.name]
	//Pull the name out of the map and return the value
	res.send(200, val)
	return next();
}

function saveVendor(key, val){
	Vendors[key] = val;
}

function create(req, res, next) {
	console.log(req);
	console.log(req.params)
	 var vendorName = req.params.name;
	 //Save the Vendor to an object in memory
	 saveVendor(vendorName, req.body);
	 //return a success response
	 res.send(201, `{"response":{"Created ${vendorName}"}`);
   return next();
 }
 server.use(restify.bodyParser({ mapParams: true }));
 server.post('/vendor', create); 
 server.put('/vendor', create);
 server.get('/vendor/:name', getVendor);
 server.get('/version', getVersion);
