// Gerekli DOM öğelerini seçme
const captchaTextBox = document.querySelector(".captch_box input"); // Oluşturulan captcha'nın görüntüleneceği giriş alanı
const refreshButton = document.querySelector(".refresh_button"); // Captcha'yı yenilemek için kullanılacak buton
const captchaInputBox = document.querySelector(".captch_input input"); // Kullanıcının captchayı girmesi için giriş alanı
const message = document.querySelector(".message"); // Doğrulama mesajını görüntülemek için öğe
const submitButton = document.querySelector(".button"); // Girilen captchayı doğrulamak için gönder butonu

// Oluşturulan captcha'yı saklamak için değişken
let captchaText = null;

// Captcha oluşturmak için fonksiyon
const generateCaptcha = () => {
  const randomString = Math.random().toString(36).substring(2, 7); // Rastgele bir dize oluştur
  const randomStringArray = randomString.split("");
  const changeString = randomStringArray.map((char) =>
    Math.random() > 0.5 ? char.toUpperCase() : char
  ); // Bazı karakterleri rastgele büyük harfe çevir
  captchaText = changeString.join("   "); // Boşluklu bir görünüm elde etmek için karakterleri boşluklarla birleştir
  captchaTextBox.value = captchaText; // Oluşturulan captchayı giriş alanında görüntüle
  console.log(captchaText);
};

const refreshBtnClick = () => {
  generateCaptcha(); // Yenile butonuna tıklandığında captchayı yenile
  captchaInputBox.value = ""; // Kullanıcı giriş alanını temizle
  captchaKeyUpValidate();
};

const captchaKeyUpValidate = () => {
  // "disabled" sınıfını, captcha giriş alanının boş olup olmadığına bağlı olarak gönder butonuna ekle veya kaldır
  submitButton.classList.toggle("disabled", !captchaInputBox.value);

  if (!captchaInputBox.value) message.classList.remove("active"); // Captcha giriş alanı boşsa doğrulama mesajını gizle
};

// Girilen captchayı doğrulamak için fonksiyon
const submitBtnClick = () => {
  captchaText = captchaText
    .split("")
    .filter((char) => char !== " ")
    .join(""); // Saklanan captchadan boşlukları kaldırarak doğrulama yap
  message.classList.add("active"); // Doğrulama mesajını göster

  // Girilen captcha metni doğru mu değil mi kontrol et
  if (captchaInputBox.value === captchaText) {
    message.innerText = "Girilen captcha doğru"; // Başarı mesajını görüntüle
    message.style.color = "#222620"; // Başarı mesajı için koyu yeşil renk
  } else {
    message.innerText = "Girilen captcha doğru değil"; // Hata mesajını görüntüle
    message.style.color = "#FF2525"; // Hata mesajı için parlak kırmızı renk
  }
};

// Yenileme butonu, captchaInputBox ve gönder butonu için olay dinleyicilerini ekle

refreshButton.addEventListener("click", refreshBtnClick);
captchaInputBox.addEventListener("keyup", captchaKeyUpValidate);
submitButton.addEventListener("click", submitBtnClick);

// Sayfa yüklendiğinde bir captcha oluştur
generateCaptcha();
