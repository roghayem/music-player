let musicName = document.querySelector("#music-name");
let range = document.querySelector("#music-time");
let musicCover = document.querySelector("#music-cover");
let playBtn = document.querySelector("#play-btn");
let nextBtn = document.querySelector("#next-btn");
let preBtn = document.querySelector("#pre-btn");

// عناصر جدید برای نمایش زمان
let currentTimeDisplay = document.querySelector("#current-time");
let totalTimeDisplay = document.querySelector("#total-time");

let musics = [
    {
        name: "Moth To A Flame",
        cover: "images (1).png",
        audio: "Moth To A Flame - Swedish House Mafia  The Weeknd (128).mp3"
    },
    {
        name: "Golden Hours",
        cover: "images (3).png",
        audio: "JVKE - golden hour (2).mp3"
    },
    {
        name: "The Water Is Fine",
        cover: "images (2).png",
        audio: "Chloe Ament - The Water Is Fine (128).mp3"
    }
];
// این نشون میده اولنی اهنگ ما کد.ومه چون ایندکیس هست پس اولی ما اهنگ اول هست 
let curetMusic = 0;
//این برای ساختن یک ایدیو فایل هست که برای پلی کردن فایل ما هست 
let audio = new Audio(musics[curetMusic].audio);
musicCover.src = musics[curetMusic].cover;
musicName.innerText = musics[curetMusic].name;

// تابع تبدیل ثانیه به فرمت دقیقه:ثانیه
function formatTime(seconds) {
    //nan یعنی عدد
    //finit این عدد اصلا واقعیه یا نه
    if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// دریافت مدت زمان کل آهنگ
//نشون دادن این که لود  تموم شده و اطلاعات فایل رو بهمون میگه 
// یعنی این که لود فایل انجام میشه و بعد این کارا رو انجام میده
audio.addEventListener("loadedmetadata", () => {
    // یعنی رینج ما برابره با کل زمان اهنگ برابره
    range.max = audio.duration;
    totalTimeDisplay.textContent = formatTime(audio.duration);
});

// آپدیت زمان در حین پخش
// وقتی اهنگ پلی میشه  اون حالت رو باری ما اپدیت میکنه
audio.addEventListener("timeupdate", () => {
    // زما فعلی اهنگ رو مبده و هر چند ثانیه  کار میکنه و اپدیت میشه
    range.value = audio.currentTime;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// تغییر زمان با اسلایدر

//قویت کاربر رش کلیک میکنه هر قسمت رو کلیک کنه میره اونجا 
range.addEventListener("input", () => {
    // زمان فعلی ما رو برابر با زمانی که کاربر روش کلیک میکنه میبره
    audio.currentTime = range.value;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// دکمه پخش/توقف
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        musicCover.style.animationPlayState = "running";
        playBtn.classList.replace("fa-play", "fa-pause");
    } else {
        audio.pause();
        musicCover.style.animationPlayState = "paused";
        playBtn.classList.replace("fa-pause", "fa-play");
    }
});

// دکمه بعدی
nextBtn.addEventListener("click", () => {
    changeMusic("next");
});

// دکمه قبلی
preBtn.addEventListener("click", () => {
    changeMusic("pre");
});

// تابع تغییر آهنگ
function changeMusic(state) {
    audio.pause();
    range.value = 0;
    currentTimeDisplay.textContent = "0:00";
    playBtn.classList.replace("fa-pause", "fa-play");
    musicCover.style.animationPlayState = "paused";

    if (state === "next") {
        // اگر موزیک فعلی ما برابر با اخرین موزیک ما باشه 
        if (curetMusic === musics.length - 1) {
            //برگرد به موزیک اولی
            curetMusic = 0;
        } else {
            // اگه نه برو به اهنگ بعدی
            curetMusic += 1;
        }
    } else {
        // اگر کلیک کنیم روی دکمه اهنگ قبلی اگر اهنگ ما اولین اهنگ باشه 
        if (curetMusic === 0) {
            // برمیگرده به اهنگ اخر
            curetMusic = musics.length - 1;
        } else {
            // اگه اهنگ اول نباشه یه دونه میره قبلب
            curetMusic -= 1;
        }
    }

    audio.src = musics[curetMusic].audio;
    musicCover.src = musics[curetMusic].cover;
    musicName.innerText = musics[curetMusic].name;


    // نه نمیگه فایل جدید رو پلی کن الان
    audio.load();
    
    audio.addEventListener("loadedmetadata", () => {
        range.max = audio.duration;
        totalTimeDisplay.textContent = formatTime(audio.duration);
    });

    audio.play();
    musicCover.style.animationPlayState = "running";
    playBtn.classList.replace("fa-play", "fa-pause");
}

// تنظیم اولیه زمان کل (اگر آهنگ از قبل لود شده باشه)
if (audio.duration) {
    totalTimeDisplay.textContent = formatTime(audio.duration);
}
