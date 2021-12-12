#Prototypal Inheritance
String, array yada objelerle birlikte .length .join() .split()gibi built-in metodları nasıl kullanabildiğimizi hiç merak ettiniz mi? Hiçbirini önceden açık bir şekilde tanımlamadık, peki nereden geldi bunlar? Sakın “JavaScript bu, kimse bilmiyor, sihir işte” demeyin. Bu özünde “prototypal inheritance” denen bir kavramdan geliyor. Bu müthiş bir şey aslında ve tahmin ettiğinizden çok daha fazla kullanıyorsunuz.  

Genellikle aynı tipten birçok obje yaratmamız gerekir. İnsanların köpekleri görebileceği bir web sitemiz olduğunu varsayalım.   
Her köpek için, o köpeği temsil eden objeye ihtiyacımız var. Her seferinde yeni bir obje yazmak yerine, new anahtar sözcüğünü kullanarak her defasında bir köpek türü için instance alabileceğimiz bir constructor fonksiyon yazacağım (Ne düşündüğünüzü biliyorum, ES6 class kavramını sonra dahil edeceğim, ayrıca bu yazıda constructor fonksiyonlardan da kısaca bahsedeceğim)   

Her köpeğin bir adı, cinsi, rengi ve havlama işlevi vardır.
![](https://miro.medium.com/max/700/1*Em4hBqBgO-NbzFicb_EReg.png)
---

Dog constructor fonksiyonunu yarattığımızda, yarattığımız tek obje bu değildi. Otomatik olarak, prototype adı verilen başka bir obje daha oluşturduk! Varsayılan olarak, bu obje yalnızca orijinal constructor fonksiyonuna (bu durumda Dog) referans olan bir kurucu property içerir.
![](https://miro.medium.com/max/700/1*yNmwnQVXFmbuam9M7y6SKw.gif)
---

Dog constructor fonksiyonundaki prototypeproperty non-enumerable olarak geçer, yani objelerin özelliklerine erişmeye çalıştığımızda görünmez. Ama hala oradadır.  

Pekala. Neden bu property objesine sahibiz? İlk olarak, göstermek istediğimiz bazı köpekleri yaratalım. Basit tutmak için onlara dog1 ve dog2diyeceğim. dog1Daisy, sevimli bir siyah Labrador! dog2korkusuz beyaz Jack Russell.
![](https://miro.medium.com/max/654/1*Fj84cWXCoTuRgdgK10Dlbw.png)
---

``dog1`` konsola yazdıralım ve property bölümünü açalım.
![](https://miro.medium.com/max/700/1*MmuKOcHFGuQ0NMA8GxyQ1w.gif)
---

``name``, ``breed``, ``color`` ve ``bark`` gibi eklediğimiz property’leri görüyoruz … Ama o da ne? ``__proto__`` özelliği de nedir? Bu non-enumerable’dır, yani obje üzerindeki property’leri almaya çalıştığımızda genellikle görünmez. Bunu da açalım.
![](https://miro.medium.com/max/700/1*grZVNkf1th9JXL1bzMJ9ZQ.gif)
---


Tam olarak ``Dog.prototype`` objesine benziyor. Aslında, ``__proto__`` Dog.prototype objesinin bir referansıdır. Prototypal inheritance tam olarak budur: her instance, constructor prototipine erişebilme imkanı vardır.
![](https://miro.medium.com/max/700/1*frMfGw-gfwdQGTvJGw7JVQ.gif)
---

Peki, bunun önemi nedir? Bazen tüm instance’ların paylaştığı property’ler olur. Örneğin, bu durumda bark fonksiyonu: her instance için aynıdır, her yeni Dog yarattığımızda neden her seferinde bellek tüketen yeni bir fonksiyon oluşturalım ki? Bunun yerine, Dog.prototype objesine ekleyebiliriz!
![](https://miro.medium.com/max/700/1*hV2JxSvnzyXs6IBrmShYBw.gif)
---

instancedaki bir özelliğe erişmeye çalıştığımızda, JavaScript motoru öncelikle özelliğin objenin kendisinde tanımlı olup olmadığını görmek için lokal olarak arama yapar. Ancak erişmeye çalıştığımız özelliği bulamazsa, JavaScript motoru __proto__ özelliği aracılığıyla prototip zincirinde aşağı doğru ilerler!
![](https://miro.medium.com/max/700/1*rUT8NFflrl3tBp6VIR-H1g.gif)
---

Şimdi bu sadece bir adım, ancak birkaç adım da içerebilir. Devam ettiyseniz, Dog.prototype’ı gösteren __proto__objesini genişlettiğimde bir property eklemediğimi fark etmiş olabilirsiniz. Dog.prototype’ın kendisi bir objedir, yani aslında Objeconstructor’ının bir instance örneğidir. Yani bu Dog.prototype’ın ayrıca Object.prototype’a referans eden bir __proto__ property içerdiği anlamına gelir.
![](https://miro.medium.com/max/700/1*O5ub4hOoSngrhtsVY7XAuA.gif)
---

Sonunda, tüm built-in metodların nereden geldiğine dair bir cevabımız var: hepsi prototype zincirindeler!  
Örnek olarak .toString() metodu. dog1 objesinde lokal olarak tanımlanmış mı? Hayır… dog1.__proto__objesinde tanımlanmış mıdır? yani dog1.prototype? o da hayır… Dog.prototype.__proto__ objesinde tanımlanmış mıdır, yani Object.prototype? Evet!
![](https://miro.medium.com/max/700/1*JraiQJjncnCi4zYgzNb66w.gif)
---

Şimdi, biz hala geçerli bir JavaScript kullanımı olan constructor fonksiyonlarını (``function Dog() { ... }``) kullanıyoruz. Bununla birlikte, ES6 aslında constructor fonksiyonlar ve prototiplerle çalışmak için daha kolay bir syntax getirdi: Class’lar!
>Class’lar yalnızca constructor fonksiyonlar için syntactical sugar diye geçen bir syntax kolaylaştırıcıdır. Yani her şey hala aynı şekilde çalışıyor!   

Class’ları ``class`` keywordu ile yazıyoruz. Bir class’ın bir constructor fonksiyonu vardır, bu kısaca ES5 ile yazdığımız constructor fonksiyonudur. Prototipe eklemek istediğimiz property’ler class gövdesinin içerisinde tanımlanmaktadır.
![](https://miro.medium.com/max/700/1*HVBE7JzOK3GosfIFViWgFQ.gif)
---
Class’larla ilgili diğer bir harika şey ise, diğer class’lara kolayca extend edebilmemizdir.  

Diyelim ki, aynı cinsten birkaç köpek görmek istediğimizi söyleyelim, örneğin Chihuahua’lar. Bir chihuahua (bir şekilde…) hala köpektir. Bu örneği basit tutmak adına, şimdilik name, breed ve coloryerine sadece namepropertysini Dog class’ına aktaracağım. Ancak bu chihuahua’lar özel bir şeyler de yapabilir, küçük birer woof! (havlamaları) vardır. Woof!(Hav!) demek yerine bir chihuahua ancak Small woof!(küçük hav!) diyebilir.  

Extend edilmiş bir class’ta, superanahtar kelimesini kullanarak ana class’ın constructor’ına erişebiliriz. Ana class’ın constructor’ının beklediği argümanlar bu durumda super: name’e geçmemiz gerekir.`   
![](https://miro.medium.com/max/700/1*sw1F8Sggpvt7xYunWuKA0A.png)
---

``myPet``’in hem ``Chihuahua.prototypehem`` de ``Dog.prototype`` (ve ``Dog.prototype`` bir obje olduğu için otomatik olarak Object.prototype)'a erişimi vardır.
![](https://miro.medium.com/max/700/1*G2ouiTIxwmNorxQIva2ILw.gif)
---

``Chihuahua.prototype``, smallBark fonksiyonuna ve Dog.prototype, bark fonksiyonuna sahip olduğundan, myPet‘de hem smallBark hem de bark’a erişebiliriz!
Şimdi tahmin edebileceğiniz gibi, prototip zinciri sonsuza kadar devam etmiyor. Sonunda, prototipi null’a eşit olan bir obje var: bu durumda Object.prototype objesi! lokal olarak veya prototip zincirinde bulunmayan bir özelliğe erişmeye çalışırsak, sonuç undefined return eder.
![](https://miro.medium.com/max/700/1*jXf127N5om-QKbCbgBnJ4Q.gif)
---

Burada her şeyi constructor fonksiyonlar ve classlarla açıklasam da, objelere prototip eklemenin bir başka yolu da Object.create metodudur. Bu yöntemle yeni bir obje oluşturuyoruz ve bu objenin prototipinin tam olarak ne olması gerektiğini belirleyebiliyoruz!  

Bunu, mevcut bir objeyi argüman olarak Object.create metoduna ileterek yapıyoruz. Bu nesne, yarattığımız nesnenin prototipidir!
![](https://miro.medium.com/max/700/1*rpaliqJduVp64DPPqP1sDQ.png)
---

Az önce oluşturduğumuz me objesini konsola yazdıralım.
![](https://miro.medium.com/max/700/1*pFEJwpSf_APK7GphXHF8Ng.gif)
---

``me`` objesine herhangi bir property eklemedik, sadece non-enumerable ``__proto__`` property’sini içeriyor! ``__proto__`` property’si, prototip olarak tanımladığımız objeye bir referans tutar: bir name ve bir age property’lerine sahip person objesi. personobjesi bir obje olduğundan, person objesindeki ``__proto__`` property’sinin değeri Object.prototype’dir. (ancak okumayı biraz kolaylaştırmak için, bu özelliği gif’te genişletmedim!)

[Ingilizce Versiyonu](https://dev.to/lydiahallie/javascript-visualized-prototypal-inheritance-47co)
