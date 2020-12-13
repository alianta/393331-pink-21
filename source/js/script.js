var navMain = document.querySelector('.main-nav__list');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.add('main-nav__list--closed');
navToggle.classList.add('main-nav__toggle--closed');

navToggle.addEventListener('click', function() {
  navMain.classList.toggle('main-nav__list--closed');
  navToggle.classList.toggle('main-nav__toggle--closed');
});
