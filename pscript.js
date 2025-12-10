// Set current year in footers// script.js — Full final version

// Utility: safe query selector by id fallback
function $id(id) { return document.getElementById(id); }

// Load saved theme (immediately so UI doesn't flash)
(function loadThemeImmediate(){
  try {
    if (localStorage.getItem('themeDark') === '1') {
      document.documentElement.classList.add('dark'); // apply to root for CSS that targets body.dark or html.dark
      document.body.classList.add('dark');
    }
  } catch(e){}
})();

document.addEventListener('DOMContentLoaded', () => {
  // 1) Set current year in footers (works if element ids exist)
  const year = new Date().getFullYear();
  ['yearIndex','yearAbout','yearSkills','yearProjects','yearContact','year'].forEach(id=>{
    const el = $id(id);
    if(el) el.textContent = year;
  });

  // 2) Hamburger / mobile menu handling (robust)
  document.querySelectorAll('.hamburger').forEach(ham => {
    // find nav-links inside same .navbar or fallback to first .nav-links
    let nav = ham.closest('.navbar')?.querySelector('.nav-links') || document.querySelector('.nav-links');
    if(!nav) return;

    // ensure nav has an id for aria-controls
    if(!nav.id) nav.id = 'navLinks';

    ham.setAttribute('aria-controls', nav.id);
    ham.setAttribute('aria-expanded', 'false');

    ham.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('show');
      ham.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      // prevent background scrolling when menu open
      if(isOpen) document.body.classList.add('menu-open');
      else document.body.classList.remove('menu-open');
    });

    // close on ESC
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && nav.classList.contains('show')) {
        nav.classList.remove('show');
        ham.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });

    // close menu when a nav link is clicked (mobile)
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if(nav.classList.contains('show')) {
          nav.classList.remove('show');
          ham.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('menu-open');
        }
      });
    });
  });

  // 3) Theme toggle buttons (multiple pages support)
  ['themeToggle','themeToggleAbout','themeToggleSkills','themeToggleProjects','themeToggleContact'].forEach(id=>{
    const btn = $id(id);
    if(btn) btn.addEventListener('click', toggleTheme);
  });

  // 4) Scroll-to-top button
  const topBtn = $id('topBtn');
  if(topBtn) {
    // show/hide on scroll
    window.addEventListener('scroll', () => {
      topBtn.style.display = (window.scrollY > 200) ? 'block' : 'none';
    });

    topBtn.addEventListener('click', () => {
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  // 5) Modal backdrop click (if modal present)
  const modal = $id('modal');
  if(modal) {
    modal.addEventListener('click', (e) => {
      if(e.target === modal) closeModal();
    });
  }

  // 6) Ensure links with internal anchors scroll smoothly (optional)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if(href.length > 1) {
        const target = document.querySelector(href);
        if(target) {
          e.preventDefault();
          target.scrollIntoView({behavior: 'smooth'});
        }
      }
    });
  });

  // No-op: other initializations can go here
}); // end DOMContentLoaded

// THEME: toggle and persist
function toggleTheme(){
  const isDark = document.body.classList.toggle('dark');
  try { localStorage.setItem('themeDark', isDark ? '1' : '0'); } catch(e){}
}

// MODAL: project details
function openModal(projectId) {
  const m = $id('modal');
  const body = $id('modalBody');
  if(!m || !body) return;

  let html = '';
  switch(projectId) {
    case 1:
      html = `<h2>Project One</h2>
              <p>Built with HTML, CSS & JavaScript. Features: responsive layout, animations and accessibility.</p>`;
      break;
    case 2:
      html = `<h2>Project Two</h2>
              <p>Built with Bootstrap. Features: responsive landing page, modular components.</p>`;
      break;
    case 3:
      html = `<h2>Project Three</h2>
              <p>React demo application with stateful components and routing.</p>`;
      break;
    default:
      html = `<h2>Project</h2><p>Details coming soon.</p>`;
  }

  body.innerHTML = html;
  m.style.display = 'flex';
  m.setAttribute('aria-hidden', 'false');

  // focus management
  const closeBtn = m.querySelector('.modal-close');
  if(closeBtn) closeBtn.focus();
}

function closeModal() {
  const m = $id('modal');
  if(!m) return;
  m.style.display = 'none';
  m.setAttribute('aria-hidden', 'true');
}

// CONTACT FORM: validation & demo submit
function handleSubmit(e){
  if(e && e.preventDefault) e.preventDefault();
  const form = $id('contactForm');
  if(!form) {
    alert('Contact form not found.');
    return false;
  }

  const nameEl = $id('name');
  const emailEl = $id('email');
  const messageEl = $id('message');

  const name = nameEl ? nameEl.value.trim() : '';
  const email = emailEl ? emailEl.value.trim() : '';
  const message = messageEl ? messageEl.value.trim() : '';

  if(!name || !email || !message){
    alert('Please fill out all fields.');
    return false;
  }

  // simple email regex
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!re.test(email)){
    alert('Please enter a valid email address.');
    return false;
  }

  // Demo behavior: show thank you and reset
  alert('Thanks! Your message has been received (demo).');
  form.reset();
  return false;
}

// expose functions for inline usage if needed
window.toggleTheme = toggleTheme;
window.openModal = openModal;
window.closeModal = closeModal;
window.handleSubmit = handleSubmit;


