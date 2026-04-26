/**
 * Hafta 7 — JavaScript Etkileşimleri
 *
 * İki ana etkileşim:
 *   1) Tema değiştirme  (Dark / Light toggle)
 *   2) Form verilerinden başvuru özeti üretme
 *
 * Kullanılan DOM yöntemleri:
 *   - document.getElementById()
 *   - document.querySelector()
 *   - addEventListener("click", ...)
 *   - addEventListener("submit", ...)
 *   - event.preventDefault()
 *   - .value ile form verisi okuma
 *   - innerHTML ile sonuç alanına içerik basma
 *   - classList.toggle() ile tema değiştirme
 */


/* ================================================
   BÖLÜM 1: TEMA DEĞİŞTİRME
   ================================================ */

// Tema değiştirme butonunu seç
const temaBtn = document.getElementById("temaBtn");

// Butona tıklandığında tema değişecek
temaBtn.addEventListener("click", function () {

    // 1) HTML elementinin data-bs-theme özelliğini kontrol et
    const htmlEl = document.documentElement;
    const mevcutTema = htmlEl.getAttribute("data-bs-theme");

    // 2) Tema dark ise light'a, light ise dark'a çevir
    if (mevcutTema === "dark") {
        // Dark → Light geçişi
        htmlEl.setAttribute("data-bs-theme", "light");
        temaBtn.textContent = "Koyu Temaya Geç";
        temaBtn.classList.remove("btn-outline-light");
        temaBtn.classList.add("btn-outline-secondary");
    } else {
        // Light → Dark geçişi
        htmlEl.setAttribute("data-bs-theme", "dark");
        temaBtn.textContent = "Açık Temaya Geç";
        temaBtn.classList.remove("btn-outline-secondary");
        temaBtn.classList.add("btn-outline-light");
    }
});


/* ================================================
   BÖLÜM 2: FORM VERİLERİNDEN ÖZET ÜRETME
   ================================================ */

// Form elementini seç
const basvuruForm = document.getElementById("basvuruForm");

// Sonuç alanını seç
const sonucAlani = document.getElementById("sonucAlani");

// Form gönderildiğinde (submit olayı)
basvuruForm.addEventListener("submit", function (event) {

    // 1) Sayfa yenilenmesini engelle
    event.preventDefault();

    // 2) Form alanlarından değerleri .value ile oku
    const adSoyad     = document.getElementById("adSoyad").value.trim();
    const eposta      = document.getElementById("eposta").value.trim();
    const bolum       = document.getElementById("bolum").value.trim();
    const sinif       = document.getElementById("sinif").value;
    const oturum      = document.getElementById("oturum").value;
    const katilimTuru = document.getElementById("katilimTuru").value;
    const mesaj       = document.getElementById("mesaj").value.trim();
    const onay        = document.getElementById("onay").checked;

    // 3) Koşul kullanarak eksik alan kontrolü yap
    if (adSoyad === "") {
        alert("Lütfen Ad Soyad alanını doldurunuz!");
        return;
    }
    if (eposta === "") {
        alert("Lütfen E-posta alanını doldurunuz!");
        return;
    }
    if (bolum === "") {
        alert("Lütfen Bölüm alanını doldurunuz!");
        return;
    }
    if (sinif === "" || sinif === null) {
        alert("Lütfen Sınıf seçiniz!");
        return;
    }
    if (oturum === "" || oturum === null) {
        alert("Lütfen Katılmak İstediğiniz Oturumu seçiniz!");
        return;
    }
    if (katilimTuru === "" || katilimTuru === null) {
        alert("Lütfen Katılım Türünü seçiniz!");
        return;
    }
    if (!onay) {
        alert("Lütfen kullanım koşullarını kabul ediniz!");
        return;
    }

    // 4) Mesaj alanı boşsa varsayılan metin ata
    const mesajMetni = mesaj !== "" ? mesaj : "Belirtilmedi";

    // 5) innerHTML ile sonuç alanına başvuru özeti kartını bas
    sonucAlani.innerHTML = `
        <div class="card shadow-sm border-success">
            <div class="card-body">
                <h4 class="card-title fw-bold text-success mb-3">
                    ✅ Başvuru Özeti Oluşturuldu
                </h4>
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Ad Soyad:</strong> ${adSoyad}</p>
                        <p><strong>E-posta:</strong> ${eposta}</p>
                        <p><strong>Bölüm:</strong> ${bolum}</p>
                        <p><strong>Sınıf:</strong> ${sinif}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Oturum:</strong> ${oturum}</p>
                        <p><strong>Katılım Türü:</strong> ${katilimTuru}</p>
                        <p><strong>Mesaj:</strong> ${mesajMetni}</p>
                    </div>
                </div>
                <hr>
                <p class="text-muted small mb-0">
                    Bu özet JavaScript ile otomatik olarak oluşturulmuştur.
                    Sayfa yenilenmeden, <code>event.preventDefault()</code> ve
                    <code>innerHTML</code> kullanılarak sonuç alanı güncellenmiştir.
                </p>
            </div>
        </div>
    `;

    // 6) Sonuç alanına smooth scroll yap
    sonucAlani.scrollIntoView({ behavior: "smooth" });
});
