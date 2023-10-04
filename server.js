
//nodejs contains the npm which allows us to install packages that help us building, read files, manipulate

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    
    //console.log("Hello!") //just a simple answer for the call

    //For the server to show a file we want when start running
    res.setHeader("Content-Type", "text/html");
    let path = "./Visuals/";

    switch(req.url) {
        case "/index":
            res.statusCode = 200;
            path += "index.html"
            break;
        case "/about":
            res.statusCode = 200;
            path += "about.html"
            break;
        default:
            res.statusCode = 404;
            path += "404.html"
            break;
    }

    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err)
        }
        else {
            res.write(data);
            res.end();
        }
    });
});

//Connect server with port
server.listen(3000, "localhost", () => {
    console.log("Listening for requests on port 3000")
}); 