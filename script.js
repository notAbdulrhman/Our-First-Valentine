// Dates configuration
const sinceStartDate = new Date("2025-10-03T00:00:00");
// 14 February 2026 – Valentine's date
const valentineDate = new Date("2026-02-14T00:00:00");

function pad(num) {
  return String(num).padStart(2, "0");
}

function updateSinceTimer() {
  const now = new Date();
  let diff = now - sinceStartDate;
  if (diff < 0) diff = 0;

  const secondsTotal = Math.floor(diff / 1000);
  const days = Math.floor(secondsTotal / (60 * 60 * 24));
  const hours = Math.floor((secondsTotal % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((secondsTotal % (60 * 60)) / 60);
  const seconds = secondsTotal % 60;

  const daysEl = document.getElementById("since-days");
  const hoursEl = document.getElementById("since-hours");
  const minutesEl = document.getElementById("since-minutes");
  const secondsEl = document.getElementById("since-seconds");

  if (!daysEl) return; // not on this page

  daysEl.textContent = days;
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

function updateValentineTimer() {
  const now = new Date();
  let diff = valentineDate - now;

  const daysEl = document.getElementById("val-days");
  if (!daysEl) return; // not on this page

  const hoursEl = document.getElementById("val-hours");
  const minutesEl = document.getElementById("val-minutes");
  const secondsEl = document.getElementById("val-seconds");
  const statusEl = document.getElementById("valentine-status");

  if (diff <= 0) {
    daysEl.textContent = "0";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    if (statusEl) {
      statusEl.textContent = "Our Valentine's Day has arrived. The secret page is unlocked.";
    }
    unlockLoveButton();
    return;
  }

  const secondsTotal = Math.floor(diff / 1000);
  const days = Math.floor(secondsTotal / (60 * 60 * 24));
  const hours = Math.floor((secondsTotal % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((secondsTotal % (60 * 60)) / 60);
  const seconds = secondsTotal % 60;

  daysEl.textContent = days;
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);

  if (statusEl) {
    statusEl.textContent = "Counting down to our special day.";
  }
}

function unlockLoveButton() {
  const btn = document.getElementById("love-button");
  const hint = document.getElementById("lock-hint");
  if (!btn) return;
  btn.disabled = false;
  if (hint) {
    hint.innerHTML = 'The secret page is <span>unlocked</span>. Tap the circle.';
  }
}

function handleLoveButton() {
  const btn = document.getElementById("love-button");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const now = new Date();
    if (now >= valentineDate || !btn.disabled) {
      window.location.href = "love.html";
    } else {
      // Soft lock message
      alert("Not yet... wait until our Valentine's Day to open this.");
    }
  });
}

function initHomePage() {
  // If we are past Valentine's date, pre-unlock button
  if (new Date() >= valentineDate) {
    unlockLoveButton();
  }

  updateSinceTimer();
  updateValentineTimer();
  handleLoveButton();

  setInterval(updateSinceTimer, 1000);
  setInterval(updateValentineTimer, 1000);
}

// Love letter page logic
function initLoveLetterPage() {
  // Hard lock: if opened before Valentine date, send back home
  if (new Date() < valentineDate) {
    window.location.replace("index.html");
    return;
  }

  const letterTextEl = document.querySelector(".letter-text");
  const cursorEl = document.querySelector(".cursor");
  if (!letterTextEl || !cursorEl) return;

  const paragraphs = [
    "من ساعه ما ربنا جمع قدري و قدرك فمكان واحد",
    "ايامي بقت الطف و ادفأ و فيها حياه.",
    "",
    "في كل دقيقه بنشاركها سوا بتضيف شرارة حب و ذكريات في قصتنا،",
    "و حتي اللحظات الصغيرة اللي ممكن تكوني شايفاها عادية بتلمع اما بتكوني فيها و بتبقي احلي ذكرياتي.",
    "",
    "شكرا لصبرك عليا و حبك اللي دايما بتحسسهولي و ضحكتك اللي بتعالج و بتصلح كل حاجه جوايا،",
    "و لكل طريقه كلامك اللي بتخلي قلبي يحس انه في امان و فبيت دافئ .",
    "",
    "انهاردة، في أول عيد حب بينا ومش اخر عيد حب، عايزك تعرفي حاجه واحدة بس:", 
    "انا مش بحبك بس، انا مغرم بيكي و بموت فيكي و عمري ما هسيبك و هفضل جنبك علطول وبعشقك،",
    "بعشقك كلك و مفيهاش رجوع.",
    "❤️😅بحبك و بموت فكل سنتي فيكي."
  ];

  const fullText = paragraphs.join("\n");
  let index = 0;

  function typeNextChar() {
    if (index <= fullText.length) {
      letterTextEl.textContent = fullText.slice(0, index);
      index += 1;
      setTimeout(typeNextChar, 80);
    } else {
      cursorEl.style.display = "none";
    }
  }

  setTimeout(typeNextChar, 800);

  const backBtn = document.querySelector(".back-button");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  if (body.classList.contains("page-home")) {
    initHomePage();
  } else if (body.classList.contains("page-letter")) {
    initLoveLetterPage();
  }
});
