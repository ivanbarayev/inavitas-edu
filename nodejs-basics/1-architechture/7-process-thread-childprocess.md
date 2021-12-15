#UNIX/Linux Process / Thread / Subprocess / Child Process Kavramı

Process, programın belleğe yüklenerek çalıştırılmasıyla ortaya çıkan yapıdır diyebiliriz. Her process in bir ID değeri vardır. Bu değer tekildir. Bir kullanıcının bir grup ID değeri vardır. Bu değer etc/passwd dosyasında tutulur. Login işlemine bakacak olursak, öncelikle kullanıcı ismi ve parolayı ister. Ardından girilen değerleri etc/passwd dosyasında arar. Eğer bilgiler doğru ise shell programı çalışır. Kısaca işleyiş bu şekildedir.

Çalışmakta olan bir process den yeni bir process yaratıldığında karşımıza iki tane kavram çıkar. Burada yeni process i yaratan process parent(ana) process, yeni olaşan ise child(çocuk) process olarak adlandırılır.

Process lerin ID değerleri “pid_t” türündendir.
Linux işletim sisteminde çalışan process leri görmek için terminale “ps” komutunu yazmak yeterlidir. Karşımıza çalışan process ler dökümü gelecektir.
---

Asenkron işlemler her ne kadar işlem performansını arttırsa da işlemciyi çokça kullanan video işleme, görüntü işleme, sayısal hesaplama gibi işlemler için ayrı bir işlemin başlatılması faydalı olabilir.

Node.js çekirdek modülleri içerisinde yer alan ``child_process`` modülü konsol, ek veya alt işlem başlatılmasına imkan verir.

Node.js ``child_process`` modülü alt işlem başlatmak için üç farklı metoda sahiptir.

- **exec** – Kabuk/konsol işlemi başlatmak için kullanılır.
- **spawn** – Yazılan komutu yeni işlem başlatıp çalıştırır.
- **fork** – Alt işlem başlatmak için kullanılır.

#exec
Komutu işletim sistemi kabuk/konsol yorumlayıcısında çalıştırır ve sonucu ara belleğe alır.

>child_process.exec(command[, options][, callback])

````javascript
'use strict';
const child_process = require('child_process');

const islem = child_process.exec('node --version', function (error, stdout, stderr) {
    if (error) throw error;

    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
});

islem.on('exit', function (code, signal) {
    console.log('İşlem tamamlandı. İşlem kodu:  ' + code);
});
````

#spawn
Komutu yeni işlem üzerinden çalıştırmak için kullanılır.   
>child_process.spawn(command[, args][, options])

````javascript
'use strict';

const child_process = require('child_process');
const islem = child_process.spawn('node', ['--version']);

islem.stdout.on('data', function (stdout) {
    console.log('stdout: ' + stdout);
});

islem.stderr.on('data', function (stderr) {
    console.log('stderr: ' + stderr);
});

islem.on('close', function (code) {
    console.log('İşlem tamamlandı. İşlem kodu: ' + code);
});
````

#fork
Metot spawn metodunun özel bir kullanımıdır.

Komut Node.js komutlarını çalıştırmak için alt işlem başlatır.
>child_process.fork(modulePath[, args][, options])

Aşağıdaki kodları **islem.js** olarak kaydedin.

 ````javascript
'use strict';

console.log('Merhaba Node.js');

process.send('Merhaba islem.js');

process.exit();
````

Aşağıdaki kodları main.js ile aynı yere kaydedin ve çalıştırın.

````javascript
'use strict';

const child_process = require('child_process');
const islem = child_process.fork('islem.js');

islem.on('message', function (message) {
    console.log('Gelen mesaj: ' + message);
});

islem.on('close', function (code) {
    console.log('İşlem tamamlandı. İşlem kodu: ' + code);
});
````
Node.js içerisindeki yer alan child_process modülü alt işlem oluşturmaya izin verse de kullanımı sırasında hatalı komut sonucu önlenemeyen hatalara neden olabilir.
