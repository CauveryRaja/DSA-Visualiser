import './canvas-renderer.scss';

class CanvasView {
    constructor(domElements) {
        this.domElements = domElements;
    }

    displayCanvas() {
      let canvas = `<canvas class=\'canvasElm\' id=\'canvas\' width=\'500\' height=\'450\'>
                    </canvas>`;
      document.getElementById(this.domElements.container).insertAdjacentHTML('beforeEnd', canvas);
    }

    getContext() {
      return document.getElementById(this.domElements.canvas).getContext('2d');
    }
}

export default CanvasView;
