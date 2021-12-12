#Promises & Async/Await

Hiç beklediğiniz gibi çalışmayan bir JS koduyla uğraşmak zorunda kaldınız mı? Belki fonksiyonlar rastgele, öngörülemeyen zamanlarda çalıştırılmış veya execution işlemi gecikmiş gibi görünüyordu. ES6'nın sunduğu harika bir yeni özellikle uğraşma ihtimaliniz var: Promise’lar!
Yıllar öncesindeki merakım karşılığını verdi ve uykusuz gecelerim bir kez daha bana bazı animasyonlar yapma fırsatı tanıdı. Promise hakkında konuşma zamanı: neden kullanmalısınız? ‘arka planda’ nasıl çalışıyorlar ve bunları en modern şekilde nasıl yazabiliriz?

**Giriş**
JavaScript yazarken, genellikle başka işlere bağımlı şeylerle uğraşmak zorundayız! Diyelim ki bir görüntü elde etmek, sıkıştırmak, filtre uygulamak ve kaydetmek istiyoruz.  

Yapmamız gereken ilk şey, düzenlemek istediğimiz resmi elde etmektir. Bir getImagefonksiyonu bunu halledebilir! Sadece bu image başarıyla yüklendikten sonra, bu value’yuresizeImage fonksiyonuna aktarabiliriz. Görüntü başarıyla yeniden boyutlandırıldığında, applyFilterfonksiyonunda görüntüye bir filtre uygulamak istiyoruz. Resim sıkıştırıldıktan ve bir filtre ekledikten sonra, resmi kaydetmek ve kullanıcıya her şeyin doğru çalıştığını bildirmek istiyoruz!  

