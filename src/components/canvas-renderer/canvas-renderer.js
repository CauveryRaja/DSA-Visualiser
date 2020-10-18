import DynamicArray from '../dynamic-array/dynamic-array';
// import LinkedList from '../';
import InfoBar from './infoBar';
import ToolbarRenderer from './toolbarRenderer';

import CanvasModel from './canvas-model';
import CanvasView from './canvas-view';

class CanvasRenderer {

  constructor() {
    this.model = new CanvasModel();
    this.view = new CanvasView();
    this.domElements = {};
  }

  init(domElements, modelType) {
    this.domElements = domElements;
    this.view.displayCanvas();
    this.configureModel(modelType, this.view.getContext());
  }

  configureModel(type, cxt) {
    switch(type) {
      case 'DynamicArray': this.model.entity = new DynamicArray(cxt);
                            break;
      case 'LinkedList':   this.model.entity = new LinkedList(cxt);
                            break;
    }
    this.toolbar = new ToolbarRenderer(this.domElements, this.model.entity);
    this.infoBar = new InfoBar(this.domElements, this.model.entity);
    this.infoBar.init(type);
  }
}

export default CanvasRenderer;
