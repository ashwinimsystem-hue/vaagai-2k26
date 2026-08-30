document.addEventListener('DOMContentLoaded',()=>{
  // Restore the original pre-assets visual direction across every page.
  if(!document.querySelector('link[data-vaagai-theme]')){
    const theme=document.createElement('link');
    theme.rel='stylesheet';
    theme.href='assets/pre-assets-theme.css';
    theme.dataset.vaagaiTheme='true';
    document.head.appendChild(theme);
  }

  const navToggle=document.querySelector('.nav-toggle'),navLinks=document.querySelector('.nav-links');
  if(navToggle&&navLinks){navToggle.addEventListener('click',()=>{const isOpen=navLinks.classList.toggle('open');navToggle.setAttribute('aria-expanded',String(isOpen))});navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')))}
  document.querySelectorAll('[data-tabs]').forEach(group=>{const buttons=group.querySelectorAll('[data-tab-target]'),panelWrap=document.querySelector(group.dataset.tabs);if(!panelWrap)return;const panels=panelWrap.querySelectorAll('[data-panel]');buttons.forEach(btn=>btn.addEventListener('click',()=>{buttons.forEach(b=>b.classList.remove('active'));panels.forEach(p=>p.classList.remove('active'));btn.classList.add('active');const target=panelWrap.querySelector(`[data-panel="${btn.dataset.tabTarget}"]`);if(target)target.classList.add('active')}))});
  const revealEls=document.querySelectorAll('.reveal');
  if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');io.unobserve(entry.target)}}),{threshold:.15});revealEls.forEach(el=>io.observe(el))}else revealEls.forEach(el=>el.classList.add('in'));
  const yearEl=document.getElementById('year');if(yearEl)yearEl.textContent=new Date().getFullYear();
});
