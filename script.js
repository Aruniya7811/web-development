// 1. Typewriter Effect
const typeText = document.getElementById('type-text');
const words = ['Precision', 'Creativity', 'Efficiency'];
let wIdx = 0, cIdx = 0, isDeleting = false;

function handleType() {
    const current = words[wIdx];
    typeText.textContent = isDeleting ? current.substring(0, cIdx--) : current.substring(0, cIdx++);
    let speed = isDeleting ? 60 : 150;
    if (!isDeleting && cIdx > current.length) { isDeleting = true; speed = 2000; }
    else if (isDeleting && cIdx < 0) { isDeleting = false; wIdx = (wIdx + 1) % words.length; speed = 500; }
    setTimeout(handleType, speed);
}
handleType();

// 2. Carousel Logic
let pos = 0;
const track = document.getElementById('track');
const slides = document.querySelectorAll('.carousel-slide');

document.getElementById('goNext').onclick = () => { pos = (pos + 1) % slides.length; update(); };
document.getElementById('goPrev').onclick = () => { pos = (pos - 1 + slides.length) % slides.length; update(); };
function update() { track.style.transform = `translateX(-${pos * 100}%)`; }

// 3. Auth System
const modal = document.getElementById('authModal');
const toast = document.getElementById('toast');

document.getElementById('btnAuth').onclick = () => modal.style.display = 'flex';
document.getElementById('closeModal').onclick = () => modal.style.display = 'none';

function notify(msg, success) {
    toast.textContent = msg;
    toast.style.background = success ? '#10b981' : '#ef4444';
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
}

document.getElementById('toRegister').onclick = () => { document.getElementById('login-box').style.display = 'none'; document.getElementById('register-box').style.display = 'block'; };
document.getElementById('toLogin').onclick = () => { document.getElementById('register-box').style.display = 'none'; document.getElementById('login-box').style.display = 'block'; };

document.getElementById('doRegister').onclick = () => {
    const email = document.getElementById('regEmail').value;
    const pass = document.getElementById('regPass').value;
    if (!email.includes('@')) return notify("Invalid Email!", false);
    localStorage.setItem(email, pass);
    notify("Registered! Please Login", true);
    document.getElementById('toLogin').click();
};

document.getElementById('doLogin').onclick = () => {
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;
    if (localStorage.getItem(email) === pass && pass !== "") {
        notify("Login Success!", true);
        setTimeout(() => modal.style.display = 'none', 1000);
    } else {
        notify("Account not found or Wrong password!", false);
    }
};

// 4. Zoom & Progress
document.querySelectorAll('.carousel-slide img').forEach(img => {
    img.onmousemove = (e) => {
        img.style.transformOrigin = `${(e.offsetX / img.width) * 100}% ${(e.offsetY / img.height) * 100}%`;
        img.style.transform = "scale(1.8)";
    };
    img.onmouseleave = () => img.style.transform = "scale(1)";
});

window.onscroll = () => {
    let scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('scroll-progress').style.width = scrolled + "%";
};

document.getElementById('theme-btn').onclick = () => {
    const theme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', theme);
};