var navMain = document.querySelector('.main-nav__list');
var heder = document.querySelector('.header');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.add('main-nav__list--closed');
heder.classList.add('header--nav-closed');
navToggle.classList.add('main-nav__toggle--closed');

navToggle.addEventListener('click', function() {
  navMain.classList.toggle('main-nav__list--closed');
  heder.classList.toggle('header--nav-closed');
  navToggle.classList.toggle('main-nav__toggle--closed');
});
