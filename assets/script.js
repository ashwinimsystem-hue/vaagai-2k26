document.addEventListener('DOMContentLoaded',()=>{
  // Shared navigation behavior.
  const navToggle=document.querySelector('.nav-toggle'),navLinks=document.querySelector('.nav-links');
  if(navToggle&&navLinks){navToggle.addEventListener('click',()=>{const isOpen=navLinks.classList.toggle('open');navToggle.setAttribute('aria-expanded',String(isOpen))});navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')))}

  // Shared tabs.
  document.querySelectorAll('[data-tabs]').forEach(group=>{const buttons=group.querySelectorAll('[data-tab-target]'),panelWrap=document.querySelector(group.dataset.tabs);if(!panelWrap)return;const panels=panelWrap.querySelectorAll('[data-panel]');buttons.forEach(btn=>btn.addEventListener('click',()=>{buttons.forEach(b=>b.classList.remove('active'));panels.forEach(p=>p.classList.remove('active'));btn.classList.add('active');const target=panelWrap.querySelector(`[data-panel="${btn.dataset.tabTarget}"]`);if(target)target.classList.add('active')}))});

  // Scroll reveal.
  const revealEls=document.querySelectorAll('.reveal');
  if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');io.unobserve(entry.target)}}),{threshold:.15});revealEls.forEach(el=>io.observe(el))}else revealEls.forEach(el=>el.classList.add('in'));

  // Remove the legacy Google Form section from the homepage. Registration is now handled by the custom app.
  const legacyRegistration=document.querySelector('#register');
  if(legacyRegistration && location.pathname.endsWith('/index.html') || legacyRegistration && (location.pathname==='/' || location.pathname.endsWith('/vaagai-2k26/'))){legacyRegistration.remove()}

  // On the detailed Events page, every competition title becomes the entry point for its event-specific registration flow.
  if(location.pathname.endsWith('/events.html') || location.pathname.endsWith('events.html')){
    const map={
      'Paper Presentation':'paper-presentation','CAD Modeling':'cad-modeling','ANSYS Simulation Challenge':'ansys-simulation',
      'Glider Competition':'glider-competition','Technical Quiz':'technical-quiz','Line Follower':'line-follower',
      'Water Rocketry':'water-rocketry','Free Fire':'free-fire','Carrom':'carrom','IPL Auction':'ipl-auction','Treasure Hunt':'treasure-hunt','Chess':'chess'
    };
    document.querySelectorAll('.detail-card h2').forEach(h=>{const key=map[h.textContent.trim()];if(!key||h.querySelector('a'))return;const a=document.createElement('a');a.href=`registration.html?event=${encodeURIComponent(key)}`;a.textContent=h.textContent;a.setAttribute('aria-label',`Register for ${h.textContent.trim()}`);h.replaceChildren(a)})
  }

  const yearEl=document.getElementById('year');if(yearEl)yearEl.textContent=new Date().getFullYear();
});
