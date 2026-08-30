/* Homepage registration cleanup: the site now uses the custom registration system. */
document.addEventListener('DOMContentLoaded',()=>{
  const section=document.querySelector('#register');
  if(!section) return;
  section.remove();
});
