Event Loop. Her JavaScript geliştiricisinin bir şekilde başa çıkması gereken şeylerden biridir, ancak ilk başta anlamak biraz kafa karıştırıcı olabilir. Ben görsel bir öğreniciyim, bu yüzden bu konuyu düşük çözünürlüklü gifler aracılığıyla (2019 yılındayız ve gifler nedense hala düşük çözünürlüklü ve bulanıklar.) size görsel olarak açıklamayı düşündüm.  

Ilk olarak, event loop nedir ve neden önemsemelisiniz?  

JavaScript **single thread bir dildir**: Yani aynı anda sadece tek iş yapabilir. Genellikle bu çok önemli değildir, ancak şimdi 30 saniye süren bir görev yürüttüğünüzü hayal edin… Bu iş esnasında başka bir şey olmadan 30 saniye bekleriz. (JavaScript varsayılan olarak browser ana thread kısmında çalışır, yani tüm arayüz beklemede kalır.) 2019 yılındayız, kimse yavaş ve cevap vermeyen bir web sayfası istemez.  

Neyse ki, tarayıcı bize JavaScript motorunun sağlamadığı bazı özellikler sunuyor: bir Web API. Buna DOM API, setTimeout, HTTP istekleri vb. dahildir. Bu bizim bazı asenkron ve arayüzü bloklamayan işlemler yapmamıza yardım eder.  

Bir function çağırdığımızda, call stack adı verilen bir bölüme eklenir. Call stack, JavaScript motorunun bir parçasıdır, tarayıcıya ait değildir. Bu stack, ilk giren son çıkar şeklinde çalışır (bir yığın pankek düşünün). Function bir value return ettiğinde stack’ten çıkarılır.  
![](https://miro.medium.com/max/700/1*BQ0QuqGwpcZCGVnbshr_ng.gif)
---

function respond() bir setTimeOut return eder. setTimeOut function bize Web API tarafından sağlanır: bu bize main thread’i engellemeden gecikmeli işlemler yapabilme olanağı sağlar. setTimeOut’a gönderdiğimiz callback function, arrow function ile ``() => { return 'Hey' }`` Web API kısmına eklenir. Bu arada, setTimeOut function ve respond function stack’ten çıkarılır ve ikisi de kendi value değerini return eder.
![](https://miro.medium.com/max/700/1*U-jSWrn_vKdjdCpz0JaIhQ.gif)
---

Web API’da bir zamanlayıcı, kendisine gönderdiğimiz ikinci argüman olan 1000ms boyunca çalışır. Callback function, hemen call stack’e eklenmez, bunun yerine queue (yada callback queue) denen bir sıraya alır.
![](https://miro.medium.com/max/700/1*uxMxZ6y6lzLCVP4bTiYEow.gif)
---

Bu kısım kafa karıştırıcı olabilir: Bu 1000ms sonra callback function callstack’e eklenir demek değildir (böylece value return eder) Sadece 1000ms sonra queue bölümüne eklenir. Ama neticede bu bir kuyruk, function sırasını beklemek zorunda!  

Şimdi sırada hepimizin beklediği bölüm… Event loop’un görevini yapma zamanı: **callback queue’yu call stack’e bağlamak**. Call stack boşsa, daha önce invoke ettiğimiz functionlar değerlerini return ettiyse ve callstack’ten çıkarıldıysa, callback queue kısmındaki ilk öğe call stack’e eklenir. Bu örnekte, başka bir function invoke edilmedi yani callstack o an boştu ve callback function queue kısmındaki ilk öğeydi.
![](https://miro.medium.com/max/700/1*flj3SyshFtfLiuVzVw3ypQ.gif)
---

Callback call stack’e eklendi, invoke edildi, bir value return etti ve call stack’ten silindi.
![](https://miro.medium.com/max/700/1*VdOD_VVf9WQoUFnYnI9KvQ.gif)
---

Makale okumak eğlencelidir, ancak bununla sadece tekrar tekrar çalışarak tamamen baş edebilirsiniz. Aşağıdaki kodları çalıştırırsak konsolda neleri yazdıracağını anlamaya çalışın.
````javascript
const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second"), 500);
const baz = () => console.log("Third");

bar();
foo();
baz();
````
Anladınız mı? Şimdi tarayıcıda bu kodları çalıştırdığımızda neler olduğuna hızlıca bir göz atalım.
![](https://miro.medium.com/max/700/1*7coLKNPemPd9o40PmUvuvQ.gif)
---

1. function bar invoke edildi. bar bir setTimeOut return etti.
2. setTimeOut’a gönderdiğimiz callback function Web API bölümüne eklendi, setTimeOut ve bar function call stack’ten çıkarıldı.
3. timer çalıştı, bu arada foo invoke edildi ve konsola First yazdırıldı. foo undefined return etti, ardından baz invoke edildi ve callstack kısmına eklendi.
4. baz konsola Third yazdırdı, baz return edildikten sonra event loop call stack’in boş olduğunu gördü ve callback call stack kısmına eklendi.
5. Callback konsola Second yazdırdı.


[Ingilizce Versiyonu](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)
