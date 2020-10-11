import CanvasRenderer from './modules/canvasRenderer';
import SVGRenderer from './modules/svgRenderer';

import './css/master.css';

let currEntity, domElements;
domElements = {
  containerId: 'container',
  canvasId: 'canvas',
  svgId: 'svg'
};

function setDefaults() {
  currEntity = 'DynamicArray';
  let canvas = new CanvasRenderer();
  canvas.init(domElements, currEntity);
  document.getElementById(currEntity + 'Menu').classList.add('active');
}

function onMenuChange(activeMenu) {
  clearContainer();
  document.getElementById(currEntity + 'Menu').classList.remove('active');
  if(activeMenu === 'DynamicArray' || activeMenu === 'LinkedList') {
    let canvas = new CanvasRenderer();
    canvas.init(domElements, activeMenu);
  }
  else if(activeMenu === 'Sort') {
    new SVGRenderer();
  }
  currEntity = activeMenu;
  document.getElementById(currEntity + 'Menu').classList.add('active');
}

function clearContainer() {
  document.getElementById(domElements.containerId).innerHTML = '';
}

window.onMenuChange = onMenuChange;
window.clearContainer = clearContainer;
window.domElements = domElements;
window.setDefaults = setDefaults;
