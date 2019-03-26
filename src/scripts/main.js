import "core-js/stage/3";
import 'lightgallery.js';

import Toggle from './components/Toggle';
import Header from './components/Header';
import Canvas from './components/Canvas';


const toggle = new Toggle('.header__menu-toggler', '.drawer');
const header = new Header('.header');
const canvas = new Canvas();

toggle.show('drawer');
toggle.hide('drawer');

header.init();

canvas.init();

lightGallery(document.getElementById('aniimated-thumbnials'), {
    thumbnail: true
}); 