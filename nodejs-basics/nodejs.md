Son yıllarda en popüler teknolojilerden birisi olan Node JS günümüzde eBay ya da AliExpress gibi dünyaca ünlü sitelerde backend dili olarak kullanılmaktadır. Ayrıca Node JS kullanıcıları arasında Netflix, Uber, LinkedIn ve hatta NASA gibi platformlar da bulunuyor. 2018 yılında Node JS üzerinde çalışan 23 milyon geliştirici bulunuyordu ve kullanıcı listesi sürekli olarak artıyor. Google’ın V8 motoru için geliştirilmiş olan Node JS açık kaynaklı Javascript runtime environment’dır. Node JS ile ölçeklendirilebilir web uygulamaları hızlı bir şekilde geliştirilebilmektedir. Event-driven, non blocking I/O modeli yoğun veriye sahip olan gerçek zamanlı uygulamaların kolay ve verimli bir şekilde çalışmaktadır.

#Node JS Nasıl Çalışır?
Sunucu motoru olay güdümlü ve non blocking I/O modeli kullanmaktadır. Kodun çalıştırılması son derece hızlı olduğu için JavaScript adaptasyonunun daha kolay hale getirmektedir. JavaScript ve Node JS sayesinde sunucu istemci doğrultusunda kod çok daha hızlı bir şekilde çalışmaktadır. Bu da web uygulamalarının yeni bir seviyede performans sunması anlamına gelmektedir. Node JS, Google’ın V8 Javascript motoru üzerinde çalışmaktadır. Burada web uygulamaları event-based yani olay güdümlüdür. Node JS platformu ise “single threaded event loop” kullanmaktadır. “Multi threaded request-response” mimarisi de çok yavaş bir event loop’tur ve aynı anda çoklu thread’i işleyememektedir. Platform istek/cevap modelini kullanmak yerine daha basit olan single-thread event loop modelini kullanmaktadır. Bunun için Node JS geliştiricilerine Libuv kütüphanesi sunulmaktadır.

#Node.js’in en önemli özelliği asenkron yapıda çalışması ve non-blocking olması.
Peki nedir bu asenkron çalışma ve non-blocking?  
Asenkron ve non-blocking çalışma mantığını bir restoran örneği ile çok iyi bir şekilde anlayacağınızı düşünüyorum. Bir restorana gittiğinizi düşünün ve sipariş verin. Siz siparişi garsona vereceksiniz, o da aşçıya bildirecek ve aşçı sizin yemeğinizi yapmaya başlayacak. Diyelim ki sizin istediğiniz yemeğin yapılış süresi 30 dk. Bu arada tabi ki restorandaki tek kişi siz değilsiniz. Bir çok kişi aynı anda garsona sipariş verecek ve aşçılar yemekleri yapmaya başlayacak. Eğer garson diğer kişilerin siparişlerini sizin yemeğinizin yapılıp size teslim edilene kadar almasaydı sizden sonra sipariş vermeyi bekleyen insanlar çok zaman kaybetmiş olacaktı. Ama garson siparişi aldı ve ilettti, sonra başkasının siparişini aldı, onu da iletti. Dolayısıyla kimse diğerinin siparişinin bitmesini beklememiş oldu. İş bu sistemde bir kişinin isteği diğerinin işini engellememiş oldu.
Aynı sistem node.js çalışma mantığında da var. Node.js tarafına bir işlem için istek gönderildiğinde node.js onu alıp hemen işleme koyuyor ama diğer işlemi almak için bu işlemin bitmesini beklemiyor. Sırayla istekleri alıyor ve sonuçları beklemeden devam ediyor. Sonuçlar geldikçe iletiyor. Aynı restoran mantığında çalışıyor ve bu durumda bir istek diğer isteğin bitmesini beklemediği için diğer isteği engellememiş oluyor. Hangisi önce biterse o isteğin cevabı geliyor. İşte bu mantığa asenkron çalışma mantığı deniyor ve bir işlem diğer işlemi engellemediği içinde non-blocking oluyor.

