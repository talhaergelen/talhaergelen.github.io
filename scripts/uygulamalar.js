/**
 * Uygulamalar — Tek Sayfa JavaScript
 *
 * 3 ana bölüm:
 *   1) Tab geçiş fonksiyonu
 *   2) Uygulama-1: Öğrenci Not Hesaplama
 *   3) Uygulama-2: Birim Dönüştürücü
 */


/* ================================================
   BÖLÜM 1: TAB GEÇİŞ FONKSİYONU
   ================================================ */

/**
 * Tab butonuna tıklanınca ilgili içeriği gösterir,
 * diğerini gizler.
 *
 * @param {string} tabId - Gösterilecek tab'ın id'si ("uygulama1" veya "uygulama2")
 */
function tabDegistir(tabId) {
    // 1) Tüm tab içeriklerinden "active" sınıfını kaldır
    var tumIcerikler = document.querySelectorAll(".tab-icerik");
    for (var i = 0; i < tumIcerikler.length; i++) {
        tumIcerikler[i].classList.remove("active");
    }

    // 2) Tüm tab butonlarından "active" sınıfını kaldır
    var tumButonlar = document.querySelectorAll(".tab-btn");
    for (var j = 0; j < tumButonlar.length; j++) {
        tumButonlar[j].classList.remove("active");
    }

    // 3) Tıklanan tab'ın içeriğine "active" sınıfını ekle
    document.getElementById(tabId).classList.add("active");

    // 4) Tıklanan butona "active" sınıfını ekle
    if (tabId === "uygulama1") {
        document.getElementById("tab1Btn").classList.add("active");
    } else {
        document.getElementById("tab2Btn").classList.add("active");
    }
}


/* ================================================
   BÖLÜM 2: UYGULAMA-1 — ÖĞRENCİ NOT HESAPLAMA
   ================================================ */

/**
 * Vize ve Final notlarından ortalama hesaplar,
 * harf notuna çevirir ve geçti/kaldı durumunu gösterir.
 *
 * Formül: Ortalama = (Vize × 0.40) + (Final × 0.60)
 * Durum : Ortalama >= 50 ise "Geçti", değilse "Kaldı"
 */
function notHesapla() {
    // 1) Form alanlarından değerleri al
    var adSoyad  = document.getElementById("adSoyad").value.trim();
    var vizeStr  = document.getElementById("vizeNotu").value.trim();
    var finalStr = document.getElementById("finalNotu").value.trim();

    // 2) Boş alan kontrolü
    if (adSoyad === "" || vizeStr === "" || finalStr === "") {
        alert("Lütfen tüm alanları doldurunuz!");
        return;
    }

    // 3) String'den sayıya çevir
    var vize   = parseFloat(vizeStr);
    var finalN = parseFloat(finalStr);

    // 4) Geçerli sayı kontrolü
    if (isNaN(vize) || isNaN(finalN)) {
        alert("Vize ve Final notları sayı olmalıdır!");
        return;
    }

    // 5) 0–100 aralık kontrolü
    if (vize < 0 || vize > 100 || finalN < 0 || finalN > 100) {
        alert("Notlar 0 ile 100 arasında olmalıdır!");
        return;
    }

    // 6) Ortalamayı hesapla: Vize %40 + Final %60
    var ortalama = (vize * 0.40) + (finalN * 0.60);

    // 7) Harf notunu belirle
    var harfNotu = harfNotunuBul(ortalama);

    // 8) Geçti / Kaldı durumunu belirle
    var durum = (ortalama >= 50) ? "Geçti" : "Kaldı";

    // 9) Sonuçları HTML'e yaz
    document.getElementById("sonucIsim").textContent     = adSoyad;
    document.getElementById("sonucOrtalama").textContent  = "Ortalama: " + ortalama.toFixed(2);
    document.getElementById("sonucHarfNotu").textContent  = "Harf Notu: " + harfNotu;
    document.getElementById("sonucDurum").textContent     = "Durum: " + durum;

    // 10) Durum rengini ayarla
    var durumEl = document.getElementById("sonucDurum");
    durumEl.className = "";
    if (durum === "Geçti") {
        durumEl.classList.add("durum-gecti");
    } else {
        durumEl.classList.add("durum-kaldi");
    }

    // 11) Sonuç alanını görünür yap
    document.getElementById("notSonuc").style.display = "block";
}


