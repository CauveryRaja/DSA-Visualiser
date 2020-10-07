import CanvasRenderer from './modules/canvasRenderer';
import SVGRenderer from './modules/svgRenderer';

let domElements = {
  containerId: 'container',
  canvasId: 'canvas',
  svgId: 'svg'
};

function onMenuChange(activeMenu) {
  clearContainer();
  if(activeMenu === 'DynamicArray' || activeMenu === 'LinkedList') {
    let canvas = new CanvasRenderer();
    canvas.init(domElements, activeMenu);
  }
  else if(activeMenu === 'Sort') {
    new SVGRenderer();
  }
}

function clearContainer() {
  document.getElementById(containerId).innerHTML = '';
}
