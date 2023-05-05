document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const nav = document.getElementById('nav');

  hamburgerMenu.addEventListener('click', () => {
    //event.stopPropagation();
    nav.classList.toggle('open');
  });

  const links = document.querySelectorAll('#nav a');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      links.forEach((otherLink) => {
        otherLink.classList.remove('selected');
        otherLink.parentElement.classList.remove('selected');
      });

      link.classList.add('selected');
      link.parentElement.classList.add('selected');
    });
  });

  // document.addEventListener('click', function (event) {
  //   const navElement = document.getElementById('nav');
  //   if (navElement.contains(event.target)) {
  //     return;
  //   }
  //   navElement.classList.remove('open');
  // });

});