/**
 * Ortalamaya göre harf notunu döndürür.
 *
 *   90–100 → AA     50–59 → CC
 *   80–89  → BA     40–49 → DC
 *   70–79  → BB     30–39 → DD
 *   60–69  → CB     20–29 → FD
 *                    0–19  → FF
 *
 * @param {number} ort - Ortalama notu
 * @returns {string}   - Harf notu
 */
function harfNotunuBul(ort) {
    if (ort >= 90) return "AA";
    if (ort >= 80) return "BA";
    if (ort >= 70) return "BB";
    if (ort >= 60) return "CB";
    if (ort >= 50) return "CC";
    if (ort >= 40) return "DC";
    if (ort >= 30) return "DD";
    if (ort >= 20) return "FD";
    return "FF";
}


/* ================================================
   BÖLÜM 3: UYGULAMA-2 — BİRİM DÖNÜŞTÜRÜCÜ
   ================================================ */

/**
 * Verilen değeri seçilen dönüşüm tipine göre çevirir.
 *
 * Desteklenen dönüşümler:
 *   Sıcaklık — Celsius↔Fahrenheit, Celsius→Kelvin
 *   Uzunluk  — Metre↔Kilometre, Kilometre↔Mil
 *   Ağırlık  — Kilogram↔Gram
 *
 * @param {number} deger - Kullanıcının girdiği sayısal değer
 * @param {string} tip   - Dönüşüm tipi (ör: "celsius-fahrenheit")
 * @returns {number}     - Dönüştürülmüş sonuç
 */
function donustur(deger, tip) {
    switch (tip) {
        /* --- SICAKLIK --- */
        case "celsius-fahrenheit":
            return (deger * 9 / 5) + 32;        // F = C × 9/5 + 32

        case "fahrenheit-celsius":
            return (deger - 32) * 5 / 9;         // C = (F − 32) × 5/9

        case "celsius-kelvin":
            return deger + 273.15;               // K = C + 273.15

        /* --- UZUNLUK --- */
        case "metre-kilometre":
            return deger / 1000;                 // km = m / 1000

        case "kilometre-metre":
            return deger * 1000;                 // m  = km × 1000

        case "kilometre-mil":
            return deger / 1.60934;              // mil = km / 1.60934

        case "mil-kilometre":
            return deger * 1.60934;              // km  = mil × 1.60934

        /* --- AĞIRLIK --- */
        case "kilogram-gram":
            return deger * 1000;                 // g  = kg × 1000

        case "gram-kilogram":
            return deger / 1000;                 // kg = g  / 1000

        default:
            return 0;
    }
}


/**
 * Birim dönüştürücü hesaplama fonksiyonu.
 * Inputtan değeri, dropdown'dan tipi okur,
 * dönüşümü yapar ve sonucu kutuya yazar.
 */
function birimHesapla() {
    // 1) Input değerini al
    var degerStr = document.getElementById("deger").value.trim();

    // 2) Boşluk kontrolü
    if (degerStr === "") {
        alert("Lütfen bir değer giriniz!");
        return;
    }

    // 3) Sayıya çevir
    var deger = parseFloat(degerStr);

    // 4) Geçerli sayı kontrolü
    if (isNaN(deger)) {
        alert("Lütfen geçerli bir sayı giriniz!");
        return;
    }

    // 5) Seçilen dönüşüm tipini al
    var tip = document.getElementById("donusumTipi").value;

    // 6) Dönüşümü yap
    var sonuc = donustur(deger, tip);

    // 7) Sonucu 3 ondalık basamakla göster
    document.getElementById("birimSonuc").textContent = "Sonuç: " + sonuc.toFixed(3);
}
