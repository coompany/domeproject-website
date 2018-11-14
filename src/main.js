import * as jQuery from 'jquery';
import * as carousel from 'bootstrap/js/src/carousel';

jQuery(document).ready($ => {
  let stillMoving = false;
  let start = null;
  const threshold = 200;
  const carousel = $('#research-carousel');
  const carouselE = carousel[0];

  if ('ontouchstart' in document.documentElement) {
    carouselE.addEventListener('touchstart', onTouchStart, false);
  }

  function onTouchStart(e) {
    if (e.touches.length == 1) {
      start = e.touches[0].pageX;
      stillMoving = true;
      carouselE.addEventListener('touchmove', onTouchMove, false);
    }
  }

  function onTouchMove(e) {
    if (stillMoving) {
      const difference = start - e.touches[0].pageX;
      if (Math.abs(difference) >= threshold) {
        cancelTouch();
        if (difference > 0) {
          carousel.carousel('next');
        }
        else {
          carousel.carousel('prev');
        }
      }
    }
  }

  function cancelTouch() {
    carouselE.removeEventListener('touchmove', onTouchMove);
    start = null;
    stillMoving = false;
  }
});
