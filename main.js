document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const nav = document.getElementById('nav');

  hamburgerMenu.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
});

