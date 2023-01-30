const http = require('http');
const fs = require('fs');
const port = 3000;
const url = require('url');
const lookup = require("mime-types").lookup;

const server = http.createServer(function(req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname; 

    console.log(`Requested path ${q.pathname}`);

    fs.readFile("static/" + filename, function(error, data) {
        if (error) {
            res.writeHead(404);
            res.write("Error 404: page not found");
        }
        else {
            var mime = lookup(q.pathname);
            res.writeHead(200, {'Content-Type': mime});
            res.write(data);
        }
        res.end();
    });
});

server.listen(port, function(error) {
    if (error) {
        console.log("something went wrong", error);
    }
    else {
        console.log("server is listening on port " + port);
    }
});