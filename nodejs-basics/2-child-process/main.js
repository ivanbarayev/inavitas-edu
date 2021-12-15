'use strict';

const child_process = require('child_process');

const islem = child_process.fork('islem.js');

islem.on('message', function (message) {
    console.log('Gelen mesaj: ' + message);
});

islem.on('close', function (code) {
    console.log('İşlem tamamlandı. İşlem kodu: ' + code);
});