![title](https://miro.medium.com/max/2400/0*APswsNi3CbEJhetW.png)

Yukarıdaki örnekte asenkron ve senkron çalışmanın arasındaki fark güzel şekilde anlatılmış. Senkron işlemlerde bir işlem diğer işlemleri beklediği için toplam 4 adet işlemin bitmesi 45 sn sürmüş. Ama asenkron yapıda her işlemin başlangıcı diğer işlemin bitişine bağlı olmadığı için 25 sn dürmüş. İşte node.js bu asenkron yapısıyla ciddi bir hız kazanıyor.  
Aynı zamanda birden çok kullanıcıya hızlı cevap verebildiği için ölçeklenebilirlik sorununa çözüm sunuyor. Bu da aslında onun popüler olmasının temel nedenlerinde biri. Aynı anda binlerce insanın kullandığı bir sistem geliştiriyorsak node.js çok iyi bir tercih olacaktır.  
Peki Python, Asp.Net, Java, Php, Ruby gibi teknolojiler bu ölçeklenebilirlik sorununu çözemiyor mu? Elbetteki çözebiliyor fakat daha maliyetli oluyor. Zaten işte bu yüzden Linkedin, Netflix gibi ciddi kullanıcıları olan büyük şirketler Node.js kullanıyor.  

Nodejs’in en büyük avantajlarından bir tanesi de modüler yapısı ve bu yapıyı destekleyen paket yönetim sistemi olan npm (nodejs package manager).  
Npm’i Node.js projelerinde kullanılmak üzere içerisinde bir çok modül barındıran bir depo gibi düşünebiliriz. Bu modüller open-source geliştiricileri tarafından yazılarak npmjs.com üzerine yüklenmektedir. Npm içerisinde şu an 1 milyondan fazla paket, modül eklenmiş durumda. Bu da aslında popülaritesini gerçekten net olarak gösteriyor.

#Node JS Mimarisi
Her bir isteğin sistem RAM’inde yeni thread oluşturduğu geleneksel web-serving tekniği yerine Node JS tek thread kullanmaktadır. 
Bu da tek seferde yüzlerce bağlantıyı işleyebilmesini sağlamaktadır. Node JS, npm kullanarak paket yönetim desteği de sunmaktadır. Popüler paket kütüphanesi olan npm, Node JS geliştiricileri için en büyük kolaylıklardan bir tanesidir. Spesifik bir ihtiyaç için milyonlarca indirilebilir kütüphane bulunmaktadır. Bu büyük kütüphanelerin bir diğer özelliği se ücretsiz olmasıdır. Günümüzde bu kütüphanelerin hepsi büyük bir hızla büyümektedir ve Node JS topluluğun daha güçlü hale gelmesini sağlamaktadır. Dünyanın dört bir yanından açık kaynak geliştiricileri paketleri paylaşmak ya da ödünç almak için npm kullanmaktadır. 11.0 güncellemesi ile beraber Node JS native Node kullanarak daha da stabil hale gelmiştir. Ayrıca daha iyi performans ve gelişmiş hata Avustralya yapmak da mümkün olmaktadır. En çok kullanılan npm modülleri arasında Express.js, Meteor.js, Koa.js, Nest.js, Mongo.js, Sails.js, Hapi.js, Total.js, Loopback.js ve socket.js  modülleri bulunmaktadır. Bu npm modüllerini kullanarak yüksek performans elde etmek, zaman alan işlemleri otomatik hale getirmek ya da büyük bir test ortamı oluşturmak mümkün hale gelmektedir. 


#Node JS Ne İçin Kullanılır?
Node JS geliştiricilere sınırsız bir ortam sunmaktadır. Günümüzde Node JS’nin çok başarılı bir şekilde kullanıldığı çok sayıda platform bulunmaktadır. Bunların arasında sosyal medya ağları, tek sayfa uygulamalar, chat uygulamaları, data streaming ve IoT uygulamaları yer almaktadır. 

#Sosyal Medya Uygulamaları
LinkedIn ve Medium gibi birçok sosyal medya platformu Node.js ile yeniden düzenlenmiştir. Node.js, V8 motoru sayesinde güvenli doğrulama ile beraber çok hızlı routing sağlamaktadır. Ayrıca sosyal medya platformlarında kullanılmasının en büyük nedenlerinden bir tanesi de ölçeklendirilebilir olmasıdır.

#Tek Sayfa Uygulama Geliştirme
Tek sayfa internet siteleri gibi masaüstü uygulamalara son derece benzer bir şekilde tek sayfa uygulama geliştirmek mümkün olmaktadır. Platform sundukları sayesinde dinamik internet siteleri ve mailini çözümleri konusunda son derece başarılıdır. Asenkron veri akış kalitesi sayesinde tek sayfa uygulama geliştirmek mümkün olmaktadır.

#Chatbot
Gerçek zamanlı chat uygulamaları veya chatbotları için platform önemli avantajlar sağlamaktadır. Çok kullanıcılı uygulama, yoğun veriler, yüksek trafik gibi özellikler chatbotları için vazgeçilmezdir. Node JS’nin farklı cihazlarda çalışabilir olması da büyük bir avantajdır. Push bildirimlerin çalıştırılmasının son derece kolay olması ve sunucu tarafındaki event loop’ları sayesinde gerçek zamanlı uygulamalarda tercih edilmektedir.

#Data Streaming
Günümüz en popüler platformlarından biri olarak kabul edilen Netflix 190 ülkede, 100 milyon saatten fazla içeriği 120 milyondan fazla kullanıcıya Node JS ile sunmaktadır. Dosyaları süper hızlı bir şekilde işlemesi, kolay bir şekilde encode’a izin vermesi nedeniyle bu alanda tercih edilmektedir. Ayrıca çok fazla video içeren birçok e-ticaret firması da bu özellikleri sayesinde Node JS tercih etmektedir.

#IoT Uygulamaları
Geçtiğimiz on yılda IoT cihazları inanılmaz bir hızla gelişti ve herkesin hayatına girmeye başladı. IoT çözümleri için en çok tercih edilen çözümlerden bir tanesi de Node JS’dir. Platform sayesinde IoT ağlarında event driven sunucu mimarisi ve I/O operasyonlarının asenkron işlemi Node JS sayesinde mümkün hale gelmektedir. Dahası Node JS yazılabilir ve okunabilir kanalları ve yayınları yönetimini sağlamaktadır bu nedenle de IoT uygulama geliştirme dünyasında da en çok tercih edilen platformlardan birisi hal gelmektedir. 


[Source](https://www.limonhost.net/makaleler/nedir/node-js-nedir-ve-avantajlari-nelerdir/)
