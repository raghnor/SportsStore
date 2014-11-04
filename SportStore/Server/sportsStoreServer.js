// Includes
var http = require('http');
var url = require('url');

// Starting Data
var products = [
    { id:1, name:"Product #1R", description:"A product (R)", category:"Category #1", price:100 },
    { id:2, name:"Product #2R", description:"A product (R)", category:"Category #1", price:110 },
    { id:3, name:"Product #3R", description:"A product (R)", category:"Category #2", price:210 }, 
    { id:4, name:"Product #4R", description:"A product (R)", category:"Category #2", price:202 }, 
    { id:5, name:"Product #5R", description:"A product (R)", category:"Category #2", price:150 }, 
    { id:6, name:"Product #6R", description:"A product (R)", category:"Category #3", price:151 }, 
    { id:7, name:"Product #7R", description:"A product (R)", category:"Category #3", price:211 }, 
    { id:8, name:"Product #8R", description:"A product (R)", category:"Category #4", price:212 }
];

var orders = [];
/* "{"name":"dfgsdg","street":"dsfgsdfg","city":"sdfgs","state":"dfg","zip":"sddfg","country":"sdffg","products":[{"count":1,"id":1,"name":"Product #1R","price":100,"$$hashKey":"00K"}]}" */

// Main CreateServer function

http.createServer(function (req, res) {
    if(req.method == "GET")
    {  
        if(url.parse(req.url).pathname == '/products')
            getProducts(req, res);
        else if(url.parse(req.url).pathname == '/orders')
            getOrders(req, res);
        else
            getHelpPage(req,res);
    }
    else if( req.method == "POST")
    {
        if(url.parse(req.url).pathname == '/products')
            postProduct(req, res);
        else if(url.parse(req.url).pathname == '/orders')
            postOrder(req, res);
        else
            getHelpPage(req,res);
    }
	else if (req.method === 'OPTIONS') 
		optionRequest(req, res);
}).listen(9999);    //, '127.0.0.1');

console.log('--- SportsStore Web Service ---');
console.log('Server running at http://127.0.0.1:9999/');

// OPTIONS Request Handler

function optionRequest(req, res) {
	var headers = {};
	// IE8 does not allow domains to be specified, just the *
	// headers["Access-Control-Allow-Origin"] = req.headers.origin;
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	res.writeHead(200, headers);
	res.end();
	
	console.log('[OPTIONS] Request : OK');
}
		
// GET Requests Handlers

function getProducts(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'});

    res.end(JSON.stringify(products));
        
    console.log('[GET] Products Request : OK');
}

function getOrders(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'});

    res.end(JSON.stringify(orders));
        
    console.log('[GET] Orders Request : OK');
}

// POST Requests Handlers

function postOrder(req, res) {
    // the body of the POST is JSON payload.
    var data = '';
    req.addListener('data', function(chunk) { data += chunk; console.log("[POST] Order Data on going: " + data); });
    req.addListener('end', function() {
        try {
			console.log("[POST] Order Data received: " + data);
            var readData = JSON.parse(data);
            if(readData != null)
                   orders.push(readData);
        } catch ( e ) {
            res.writeHead(500, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'});
            res.write('{ "error":"' + e + '" }');
            res.end('\n');
            console.log('[POST] Order Request : KO');
        }

        res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'});
        res.end('{ "result": "OK", "id": "' + readData.id + '", "ordercount":"' + orders.length + '" }');
        
        console.log('[POST] Order Request : OK');
    });
}

function postProduct(req, res) {
    // the body of the POST is JSON payload.
    var data = '';
    req.addListener('data', function(chunk) { data += chunk; console.log("[POST] Product Data on going: " + data); });
    req.addListener('end', function() {
        try {
			console.log("[POST] Product Data received: " + data);
            var readData = JSON.parse(data);
            if(readData != null)
                   products.push(readData);
        } catch ( e ) {
            res.writeHead(500, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'});
            res.write('{ "error":"' + e + '" }');
            res.end('\n');
            
            console.log('[POST] Product Request : KO');
        }

        res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'});
        res.end('{ "result": "OK", "id": "' + readData.id + '", "productcount":"' + products.length + '" }');
        
        console.log('[POST] Product Request : OK');
    });
}

// Help page Handler

function getHelpPage(req,res) {
    res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'});
    
    res.write('<h1>SportsStore Web API Help</h1>\n<hr>\n');
    res.write('<h2>Products</h2>\n');
    res.write('/products [GET] : returns the list of the current products\n<br/>');
    res.write('/products [POST] : save a new product in the list of the current products\n<br/>');
    res.write('<h2>Orders</h2>\n');
    res.write('/orders [GET] : returns the list of the current orders\n<br/>');
    res.write('/orders [POST] : save a new order in the list of the current orders\n<br/>');
    res.end('\n');
}}