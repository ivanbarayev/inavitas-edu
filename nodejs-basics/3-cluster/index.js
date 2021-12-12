const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

//numCPUs = 5

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < 3; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('hello world\n');
    }).listen(8001); //Shared PORT

    console.log(`Worker ${process.pid} started`);
}

//ADDRESS IN USE = bu port kullanımda baska bi tane secin
//Request per second RPS = saniyede gelen istek sayisi
