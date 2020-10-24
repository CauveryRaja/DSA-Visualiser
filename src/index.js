import CanvasRenderer from './components/canvas-renderer/canvas-renderer';
// import SVGRenderer from './components/svgRenderer';

import './main.scss';

let currEntity, domElements;
domElements = {
  container: 'container',
  canvas: 'canvas',
  svg: 'svg',
  addForm: 'add-form',
  infoBar: 'info-bar'
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
  document.getElementById(domElements.container).innerHTML = '';
}

// Set Local methods to Global (Window) scope
window.onMenuChange = onMenuChange;
window.clearContainer = clearContainer;
window.domElements = domElements;
window.setDefaults = setDefaults;
