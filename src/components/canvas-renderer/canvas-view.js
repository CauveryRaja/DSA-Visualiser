class CanvasView {
    constructor(domElements) {
        this.domElements = domElements;
    }

    displayCanvas() {
      let canvas = `<canvas class=\'canvasElm\' id=\'canvas\' width=\'500\' height=\'450\'>
                    </canvas>`;
      this.domElements.container.insertAdjacentHTML('beforeEnd', canvas);
    }

    getContext() {
      return this.domElements.canvas.getContext('2d');
    }
}

export default CanvasView;
