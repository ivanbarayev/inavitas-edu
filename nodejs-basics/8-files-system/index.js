const fs = require('fs'); //file system

fs.readFile('./leo.txt', function (err, data) {
    console.log(data)
});


fs.unlink("./leo.txt")
