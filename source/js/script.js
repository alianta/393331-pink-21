/* Меню навигации */
var navMain = document.querySelector('.main-nav__list');
var heder = document.querySelector('.header');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.add('main-nav__list--closed');
heder.classList.add('header--nav-closed');
navToggle.classList.remove('main-nav__toggle--no-js');
navToggle.classList.add('main-nav__toggle--closed');

navToggle.addEventListener('click', function() {
  navMain.classList.toggle('main-nav__list--closed');
  heder.classList.toggle('header--nav-closed');
  navToggle.classList.toggle('main-nav__toggle--closed');
});

/* Интерактивная карта с индивидуальным маркером в виде логотипа */
function showMap() {
  const coordinates = {
    lat: 59.93878500480984,
    lng: 30.323052762558888
  };
  const image = "img/map-marker.svg";
  const map = new google.maps.Map(document.getElementById("map"), {
    center: coordinates,
    zoom: 16
  });
  marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    icon: image
  });
}
