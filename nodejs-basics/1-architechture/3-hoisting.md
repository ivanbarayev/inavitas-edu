#Hoisting

Eğer JavaScript’te yeniyseniz, bazı değişkenlerin rastgele undefined, ReferenceErrorgibi “garip” hatalar gönderdiğini deneyimlemişsinizdir. Hoisting genellikle değişkenlerin ve fonksiyonların dosyanın en üstüne taşındığı şeklinde tarif edilir ama hayır, böyle görünse de aslında olan şey bu değildir.
JavaScript motoru script kodumuzu aldığında, yaptığı ilk şey kodumuzdaki veriler için bellekte yer ayarlamaktır. Bu kısımda hiçbir kod execute edilmez, sadece execute edilmek için hazırlanır. Burada fonksiyon tanımlama ve değişkenlerin muhafaza edilme biçimi farklıdır. Fonksiyonlar, tüm fonksiyon referans alınarak muhafaza edilir.  
![](https://miro.medium.com/max/700/1*C_ggmNvwIfpIp10MqadNog.gif)  
---

Değişkenler biraz daha farklıdır. ES6 ile birlikte değişkenleri tanımlamak için let ve const isminde iki yeni anahtar kelime mevcuttur. let veya const anahtar kelimeleriyle tanımlanan değişkenler hafızada uninitiliazed olarak tutulur.
![](https://miro.medium.com/max/700/1*26Ll_vklGNnrdqRDAbrdGQ.gif)
---

**var** anahtar kelimesiyle tanımlanan değişkenler ise varsayılan olarak hafızada undefined olarak tutulur.
![](https://miro.medium.com/max/700/1*cZNK9ASoNnwB9PBGo_WEaw.gif)
---

Artık oluşturulma safhası tamamlandı, şuan kodu execute etme kısmına geçebiliriz. Herhangi bir fonksiyon yada değişken oluşturmadan önce dosyamızın en üst kısmında 3 tane console.log olsaydı neler olurdu bir bakalım.  

Fonksiyonların tüm kodu referanslarıyla birlikte tutulduğu için, tanımladığımız satırdan önce bile invoke edebiliriz.
![](https://miro.medium.com/max/700/1*Z4AzGjVRzT0EB4xXMuAhew.gif)
---

Hafızada tanımlamadan önce var anahtar sözcüğüyle ifade edilen bir değişkenin referansına başvurduğumuzda, yalnızca varsayılan değeri olarak saklanan undefined değerini return eder. Ancak, bu bazen “beklenmedik” davranışlara sebep olabilir. Çoğu durumda, istemeden referansına başvurduğunuz anlamına gelir (Muhtemelen undefined bir değere sahip olmak istemezsiniz)
![](https://miro.medium.com/max/700/1*_p1417-UGeBbqYpSyYMIeA.gif)   
---

**var** anahtar sözcüğü ile yapabildiğimiz gibi, undefined bir değişkene yanlışlıkla referans vermeyi önlemek için, aynı şekilde uninitialized anahtar sözcüğü ile tanımlanan değişkenlere erişmeye çalıştığımızda ReferenceError hatası gönderilir. Gerçek tanımlamalardan önceki “bölge”, geçici ölü bölge (temporal dead zone) olarak adlandırılır: değişkenler initialize edilmeden (buna ES6 classları da dahildir) önce referans veremezsiniz.
![](https://miro.medium.com/max/700/1*A6fHXd3nJQe1fEqlJYxz5A.gif)
---

JavaScript motoru bizim gerçekte tanımladığımız değişken satırını geçtiğinde, bellekteki değerlerin üzerine asıl tanımladığımız değerleri yazar.
(7 numara olması gerektiğini şimdi fark ediyorum)  
![](https://miro.medium.com/max/700/1*I1QpnkFw8Yvu9GV-upCbYQ.gif)
---

Hepsi bu kadar! Hızlıca tekrar edelim:   

1-Fonksiyonlar ve değişkenler kodumuzu çalıştırmadan önce bir execution context oluşturmak için bellekte saklanır. Buna hoisting denir.  
2-Fonksiyonlar hafızada fonksiyonun referansıyla tutulur, var anahtar sözcüğü ile tanımlanan değişkenler undefined değeriyle ve let const anahtar sözcükleriyle tanımlanan değişkenler ise uninitialized değeriyle hafızada muhafaza edilir.

[Ingilizce Versiyonu](https://dev.to/lydiahallie/javascript-visualized-hoisting-478h)
