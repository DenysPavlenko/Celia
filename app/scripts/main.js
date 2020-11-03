'use strict'
// Modules
import preloader from './modules/preloader'
import afterloadAnimations from './modules/afterload-animations'
import scrollAnimations from './modules/scroll-animations'
import homePageSticky from './modules/home-page-sticky'
import homePageSlides from './modules/home-page-slides'
import topArrow from './modules/top-arrow'
import navigationMenu from './modules/navigation-menu'
import projectSlider from './modules/project-slider'
import videoPopup from './modules/video-popup'
import animatedLetters from './modules/animated-letters'
import blogArticles from './modules/blog-articles'
import galleryAlbum from './modules/gallery-album'
import gallerySlider from './modules/gallery-slider'
import map from './modules/map'
import contactsPopup from './modules/contacts-popup'

// On document ready
$(function (){
  homePageSticky();
  homePageSlides();
  topArrow();
  navigationMenu();
  animatedLetters();
  projectSlider();
  videoPopup();
  blogArticles();
  galleryAlbum();
  gallerySlider();
  contactsPopup();
  map();
});

// On window load
$(window).on('load', function () {
  /* Run scroll animations after preloader */
  preloader([
    afterloadAnimations,
    scrollAnimations
  ]);
});