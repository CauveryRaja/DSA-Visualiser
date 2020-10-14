import DynamicArrayModel from './dynamic-array-model';
import DynamicArrayView from './dynamic-array-view';

class DynamicArray {
  constructor() {
    this.model = new DynamicArrayModel();
    this.view = new DynamicArrayView();
  }
}

export default DynamicArray;
