
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if(saved === 'dark'){ root.classList.add('dark'); }
document.addEventListener('click', e=>{
  const t = e.target.closest('[data-toggle-theme]');
  if(!t) return;
  root.classList.toggle('dark');
  localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
});
document.querySelectorAll('[data-wa]').forEach(btn=>{
  const url = new URL(btn.href);
  const base = url.searchParams.get('text') || 'Olá, preciso de ajuda com minha multa.';
  url.searchParams.set('text', base + '\\nRef: ' + location.href);
  btn.href = url.toString();
});
const links = [...document.querySelectorAll('nav a[href^="#"]')];
const ids = links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
const observer = new IntersectionObserver(entries=>{
  entries.forEach(ent=>{
    const i = links.find(a=>a.getAttribute('href') === '#' + ent.target.id);
    if(!i) return;
    if(ent.isIntersecting){ links.forEach(a=>a.style.color=''); i.style.color='var(--brand)'; }
  });
}, {rootMargin:"-50% 0px -45% 0px", threshold: [0,1]});
ids.forEach(s=>observer.observe(s));


// === Mobile menu toggle ===
const menuBtn=document.querySelector('.menu-toggle');
const nav=document.querySelector('nav');
if(menuBtn){menuBtn.addEventListener('click',()=>{nav.classList.toggle('open');});}
