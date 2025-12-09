// Set current year in footers
document.addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear();
  ['yearIndex','yearAbout','yearSkills','yearProjects','yearContact'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = year;
  });

  // Hamburger toggles (support multiple pages)
  const toggles = [
    {ham: 'hamburger', nav: 'navLinks'},
    {ham: 'hamburgerAbout', nav: 'navLinksAbout'},
    {ham: 'hamburgerSkills', nav: 'navLinksSkills'},
    {ham: 'hamburgerProjects', nav: 'navLinksProjects'},
    {ham: 'hamburgerContact', nav: 'navLinksContact'}
  ];
  toggles.forEach(t => {
    const ham = document.getElementById(t.ham), nav = document.getElementById(t.nav);
    if(ham && nav) ham.addEventListener('click', ()=> nav.classList.toggle('show'));
  });

  // Theme toggles (multiple pages)
  ['themeToggle','themeToggleAbout','themeToggleSkills','themeToggleProjects','themeToggleContact'].forEach(id=>{
    const btn = document.getElementById(id);
    if(btn) btn.addEventListener('click', toggleTheme);
  });

  // Scroll-to-top button
  const topBtn = document.getElementById('topBtn');
  window.addEventListener('scroll', () => {
    if(!topBtn) return;
    topBtn.style.display = (window.scrollY > 200) ? 'block' : 'none';
  });
});

// Toggle theme and persist
function toggleTheme(){
  document.body.classList.toggle('dark');
  try {
    localStorage.setItem('themeDark', document.body.classList.contains('dark') ? '1' : '0');
  } catch(e){}
}
(function loadTheme(){ try { if(localStorage.getItem('themeDark')==='1') document.body.classList.add('dark'); } catch(e){} })();

// Modal logic for projects
const modal = document.getElementById('modal');
function openModal(projectId) {
  const m = document.getElementById('modal');
  if(!m) return;
  const body = document.getElementById('modalBody');
  let html = '';
  if(projectId === 1){
    html = `<h2>Project One</h2><p>Built with HTML, CSS & JS. Features: responsive layout, animations and accessibility.</p>`;
  } else if(projectId === 2){
    html = `<h2>Project Two</h2><p>Built with Bootstrap & JavaScript. Features: responsive grid and contact integration.</p>`;
  } else if(projectId === 3){
    html = `<h2>Project Three</h2><p>React demo: components, hooks and routing (demo).</p>`;
  } else {
    html = `<h2>Project</h2><p>Details coming soon.</p>`;
  }
  body.innerHTML = html;
  m.style.display = 'flex';
}
function closeModal(){
  const m = document.getElementById('modal');
  if(!m) return;
  m.style.display = 'none';
}

// Allow clicking backdrop to close modal
document.addEventListener('click', (e) => {
  const m = document.getElementById('modal');
  if(m && e.target === m) m.style.display = 'none';
});

// Contact form validation (demo)
function handleSubmit(e){
  e.preventDefault();
  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const message = document.getElementById('message')?.value.trim();

  if(!name || !email || !message){
    alert('Please fill out all fields.');
    return false;
  }
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!re.test(email)){
    alert('Please enter a valid email.');
    return false;
  }

  // Demo: no backend — show confirmation
  alert('Thanks! Your message has been received (demo).');
  document.getElementById('contactForm')?.reset();
  return false;
}

// expose for inline onclicks in HTML
window.openModal = openModal;
window.closeModal = closeModal;
window.handleSubmit = handleSubmit;
