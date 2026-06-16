/* ------------------------------------------------------------------
   NAYEPANKH GLOBAL SCRIPTCONTROLLER
   Interactive Handlers - Theme Control, Counter Animations, Custom Alerts
   ------------------------------------------------------------------
*/

// Wait for DOM to finish loading securely
document.addEventListener("DOMContentLoaded", function() {
  
  // 1. Initial Loader Removal Animation
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('opacity-0');
      setTimeout(() => loader.classList.add('hidden'), 500);
    }, 400);
  }

  // 2. Scroll-to-top visibility watcher
  const scrollTopBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      if (scrollTopBtn) scrollTopBtn.classList.remove('hidden');
    } else {
      if (scrollTopBtn) scrollTopBtn.classList.add('hidden');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Setup Theme Switcher
  const themeToggleBtn = document.getElementById('theme-toggle');
  const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');

  function toggleDarkMode() {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleDarkMode);
  if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleDarkMode);

  // Initialize Theme Preferences
  if (localStorage.getItem('color-theme') === 'dark' || 
     (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // 4. Mobile hamburger toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      if (mobileMenu.classList.contains('hidden')) {
        if (menuIcon) menuIcon.className = 'fa-solid fa-bars text-xl';
      } else {
        if (menuIcon) menuIcon.className = 'fa-solid fa-xmark text-xl';
      }
    });
  }
});

/* -------------------------------------------------------------
   INTERACTIVE COUNTER ENGINE
------------------------------------------------------------- */
function runImpactCounters() {
  const targets = [
    { id: 'counter-volunteers', max: 500 },
    { id: 'counter-beneficiaries', max: 1000 },
    { id: 'counter-events', max: 50 }
  ];

  targets.forEach(item => {
    const el = document.getElementById(item.id);
    if (!el) return;
    
    let cur = 0;
    const dur = 1000;
    const steps = Math.abs(Math.floor(dur / item.max));

    const interval = setInterval(() => {
      cur += Math.ceil(item.max / 50);
      if (cur >= item.max) {
        el.textContent = item.max + "+";
        clearInterval(interval);
      } else {
        el.textContent = cur;
      }
    }, steps);
  });
}

// Automatically trigger counter on load if on visual dashboard
if (document.getElementById('counter-volunteers')) {
  setTimeout(runImpactCounters, 400);
}

/* -------------------------------------------------------------
   FORM HANDLERS & SIMULATIONS
------------------------------------------------------------- */
function showNotification(title, message) {
  const modal = document.getElementById('custom-modal');
  const modalTitle = document.getElementById('modal-title-text');
  const modalDesc = document.getElementById('modal-desc-text');
  
  if (modal && modalTitle && modalDesc) {
    modalTitle.innerText = title;
    modalDesc.innerText = message;
    modal.classList.remove('hidden');
  }
}

function closeModal() {
  const modal = document.getElementById('custom-modal');
  if (modal) modal.classList.add('hidden');
}

function handleVolunteerSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('v-name').value;
  const interest = document.getElementById('v-interest').value;
  showNotification(
    "Application Logged!",
    `Greetings ${name}, your application file for our "${interest}" program is registered with NayePankh server simulator.`
  );
  document.getElementById('volunteer-form').reset();
}

function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('c-name').value;
  showNotification(
    "Message Submitted",
    `Thank you, ${name}. Your support ticket is received and our community coordinators will respond shortly.`
  );
  document.getElementById('contact-form').reset();
}

function handleNewsletterSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('news-email').value;
  showNotification(
    "Successfully Subscribed",
    `Thank you! We have added ${email} to our regular community newsletter distribution list.`
  );
  document.getElementById('news-email').value = '';
}

/* -------------------------------------------------------------
   AI BOT ENGINE SIMULATION
------------------------------------------------------------- */
function askAI(prompt) {
  const chatOutput = document.getElementById('ai-chat-output');
  const responseText = document.getElementById('ai-response-text');
  
  if (!chatOutput || !responseText) return;
  
  chatOutput.classList.remove('hidden');
  responseText.innerText = "Processing prompt guidelines...";
  
  let reply = "";
  if (prompt.includes("program")) {
    reply = "Our flagship setup is 'Education Support', organizing smart tablet resources, tuition centers, and child mentoring.";
  } else if (prompt.includes("help")) {
    reply = "You can join physically in Andheri, Mumbai, or virtually assist with digital media editing and writing assignments!";
  } else {
    reply = "Technology powers NayePankh! Use the volunteer form to officially register for support roles.";
  }

  setTimeout(() => {
    responseText.innerText = reply;
  }, 500);
}