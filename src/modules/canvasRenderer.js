import DynamicArray from './modules/dynamicArray';
import LinkedList from './modules/linkedList';

class CanvasRenderer {

  constructor() {
    this.model = '';
    this.domElements = {};
  }

  init(domElements, modelType) {
    this.domElements = domElements;
    this.configureModel(modelType, getContext());
  }

  configureModel(type, cxt) {
    switch(type) {
      'dynamicArray': this.model = new DynamicArray(cxt);
                      break;
      'linkedList':   this.model = new LinkedList(cxt);
                      break;
    }
  }

  displayCanvas() {
    let canvas = `<canvas id='${domElements.canvasId}'>
                  </canvas>`;
    document.getElementById(domElements.containerId).insertAdjacentHTML(canvas, 'beforeend');
  }

  displayToolbar() {
    let toolbar = `<ul className="toolbar">
                    <li onclick='${this.model.insert(10,0)}'><i class='fa fa-add'></i></li>
                    <li><i class='fa fa-edit'></i></li>
                    <li><i class='fa fa-trash'></i></li>
                  </ul>`;
    document.getElementById(domElements.containerId).insertAdjacentHTML(toolbar, 'beforeend');
  }

  getContext() {
    document.getElementById(domElements.canvasId).getContext('2d');
  }
}
