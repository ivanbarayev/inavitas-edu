JavaScript harikadır! (Yoruma kapalı) ancak makine yazdığınız kodu gerçekten nasıl algılayabilir? JavaScript geliştiricileri olarak, genelde derleyicilerle kendimiz uğraşmak zorunda değiliz, ancak JavaScript motorunun temellerine aşina olmak, bizim kullanıcı dostu kodumuzu nasıl işlediğini ve makinenin anladığı bir şeye dönüştürdüğünü bilmek kesinlikle iyidir.
>Not: Bu yazı esas olarak Node.js ve Chromium tabanlı tarayıcılar tarafından kullanılan V8 motoruna dayanmaktadır.
HTML parser kaynağı script olan bir tag ile karşılaşır. Bu kaynaktan gelen kod, network, cache veya daha önce kurulmuş bir service worker tarafından yüklenir. Cevap, byte stream decoder tarafından halledilen bir byte akışı script dosyasıdır. Byte stream decoder, byte akışının indirilirken tüm byte kodlarını çözer.


![](https://miro.medium.com/max/1400/1*lVlyPG5zcV8QwibzDcInjA.gif)


---
Byte stream decoder, kodu çözülen byte akışından token’lar oluşturur. Örneğin 6600 f, 7500 u, 006e n, 0063 c, 0074 t, 0069 i, 006f o ve 006e n olarak çözülür ve ardından bir boşluk eklenir. Görünüşe göre function yazdınız! Bu sözcük JavaScript’te bir rezerv anahtar sözcüktür, bir token oluşturulur parser’a gönderilir ( gif’lerde bahsetmediğim ama daha sonra ele alacağım pre-parser’a gönderilir) Aynı şey geri kalan byte akışına da uygulanır.
![](https://miro.medium.com/max/700/1*bsRaJ6Z8C49x5r-17SAJgw.gif)  

---
JavaScript motoru biri pre-parser diğeriyse parser olmak üzere iki farklı parser kullanır. Bir web sitesini yüklemek için gereken süreyi azaltmak için, motor hemen gerekli olmayan kodu parse etmekten kaçınır. Pre-parser daha sonra kullanılabilecek kodu, parser hemen gerekli olan kodu işler. Belirli bir fonksiyon yalnızca bir kullanıcı bir düğmeyi tıklattıktan sonra invoke edilirse, bir web sitesini yüklemek için yalnızca bu kodun derlenmesi gerekmez. Eğer kullanıcı sonunda düğmeyi tıklayıp bu kod parçasını isterse, parser’a gönderilir.
Parser, byte stream decoder’dan aldığı tokenları temel alarak düğümler oluşturur. Bu düğümlerle bir Abstract Syntax Tree veya AST oluşturur.
![](https://miro.medium.com/max/700/1*xkQWeCyjUnzHbmSe4a7wqg.gif)  

---
Sonraki adım. sırada interpreter zamanı. Interpreter AST’de dolaşan ve AST’nin içerdiği bilgilere dayanarak bytecode üreten bir yorumlayıcıdır. Bytecode tamamen oluşturulduktan sonra AST silinir ve bellek tamamen temizlenir. Sonunda, makinenin üzerinde çalışabileceği bir şeyimiz var!
![](https://miro.medium.com/max/700/1*nPjchPfajguLtxHpsVTgog.gif)

---
Bytecode hızlı olmasına rağmen, daha da hızlı olabilir. Bu bytecode çalıştıkça bazı bilgiler üretir. Belirli davranışların sık sık meydana gelip gelmediğini ve kullanılan veri türlerini tespit edebilir. Belki bir fonksiyonu defalarca çağırıyorsunuz: bunu optimize etmenin zamanı geldi! böylece kodumuz daha da hızlı çalışacak.
Bytecode, oluşturulan type geribildirimi ile birlikte, optimizing compiler’a gönderilir. Optimizing compiler byte code ve type geri bildirimini alır ve bunlardan yüksek düzeyde optimize edilmiş makine kodu üretir.
![](https://res.cloudinary.com/practicaldev/image/fetch/s--gsKbgaq7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/ongt4qftovd82sp2vihk.gif)  

---
JavaScript dynamically typed bir dildir, yani veri tipleri sık sık değişebilir. JavaScript motoru, her defasında belirli bir değerin o an hangi veri tipine sahip olduğunu kontrol etmek durumunda kalsaydı son derece yavaş çalışırdı.
Kodu interpret etmek için gereken süreyi azaltmak için, optimize edilmiş makine kodu sadece bytecode çalıştırırken JavaScript motorunun daha önce gördüğü durumları ele alır. Aynı veri tipini sürekli return eden belirli bir kod parçasını tekrar tekrar kullandıysak, optimize edilmiş makine kodu işlemleri hızlandırmak için yeniden kullanılabilir. Bununla birlikte, JavaScript dynamically typed olarak yazıldığından, aynı kod parçasının aniden farklı tip bir veri return etmesi muhtemeldir. Böyle bir durum olursa, makine kodu tekrar optimize edilir ve motor, üretilen bytecode tekrar yorumlamaya geri döner.
Belirli bir fonksiyonun 100 kez invoke edildiğini ve şimdiye kadar her zaman aynı değeri döndürdüğünü varsayalım. 101. kez invoke edildiğinde bu değeri de aynı döndüreceğini varsayar.
Diyelim ki aşağıdaki toplama fonksiyonuna sahibiz, bu (şimdiye kadar) her zaman argüman olarak sayısal değerlerle çağrıldı:  
![](https://miro.medium.com/max/612/1*5ScBBSO5Xd1P4vhrxC6o-g.png)  

---
Burada 3 sayısı return edilir. Bir dahaki sefere çağırdığımızda, tekrar iki sayısal değerle çağırdığımızı varsayar.
Eğer bu doğruysa, dinamik arama yapmak gerekmez ve optimize edilmiş makine kodunu yeniden kullanabiliriz. Aksi takdirde, varsayım yanlışsa, optimize edilmiş makine kodu yerine orijinal bytecode kısmına geri döner.
Örneğin, bir sonraki invoke ettiğimizde sayı yerine bir string kullanabiliriz. JavaScript dynamically typed olduğundan, bunu hata almadan yapabiliriz!  
![](https://miro.medium.com/max/612/1*t9HUJw8embWtleSS--gv2w.png)  

---
Bu, 2 sayısının bir string coercion’a maruz kalacağını ve fonksiyon yerine ‘12’ string değerini return edeceği anlamına gelir. Yorumlanan bytecode execute etmeye geri döner ve tip geri bildirimini günceller.
Umarım bu yazı sizin için yararlı olmuştur. Tabii ki, bu yazıda ele almadığım (daha sonra alabileceğim) JavaScript motorunun başka birçok kısmı var ( JS heap, callstack vb) JavaScript’in iç kısımlarıyla ilgileniyorsanız, kendiniz biraz araştırma yapmaya başlamanızı kesinlikle tavsiye ederim. V8 açık kaynaktır ve arka planda nasıl çalıştığını anlatan harika bir dökümantasyona sahiptir.
V8 Docs || V8 Github || Chrome University 2018: Life Of A Script

[Ingilizce Versiyonu](https://dev.to/lydiahallie/javascript-visualized-the-javascript-engine-4cdf)
