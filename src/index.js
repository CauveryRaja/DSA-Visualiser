import CanvasRenderer from './modules/canvasRenderer';
import SVGRenderer from './modules/svgRenderer';

import './css/master.css';

let domElements = {
  containerId: 'container',
  canvasId: 'canvas',
  svgId: 'svg'
};

function onMenuChange(activeMenu) {
  clearContainer();
  console.log(activeMenu);
  if(activeMenu === 'DynamicArray' || activeMenu === 'LinkedList') {
    let canvas = new CanvasRenderer();
    canvas.init(domElements, activeMenu);
  }
  else if(activeMenu === 'Sort') {
    new SVGRenderer();
  }
}

function clearContainer() {
  document.getElementById(domElements.containerId).innerHTML = '';
}

window.onMenuChange = onMenuChange;
window.clearContainer = clearContainer;
window.domElements = domElements;
