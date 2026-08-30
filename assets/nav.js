// Vaagai 2k26 shared navigation helper
// Adds Rules to the navigation on pages using the existing site header.
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav-links');
  if (!nav || nav.querySelector('a[href="rules.html"]')) return;
  const rules = document.createElement('li');
  rules.innerHTML = '<a href="rules.html">Rules</a>';
  const register = nav.querySelector('.nav-cta');
  if (register && register.parentElement) register.parentElement.before(rules);
  else nav.appendChild(rules);
});
