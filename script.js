const button = document.querySelector('.menu-button');
const menu = document.querySelector('#mobile-menu');

if (button && menu) {
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    menu.hidden = open;
  });
}