Bunun sonucunda, böyle bir şeyle karşılaşacağız:
![](https://miro.medium.com/max/700/1*Q0gBnTgzZAnFxmejvRfpzA.png)
---

Hmm… Burada bir şey fark ettiniz mi? Her ne kadar … iyi olsa da, harika değil. Önceki callback fonksiyonuna bağlı birçok iç içe geçmiş callback fonksiyonuyla karşılaştık. Kodun okunmasını oldukça zorlaştıran tonlarca iç içe geçmiş callback fonksiyonu elde ettiğimiz için bu genellikle callback hell olarak adlandırılır.   

Neyse ki, şimdi bize yardım edecek promise denen bir şeyimiz var! Promise’ların ne olduğuna ve bu gibi durumlarda bize nasıl yardımcı olabileceklerine bir göz atalım!   

**Promise Syntax**
**Promise** ES6 ile birlikte tanıtıldı. Birçok tutorialda aşağıdaki gibi şeyler okuyacaksınızdır:
>‘Bir promise, ilerleyen süreçlerde resolve veya reject edilebilecek olan bir değer için yer tutucudur’   
 
Evet… Bu açıklama benim için hiçbir şeyi açıklığa kavuşturmadı. Aslında bana bir Promise’ın tuhaf, belirsiz, öngörülemez bir sihir olduğunu hissettirdi. O halde promise’ların gerçekte ne olduğuna bakalım.   

Callback alan bir Promise constructor’ını kullanarak bir promise oluşturabiliriz. Tamam harika, hadi deneyelim!
![](https://miro.medium.com/max/700/1*CfwldF7tGqTYxLadNiXnjw.gif)
---


Bir dakika? neyi return etti?  

Promise, bir status ([[PromiseStatus]]) ve bir value ([[PromiseValue]]) içeren bir objedir. Yukarıdaki örnekte, [[PromiseStatus]]değerinin "pending" olduğunu ve promise value kısmının "undefined”olduğunu görebilirsiniz.  

Endişelenmeyin — bu objeyle asla etkileşime girmenize gerek kalmayacak, [[PromiseStatus]] ve [[PromiseValue]] property’lerine bile erişmeniz mümkün değil! Ancak promise’larla çalışırken bu property’lerin değerleri önemlidir.  

PromiseStatus’un (state) değeri şu üç değerden biri olabilir:  
✅ fulfilled: Promise resolveoldu. Her şey yolunda gitti, promise’da hiçbir hata olmadı.  
❌ rejected: Promise reject oldu. Bir şeyler ters gitti…   
⏳ pending: Promise ne resolveoldu ne de reject edildi (henüz), promise hala beklemede.  

Pekala, bunların hepsi kulağa harika geliyor, ancak bir promise durumu ne zaman‘pending’, ‘fulfilled’ veya ‘rejected’ olur? Ve bu durumlar neden önemlidir?  

Aşağıdaki örnekte, Promiseconstructor’ına basit bir callback fonksiyonu () => {}aktardık. Ancak, bu callback fonksiyonu aslında iki argüman alır. Genellikle resolveveya resolarak adlandırılan ilk argümanın değeri, Promise resolve olduğunda çağrılacak metod’dur. rejectveya rej olarak adlandırılan ikinci argümanın değeri, Promise’in reject olduğu durumda, bir şeyler ters gittiğinde çağrılacak metod’dur.   
![](https://miro.medium.com/max/700/1*4hdSgI2V9Rao1ljVHT-ixA.png)
---

``resolve`` veya ``reject`` metodunu çağırdığımızda bunun nasıl log’landığını görelim! Örneğimde, ``resolve`` metodunu ``res`` ve ``reject`` metodunu ``rej`` olarak adlandırdım.
![](https://miro.medium.com/max/700/1*T53bP0racTa2j4ZoK1HmwA.gif)
---

Harika! Sonunda 'pending’ durumundan ve undefined değerinden nasıl kurtulacağımızı biliyoruz! Bir promise durumu, resolve metodunu çağırırsak 'fulfilled' ve rejected metodunu çağırırsak promise durumu 'rejected' olur.  

Bir promise value [[PromiseValue]] değeri, argüman olarak resolveveya rejected metoduna aktardığımız değerdir.  

Pekala, şimdi bu karmaşık Promiseobjesini nasıl kontrol edeceğimizi biraz daha iyi biliyoruz. Ama acaba ne için kullanılıyor?   

Giriş bölümünde, bir görüntü aldığımız, sıkıştırdığımız, bir filtre uyguladığımız ve kaydettiğimiz bir örnek gösterdim! Sonunda, bu iç içe geçmiş bir callback karmaşasına sebep oldu.   

Neyse ki, Promise bunu düzeltmemize yardımcı olabilir! İlk olarak, tüm kod bloğunu yeniden yazalım, böylece her fonksiyon bunun yerine bir Promise döndürür.   

Görüntü yüklendiyse ve her şey yolunda giderse, promise’ı, yüklenen görüntü ile resolve edelim! Aksi takdirde dosya yüklenirken bir yerde hata oluştuysa oluşan hata ile promise’ı reject edelim.   
![](https://miro.medium.com/max/700/1*43oMt8_BjsHNQbEiMzBusw.png)
---

Bakalım bunu terminalde çalıştırdığımızda ne olacak!
![](https://miro.medium.com/max/700/1*SeXLMuTb0I8B_wXFNfkA-w.gif)
---


Güzel! Beklediğimiz gibi parse edilen verilerin değeriyle bir promise return edildi.   
Ama… şimdi ne olacak? Tüm bu promise objesini umursamıyoruz, sadece verilerin değerini önemsiyoruz! Neyse ki, bir promise değerini elde etmek için built-in metodlar vardır. Bir promise’a 3 metod ekleyebiliriz:   

``.then()``: Bir promise resolve olduktan sonra çağrılır.`  
``.catch()``: Bir promise rejected olduktan sonra çağrılır.   
``.finaly()``: Promise resolve veya rejected olmuş olsun, her zaman çağrılır.   
![](https://miro.medium.com/max/700/1*3MUAUsii1EWdQrj-6WMxfg.png)
---

``.then`` metodu, ``resolve`` metoduna iletilen değeri alır.
![](https://miro.medium.com/max/700/1*-8NajJhoKEdvHraNAqKQTQ.gif)
---

``.catch`` metodu, ``rejected`` metoduna iletilen değeri alır.
![](https://miro.medium.com/max/700/1*r1eLYH6T783UCX4ZW-63dQ.gif)
---

Son olarak, promise objesinin tamamına sahip olmadan promise’ın resolve olan değerine sahibiz! Artık bu değerle istediğimizi yapabiliriz.   

>Not: bir promise’ın her daim resolve veya rejected olacağını bildiğinizde, promise’ı rejected veya resolve etmek istediğiniz değerle ``Promise.resolve`` veya ``Promise.reject`` yazabilirsiniz!

![](https://miro.medium.com/max/700/1*GNVAbfSmHKceTeQ_u0ts7Q.png)
---

Bu sözdizimini aşağıdaki örneklerde sıklıkla göreceksiniz.   
getImage örneğinde, örneği çalıştırmak için birden çok callback iç içe geçirmek zorunda kaldık. Neyse ki .then metodu bu konuda bize yardımcı olabilir!   
.then’in sonucu bir promise değeridir. Bu, istediğimiz kadar .then zincirleyebileceğimiz anlamına gelir: önceki callback .thensonucu, bir sonraki .thencallback’e argüman olarak iletilecektir!   
![](https://miro.medium.com/max/700/1*hKUqJ-Wppq6FeDtY5wg78w.png)
---

``getImage`` örneğinde, işlenen görüntüyü bir sonraki fonksiyona geçirmek için birden çok .then callback’i zincirleyebiliriz! Birçok iç içe callback fonksiyonuyla sonuçlandırmak yerine, temiz bir .then zinciri elde ederiz.
![](https://miro.medium.com/max/700/1*5jKARCD8tCc-65tpD9d8gA.png)

Mükemmel! Bu sözdizimi iç içe geçmiş callback’ten çok daha iyi görünüyor.

---

#Microtasks and (Macro) tasks   
Pekala, nasıl bir promise oluşturacağımızı ve bir promise’dan nasıl value alacağımızı biraz daha iyi biliyoruz. Biraz daha kod ekleyelim ve tekrar çalıştıralım:
![](https://miro.medium.com/max/700/1*5jKARCD8tCc-65tpD9d8gA.png)
Nasıl yani?!

İlk olarak Start!loglandı. Tamam, bunun geleceğini ilk satırda görebilirdik: console.log('Start!'). Ancak, kaydedilen ikinci value olan End!, resolve olan promise değeri değil, Ancak End! konsola log’landıktan sonra, promise değeri log’landı. Peki burada tam olarak neler oluyor?   

Sonunda promise’ların gerçek gücünü gördük! JavaScript single thread olsa dahi, bir Promisekullanarak asenkron davranışlar ekleyebiliriz!  

Ama bir saniye, bunu daha önce görmemiş miydik? JavaScript event loop konusunda, bir tür asenkron davranış oluşturmak için setTimeOut gibi tarayıcıya özgü yöntemleri de kullanamaz mıyız?   

Evet! Ancak, Event Loop içinde aslında iki tür queue vardır: (makro)task queue (veya yalnızca task queue olarak adlandırılır) ve mikrotask queue. (Makro)task queue (makro)task’lar içindir ve mikrotask queue mikrotask’lar içindir.   

Öyleyse (makro)task nedir ve mikrotask nedir? Burada anlatacağımdan birkaç tane daha olmasına rağmen, en yaygın olanları aşağıdaki tabloda gösterdim.  
![](https://miro.medium.com/max/700/1*dbxQjeIKY7s1xnlOLmY_QQ.png)
---

Evet, mikrotask listesinde Promise`ı görüyoruz! 😃 Bir Promise resolve olduğunda ve kendi then(), catch() veya finally()metodunu çağırdığında, metod içindeki callback, mikrotask queue kısmına eklenir! Bu, then(), catch() veya finally()metodundaki callback’in hemen execute edilmediği ve aslında JavaScript kodumuza bazı asenkron davranışlar eklediği anlamına gelir!   

Peki then(), catch() veya finally() callback ne zaman çalıştırılır? Event Loop, tasklara farklı bir şekilde öncelik verir:  

1- Bu durumda o andaki call stack’te bulunan tüm fonksiyonlar execute edilir. Bir value return ettiklerinde stack’ten çıkarlar.   
2- Call stack boşaldığında, sıradaki tüm mikrotask’lar call stack’e birer birer eklenir ve execute edilir! (Mikro task’ların kendileri de yeni mikro tasklar return edebilir ve etkili bir şekilde sonsuz bir mikro task döngüsü oluşturabilir)   
3- Hem call stack hem de mikro task queue boşsa, event loop (makro)task queue’da kalan task olup olmadığını kontrol eder. tasklar call stack’e eklenir, execute edilir ve çıkarılır!   

Basit bir şekilde aşağıdakileri kullanarak bir örneğe bakalım:   
Task1: Call stack’e anında eklenen bir fonksiyon, örnek olarak kodumuzda anında invoke edildi.   
Task2, Task3, Task4: mikro task’lar, örneğin then callback’i olan bir Promise, veya queueMicrotaskile eklenen bir task.   
Task5, Task6: Bir (Makro)task, örneğin callback’i olan bir setTimeOut veya setImmediatefonksiyonu.   
![](https://miro.medium.com/max/700/1*0xDGBNrA1WtfSfYY3FJOdw.gif)
---

İlk olarak, Task1 bir value return etti ve call stack’ten çıkarıldı. Ardından, engine mikro task queue’da sıraya giren taskları kontrol etti. Tüm tasklar call stack’e eklendiğinde ve sonunda çıkarıldıktan sonra, engine bu sefer (makro)task queue’daki taskları kontrol eder ve call stack’e ekler, sonunda bunlar da value return ettiklerinde call stack’ten çıkarılırlar.   
Tamam, bu kadar pembe kutu yeter. Hadi örneğimizi gerçek bir kodla kullanalım!   
![](https://miro.medium.com/max/700/1*YNAAY6gdLTlmlQ65XwoZOg.png)
---

Bu kodda, setTimeOut makro task’ı ve mikro task promise then() callback metodunu içeriyor. Engine, ilk olarak setTimeOut fonksiyonunun satırına ulaşacak. Bu kodu adım adım çalıştıralım ve nelerin loglandığını görelim!   

>Not: aşağıdaki örneklerde, call stack’e console.log(), setTimeOut vePromise.resolvegibi metodlar eklendiğini gösteriyorum. Bunlar dahili metodlardır ve aslında call stack izlemelerinde görünmezler. Bu yüzden debugger kullanıyorsanız ve bunları hiçbir yerde göremiyorsanız endişelenmeyin! Bir sürü boiler plate kod eklemeden bu kavramı açıklamayı kolaylaştırmak istedim.

İlk satırda, engine console.log() metoduyla karşılaşır. Callstack’e eklenir ve ardından Start! konsola basılır. Metod callstack’ten çıkar ve engine devam eder.
![](https://miro.medium.com/max/700/1*5K5JL9jhX10Yt2iArGVv4w.gif)
---

Engine, callstack’ten çıkarılan setTimeOut metoduyla karşılaşır. setTimeOut metodu tarayıcı için native bir özelliktir: bu yüzden callback fonksiyonu (() => console.log('In timeout')) (süreyi belirten) zamanlayıcı tamamlanana kadar Web API’sine eklenir. Zamanlayıcı için 0 değerini vermiş olsak da, callback yine de ilk olarak Web API’sine gönderilir, ardından (makro)task queue kısmına eklenir: setTimeOut bir makro tasktır!
![](https://miro.medium.com/max/700/1*a_X8_BfQGJ6oHR-XmuPGRQ.gif)
---

Engine, Promise.resolve() metoduyla karşılaşır. Promise.resolve() metodu call stack’e eklenir ve ardından Promise! value ile resolve edilir. Daha sonra thencallback fonksiyonu mikro task queue kısmına eklenir.
![](https://miro.medium.com/max/700/1*Q5xtSx914wUAo_msjNk8qQ.gif)
---

Engine, console.log() metoduyla karşılaşır. Call stack’e hemen eklenir ve ardından konsola value olarak End!loglanır, call stack’ten çıkar ve engine devam eder.   
![](https://miro.medium.com/max/700/1*H2QP7Ry7XCXDaD2dHkQYMw.gif)
---

Engine call stack’in artık boş olduğunu görür. Call stack boş olduğundan, mikro task queue sıraya alınmış tasklar olup olmadığını kontrol eder! Ve evet var, promise then callback metodu sırasını bekliyor! Call stack’e girer ve ardından promise resolve değerini loglar: bu durumda string bir Promise!
![](https://miro.medium.com/max/700/1*PfxpUO9FJYm05lzA792CrQ.gif)
---


Engine, call stack’in boş olduğunu görür, bu nedenle tüm taskların queue’ya alınıp alınmadığını görmek için mikro task queue kısmını bir kez daha kontrol eder. Hayır, artık mikro task queue tamamen boş.   
Şimdi (makro)task queue kontrol zamanı: setTimeOut callback hala orada bekliyor! setTimeOut callback, call stack’e atılır. Callback fonksiyonu, "In timeout!” string değerini log’layan console.log() metodunu return eder. setTimeOut callback, call stack’ten çıkarılır.
![](https://miro.medium.com/max/700/1*Eg9EkLzLfO0nZTpqNq9WCQ.gif)
Sonunda, hepsi bitti! Görünüşe göre daha önce gördüğümüz çıktı o kadar da beklenmedik değildi.
---

#Async/Await
ES7, JavaScript’e asenkron davranışlar eklemenin ve promise ile çalışmayı kolaylaştırmanın yeni bir yolunu tanıttı! Async ve await anahtar sözcüklerinin tanıtılmasıyla, implicitly bir promise return eden asenkron fonksiyonlar oluşturabiliriz. Ama… acaba bunu nasıl yapabiliriz?   
Daha önce, ister new Promise(() => {}), ister Promise.resolve() ya da Promise.reject() yazarak, Promise objesini explicit olarak oluşturabileceğimizi gördük.   
Promise objesini explicit olarak kullanmak yerine, artık bir objeyi implicitly olarak return eden asenkron işlevler oluşturabiliriz! Bu, artık kendi kendimize herhangi bir Promise objesi yazmak zorunda olmadığımız anlamına gelir.   
![](https://miro.medium.com/max/700/1*sqIthQ1juWT58fO2-NEyZA.png)
---

**Asenkron** fonksiyonların implicitly olarak promise return etmesi oldukça büyük bir şey olsa da, asyncfonksiyonların gerçek gücü await anahtar sözcüğünü kullanırken görülebilir! await anahtar sözcüğü ile, awaited olan değerin resolve edilmiş bir promise return etmesini beklerken asenkron işlevi askıya alabiliriz. Bu resolve olmuş promise değerini elde etmek istiyorsak, daha önce then() callback metodunda yaptığımız gibi, değişkenleri await promise değerine atayabiliriz!
Yani, bir asenkron fonksiyonu askıya alabilir miyiz? Tamam harika ama .. bu ne anlama geliyor?
Aşağıdaki kod bloğunu çalıştırdığımızda ne olacağını görelim:
![](https://miro.medium.com/max/700/1*lw0nQ2U3x91SONIb6NsEwA.gif)
---

Hmm… Burada neler oluyor?
![](https://miro.medium.com/max/700/1*3Cr4GVlDhn7klxLo0lCLIQ.gif)
---

İlk olarak, engine bir console.log() ile karşılaşır. Call stack’e girer ve Before function!loglandıktan sonra call stack’ten çıkarılır.
![](https://miro.medium.com/max/700/1*NSxKySz9aJnxfN_vMBiSvA.gif)
---

Daha sonra, bir asenkron fonksiyon olan myFunc() çağırırız, ardından myFuncfonksiyon gövdesi çalışır. Fonksiyon gövdesinin ilk satırında, bu sefer In function string ifadesiyle başka bir console.log() çağırıyoruz! console.log(), call stack’e eklenir, değeri loglar ve stack’ten çıkarılır.
![](https://miro.medium.com/max/700/1*anFbso5OvB9eJKvfBMdb0A.gif)
---

Fonksiyon gövdesi execute edilmeye devam ediyor, bu da bizi ikinci satıra götürüyor. Son olarak bir await anahtar kelimesi görüyoruz!  
İlk gerçekleşen şey, beklenen değerin execute edilmesidir: bu durumda one fonksiyonudur. Call stack’e girer, resolve olan bir promise retun eder ve call stack’ten çıkarılır. Promise resolve olduğunda ve one bir value return ettiğinde, engine await anahtar kelimesiyle karşılaşır.  
Bir await anahtar sözcüğüyle karşılaşıldığında, async fonksiyon askıya alınır. Fonksiyon gövdesinin execute edilmesi duraklatılır ve asenkron fonksiyonun geri kalanı normal bir task yerine bir mikro task’ta çalışır!  
![](https://miro.medium.com/max/700/1*anFbso5OvB9eJKvfBMdb0A.gif)
---

Artık asenkron fonksiyon olan myFunc, await anahtar sözcüğüyle karşılaştığında askıya alındığına göre, engine asenkron fonksiyonu atlar ve asenkron fonksiyonun çağrıldığı execution context’inden kodu yürütmeye devam eder: bu durumda, global execution context!
![](https://miro.medium.com/max/700/1*Pp1SvDj6KHpM8Q3PgTkHbQ.gif)
---

Son olarak, global execution context’te çalıştırılacak başka task yok! Event loop, queue’ya alınmış mikro task olup olmadığını kontrol eder: ve vardır! Asenkron myFuncfonksiyonu, one fonksiyonunun değerini resolve ettikten sonra queue’ya alınır. myFunc, call stack’e geri döner ve daha önce kaldığı yerden çalışmaya devam eder.   

res değişkeni nihayet değerini, yani one fonksiyonunun return ettiği resolve olmuş promise’ın değerini alır! console.log()’u res değeriyle çağırıyoruz: Bu örnekte değeri One! olan bir string! One!konsolda loglanır ve call stack’ten çıkar!   

Sonunda, hepsi bitti! async fonksiyonların bir promise thenile karşılaştırıldığında ne kadar farklı olduğunu fark ettiniz mi? await anahtar sözcüğü asenkron fonksiyonu askıya alırken, Promise gövdesini then ile kullansaydık execute edilmeye devam ederdi!   

Hmm oldukça fazla bilgi edindik! Promise ile çalışırken hala biraz kafa karışıklığı hissediyorsanız endişelenmeyin, kişisel olarak asenkron JavaScript ile çalışırken pattern’leri fark etmenin ve kendinizden emin hissetmenin deneyim gerektirdiğini hissediyorum.   

Ancak, asenkron JavaScript ile çalışırken karşılaşabileceğiniz ‘beklenmedik’ veya ‘öngörülemeyen’ davranışların şimdi biraz daha mantıklı gelmesini umuyorum!   


[Ingilizce Versiyonu](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)
