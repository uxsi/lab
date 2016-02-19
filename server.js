var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var mine = {
    "html": "text/html",
    "css": "text/css"
}
var port = 3000;


var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var realpath = path.join('./', pathname);

    var ext = path.extname(realpath);
    ext = ext ? ext.slice(1) : 'unknow';

    fs.exists(realpath, function (exist) {
        if (!exist) {
            response.writeHead(404, {
                "Content-Type": "text/plain"
            });
            response.write("this file" + realpath + "is not exist.");
            response.end();
        } else {
            fs.readFile(realpath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        "Content-Type": "text/plain"
                    });
                    response.write("server error");
                    response.end();
                }
                var contenttype = mine[ext] || "text/plain";
                response.writeHead(200, {
                    "Content-Type": contenttype
                });
                response.write(file, "binary");
                response.end();
            });
        }
    })
}).listen(port);
console.log("server listen on " + port + ".");


