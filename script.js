// script.js

// تغيير تمييز الرابط النشط في الشريط الجانبي (لديك حاليًا class="active" في HTML، هذا بمثابة دعم إضافي)

// تأكد من تفعيل الروابط الصحيحة حتى لو تغيرت

document.addEventListener("DOMContentLoaded", () => {
  const sidebarLinks = document.querySelectorAll(".nav-links a");
  const currentPath = window.location.pathname.split("/").pop(); // اسم الصفحة الحالي

  sidebarLinks.forEach(link => {
    // إزالة التمييز من جميع الروابط أولاً
    link.classList.remove("active");

    // إذا كان الرابط يطابق اسم الصفحة الحالي يتم تمييزه
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
});


// مثال وظيفة زر استبدال النقاط (في صفحة المكافآت مثلاً)

const redeemBtn = document.querySelector(".btn-secondary");

if (redeemBtn) {
  redeemBtn.addEventListener("click", () => {
    alert("تم استبدال النقاط بنجاح! شكراً لاستخدامك برنامج الولاء.");
  });
}


// مثال زر إيقاف مؤقت / تجديد اشتراك مع عرض تنبيهات مبسطة

const pauseBtn = document.querySelector(".btn-light");
const renewBtn = document.querySelectorAll(".btn-secondary");

if (pauseBtn) {
  pauseBtn.addEventListener("click", () => {
    let confirmPause = confirm("هل أنت متأكد من رغبتك في إيقاف الاشتراك مؤقتاً؟");
    if (confirmPause) {
      alert("تم إيقاف الاشتراك مؤقتاً.");
    }
  });
}

renewBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    alert("شكراً لك! سيتم تجديد اشتراكك قريباً.");
  });
});


// مثال بسيط لنموذج الدفع للتحقق من صحة البيانات (في payment.html)

const paymentForm = document.querySelector("form");

if (paymentForm) {
  paymentForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const cardName = paymentForm.elements["card-name"].value.trim();
    const cardNumber = paymentForm.elements["card-number"].value.trim();
    const expiryDate = paymentForm.elements["expiry-date"].value.trim();
    const cvv = paymentForm.elements["cvv"].value.trim();

    if (!cardName || !cardNumber || !expiryDate || !cvv) {
      alert("يرجى ملء جميع الحقول.");
      return;
    }

    const cardNumDigitsOnly = cardNumber.replace(/\s+/g, '');
    if (!/^\d{16}$/.test(cardNumDigitsOnly)) {
      alert("رقم البطاقة يجب أن يحتوي على 16 رقماً.");
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      alert("رمز التحقق (CVV) يجب أن يحتوي على 3 أو 4 أرقام.");
      return;
    }

    alert("تمت عملية الدفع بنجاح! شكراً لك.");
    paymentForm.reset();
  });
}
const addLocationBtn = document.getElementById("add-location-btn");
const titlesList = document.getElementById("titles-list");
const locationStatus = document.getElementById("location-status");

addLocationBtn.addEventListener("click", () => {
  locationStatus.textContent = "جاري الحصول على الموقع... يرجى الانتظار";

  if (!navigator.geolocation) {
    locationStatus.textContent = "المتصفح لا يدعم خاصية الموقع الجغرافي.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      locationStatus.textContent = "";

      const { latitude, longitude } = position.coords;

      // استخدم دالة لعرض العنوان مع الإحداثيات
      addSavedLocation(latitude, longitude);
    },
    error => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          locationStatus.textContent = "لم يتم منح إذن الوصول للموقع.";
          break;
        case error.POSITION_UNAVAILABLE:
          locationStatus.textContent = "موقعك غير متوفر حالياً.";
          break;
        case error.TIMEOUT:
          locationStatus.textContent = "انتهت مهلة طلب الموقع.";
          break;
        default:
          locationStatus.textContent = "حدث خطأ في الحصول على الموقع.";
          break;
      }
    }
  );
});

function addSavedLocation(lat, lng) {
  // انشئ العنصر الذي يعرض العنوان مع الإحداثيات
  const titleItem = document.createElement("div");
  titleItem.classList.add("title-item");

  const label = document.createElement("div");
  label.classList.add("label");
  label.textContent = "العنوان";
  titleItem.appendChild(label);

  const titleH3 = document.createElement("h3");
  titleH3.textContent = "الموقع الحالي";
  titleItem.appendChild(titleH3);

  const descP = document.createElement("p");
  descP.textContent = `الإحداثيات: خط عرض ${lat.toFixed(5)}، خط طول ${lng.toFixed(5)}`;
  titleItem.appendChild(descP);

  titlesList.appendChild(titleItem);
}
