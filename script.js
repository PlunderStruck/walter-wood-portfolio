document.addEventListener('DOMContentLoaded', () => {

  // --- Card Flipping (Completed Certs Only) ---
  const cards = document.querySelectorAll('.cert-card'); // Only target completed cert cards
  cards.forEach(card => {
      card.addEventListener('click', (event) => { // Pass event to handler
          // Prevent flipping if click was on the verify link inside the back face
          if (event.target.tagName === 'A' && card.classList.contains('is-flipped')) {
              // Allow link navigation but don't toggle flip
              return;
          }
          card.classList.toggle('is-flipped');
      });
      // Add focus/blur for keyboard accessibility hint (optional visual cue)
      card.addEventListener('focus', () => card.classList.add('has-focus'));
      card.addEventListener('blur', () => card.classList.remove('has-focus'));
  });

  // --- Theme Toggle ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const bodyElement = document.body;

  // Function to apply theme
  const applyTheme = (theme) => {
// Inside the applyTheme function:
    const iconElement = themeToggleBtn.querySelector('i'); // Get the icon element

    if (theme === 'dark-mode') {
        bodyElement.classList.remove('light-mode');
        bodyElement.classList.add('dark-mode');
        iconElement.className = 'fas fa-moon'; // Set moon icon for dark mode
        themeToggleBtn.setAttribute('aria-label', 'Switch to light mode'); // Update accessibility label
    } else {
        bodyElement.classList.remove('dark-mode');
        bodyElement.classList.add('light-mode');
        iconElement.className = 'fas fa-sun'; // Set sun icon for light mode
        themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode'); // Update accessibility label
    }
  };

  // Check for saved theme in localStorage
  let savedTheme = localStorage.getItem('theme');

  // If no saved theme, check prefers-color-scheme
  if (!savedTheme) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          savedTheme = 'dark-mode';
      } else {
          savedTheme = 'light-mode'; // Default to light
      }
  }

  // Apply the determined theme on initial load
  applyTheme(savedTheme);

  // Add event listener for the button
  themeToggleBtn.addEventListener('click', () => {
      let newTheme = bodyElement.classList.contains('light-mode') ? 'dark-mode' : 'light-mode';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme); // Save the new theme preference
  });

  // Optional: Listen for OS theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      const newOsTheme = event.matches ? 'dark-mode' : 'light-mode';
      // Only apply if no manual override is saved
      if (!localStorage.getItem('theme')) {
          applyTheme(newOsTheme);
      }
  });

  // --- Footer Year ---
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
  }

  // --- Download All Button (Simple Link Redirect) ---
  // No specific JS needed here if using a direct <a> link in HTML.

});