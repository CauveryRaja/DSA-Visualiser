import DynamicArrayModel from './dynamic-array-model';
import { DynamicArrayView, ViewEntry } from './dynamic-array-view';

class DynamicArray {
    constructor(cxt) {
        this.model = new DynamicArrayModel();
        this.view = new DynamicArrayView(cxt);
        this.size = 0;
    }

    insert(data, index) {
      data = parseInt(data);
      index = parseInt(index);
      let entryObj = new ViewEntry(data, index ? index: this.size);
      this.view.initActions();
      if(!index) {
          this.model.data.push(data);
          this.view.$array.push(entryObj);
          this.view.createAction(entryObj, 'default');
      }
      else {
          this.shiftRight(index);
          this.model.data[index] = data;
          this.view.$array[index] = entryObj;
          this.view.createAction(entryObj, 'default');
      }
      this.size++;
      this.view.triggerActions();
    }

    shiftRight(index) {
        this.view.$array[this.size] = new ViewEntry(undefined, this.size);
        this.view.createAction(this.view.$array[this.size-1], 'default');
        for(let i=this.size-1; i>index; i--) {
            this.model.data[i] = this.model.data[i-1];
            this.view.$array[i].data = this.view.$array[i-1].data;
            this.view.$array[i-1].data = undefined;
            this.view.createAction([JSON.parse(JSON.stringify(this.view.$array[i])), JSON.parse(JSON.stringify(this.view.$array[i-1]))],
                                  ['default', 'default']);
        }
    }
}

export default DynamicArray;
