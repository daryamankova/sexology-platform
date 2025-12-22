const nav = document.querySelector('.nav');
const toggle = document.querySelector('.menu-toggle');
const form = document.getElementById('contact-form');
const formNote = document.querySelector('.form-note');

if (toggle) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
}

// Закрываем меню при выборе ссылки
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Простая обработка формы без отправки
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    formNote.textContent = `Спасибо, ${name || 'друг'}! Мы свяжемся с вами в течение рабочего дня.`;
    form.reset();
  });
}

// Плавная прокрутка для ссылок, которые ведут на эту же страницу
const links = document.querySelectorAll('a[href*="#"]');
const normalizePath = (path) => path.replace(/\/index\.html$/, '/');

links.forEach((link) => {
  const url = new URL(link.href, window.location.href);
  if (normalizePath(url.pathname) === normalizePath(window.location.pathname) && url.hash) {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(url.hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
