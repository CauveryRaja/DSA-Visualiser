import DynamicArray from './dynamicArray';
import LinkedList from './linkedList';

class CanvasRenderer {

  constructor() {
    this.model = '';
    this.domElements = {};
  }

  init(domElements, modelType) {
    this.domElements = domElements;
    this.displayCanvas();
    this.configureModel(modelType, this.getContext());
    console.log(this.model, this.model.insert);
    this.displayToolbar();
  }

  configureModel(type, cxt) {
    switch(type) {
      case 'DynamicArray': this.model = new DynamicArray(cxt);
                            break;
      case 'LinkedList':   this.model = new LinkedList(cxt);
                            break;
    }
  }

  displayCanvas() {
    let canvas = `<canvas class=\'canvasElm\' id='${this.domElements.canvasId}' width=\'500\' height=\'450\'>
                  </canvas>`;
    document.getElementById(this.domElements.containerId).insertAdjacentHTML('beforeEnd', canvas);
  }

  displayToolbar() {
    let toolbar = `<ul class=\'toolbar\'>
                    <li onclick='${this.model.insert.bind(this.model,10,0)}'><i class='fa fa-plus'></i></li>
                    <li><i class='fa fa-edit'></i></li>
                    <li><i class='fa fa-trash'></i></li>
                  </ul>`;
    document.getElementById(this.domElements.containerId).insertAdjacentHTML('beforeEnd', toolbar);
  }

  getContext() {
    return document.getElementById(this.domElements.canvasId).getContext('2d');
  }
}

export default CanvasRenderer;
