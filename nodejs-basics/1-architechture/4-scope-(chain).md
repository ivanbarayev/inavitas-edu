Aşağıdaki koda bir göz atalım:   

````javascript
const name = "Lydia"
const age = 21
const city = "San Francisco"


function getPersonInfo() {
    const name = "Sarah"
    const age = 22

    return `${name} is ${age} and lives in ${city}`
}

console.log(getPersonInfo())
````
````
output : Sarah is 22 and lives in San Francisco
````

name, age, city değişkenlerini içeren ve bir string return eden getPersonInfo fonksiyonunu invoke ediyoruz: Sarah is 22 and lives in San Francisco, ancak getPersonInfo fonksiyonu city isimli değişkene sahip değildi. city değişkeninin değerini nasıl bilebildi?   

Ilk olarak, farklı contextler için bellek ayarlanır. Varsayılan olarak global context (browser için windows, node için global) ve invoke ettiğimiz getPersonInfo için local context oluşturulur. Ayrıca her context kendine ait scope chain’e sahiptir.   

getPersonInfo fonksiyonu için oluşturulan scope chain şuna benzer (henüz mantıklı gelmediği için endişelenmeyin)   
![](https://miro.medium.com/max/700/1*UgNYLohoB68-_VHmp36Www.png)
---

Scope chain temel olarak, oluşturulan execution context içerisindeki referans verilebilen değerlere (ve diğer scope kısımlarına) ve referanslar içeren objelere ait “referanslar zinciri” olarak tanımlanabilir (bir nevi “hey, bu context içerisinde referans edebileceğin tüm değerler bunlar” demek). Scope chain, execution context oluşturulduğunda oluşturulur, yani bu demektir ki runtime anında oluşturulur.  
Ancak, genel olarak activation object yada execution context’ten bu yazıda bahsetmeyeceğim, sadece scope konusuna odaklanalım! Aşağıdaki örneklerde, execution context içerisindeki key / value değerleri, scope chain’in sahip olduğu değerlerin referansını temsil eder.
![](https://miro.medium.com/max/700/1*j4BGw8j2ybVuKT_0BMalYA.png)
---

Global execution context’e ait scope chain 3 adet değişkene referans eder: Lydia değerine sahip name, 21 değerine sahip age ve San Fransisco değerine sahip city. Local context kısmında 2 adet değişkene referans vardır: Sarah değerine sahip name ve 22 değerine sahip age.
getPersoninfo içerisindeki değişkenlere ulaşmaya çalıştığımızda, JavaScript motoru önce local context’teki scope chain’i kontrol eder.
![](https://miro.medium.com/max/700/1*42SEvZP8ZtBNkhAtjsYDyA.gif)
---

Local scope chain name ve age değişkenlerine ait referanslara sahiptir. name Sarah değerine ve age 22 değerine sahiptir. Ancak, city değişkenine ulaşmaya çalıştığımızda ne olacak?  

JavaScript motoru city değişkenine ait değeri bulmak için scope chain içerisinde “aşağılara” iner. Bu basitçe, JavaScript kolayca pes etmez anlamına gelir: local scope’da referans verilen city değişkeni için dıştaki scope’da bir değer olup olmadığını kontrol etmek için çok çalışır (bu örnekte global scope)
![](https://miro.medium.com/max/700/1*42SEvZP8ZtBNkhAtjsYDyA.gif)
---


Global context’te, ismi city ve değeri San Fransisco olan bir değişken oluşturduk böylece referansı da city değişkenine atanmış oldu. Şimdi değişkene ait bir değerimiz var, getPersonInfo fonksiyonu Sarah is 22 and lives in San Fransisco string değerini return edebilir.  

Scope chain içerisinde aşağı inebiliriz ancak yukarıya çıkamayız. Bu kısım biraz kafa karıştırıcı olabilir çünkü bazıları aşağı yerine yukarı demeyi tercih edebiliyor, bu yüzden yeniden tanımlayacağım: bulunduğunuz scope’tan daha dışarıdaki scope kısımlarına gidebilirsiniz ancak daha içerideki scope kısımlarına inemezsiniz. Bunu bir tür şelale gibi görselleştirmeyi seviyorum
![](https://miro.medium.com/max/700/1*ANuR-SZaHhe0Fwj1b5emJw.png)
---

Ya da daha derine;  
![](https://miro.medium.com/max/700/1*z62OzkPtIugUHqrN66Df5Q.png)
---

Örnek olarak aşağıdaki kodu ele alalım.  
![](https://miro.medium.com/max/700/1*tDErh-NTdrZZv3RM5I2YuQ.png)
---


Nerdeyse aynı, ancak çok büyük bir fark var: bu sefer city değişkenini global scope içerisinde değil getPersonInfo fonksiyonunun içinde tanımladık. Ayrıca getPersonInfo fonksiyonunu invoke etmedik bu yüzden local execution context de oluşturulmadı. Buna rağmen global context’te name age ve city değişkenlerinin değerlerine ulaşmaya çalıştık.
![](https://miro.medium.com/max/700/1*_9R_CBnflSuuOnu1A1qmKA.gif)
---

Global scope’da city isminde bir değişkene ait referans değeri bulamadı. Bakabileceği daha dış bir scope olmadığı için ve çıkabileceği daha üst bir scope chain de bulunmadığı için ReferenceError hatası gönderdi.  

Bu şekilde, scope kavramını değişkenlerini korumak ve değişken isimlerini tekrar kullanabilmek için kullanabilirsiniz.  

Global ve local scope yanısıra bir de block scope vardır. let ve const olarak tanımlanan değişkenler en yakın süslü parantez ile scope oluşturur {}  

````javascript
const age = 21

function checkAge() {
    if (age < 21) {
        const message = "You cannot drink!"
        return message
    } else {
        const message = "You can drink!"
        return message
    }
}
````
Bu şekilde scope kavramını görselleştirebilirsiniz.
![](https://miro.medium.com/max/700/1*fDuMYUiirscY3FQDiW7Vsw.png)

Burada Global scope, function scope ve iki adet block scope var. Değişkenler süslü parantez içerisinde tanımlandığından message değişkenini iki kez tanımlayabildik.  

Hızlıca özetlemek gerekirse;   
1- Scope chain’i o anki context içerisindeki değerlere ulaşabildiğimiz referanslar zinciri olarak görebiliriz.
2- Scope daha önce tanımlanmış değişken isimlerini de aşağılarda kullanmaya olanak sağlar. Çünkü scope zinciri yukarı değil sadece aşağı yönlü hareket eder.
