import DynamicArrayModel from './dynamic-array-model';
import DynamicArrayView, ViewEntry from './dynamic-array-view';

class DynamicArray {
    constructor(cxt) {
        this.model = new DynamicArrayModel();
        this.view = new DynamicArrayView(cxt);
        this.size = 0;
    }

    insert(data, index) {
      data = parseInt(data);
      index = parseInt(index);
      let entryObj = new ViewEntry(data, index);
      this.view.initActions();
      if(!index) {
          this.model.data.push(data);
          this.view.$array.push(entryObj);
          this.view.createAction(entryObj, 'default');
      }
      else {
          this.shiftRight();
          this.model.data[index] = data;
          this.view.$array[index] = entryObj;
          this.view.createAction(entryObj, 'default');
      }
      this.size++;
      this.view.triggerActions();
    }

    shiftRight() {
        this.view.$array[this.size] = new ViewEntry(undefined, this.view.$array);
        this.view.createAction(this.$array[this.size-1], 'default');
        for(let i=this.size-1; i>index; i--) {
            this.model.data[i] = this.model.data[i-1];
            this.view.$array[i].data = this.view.$array[i-1].data;
            this.view.$array[i-1].data = undefined;
            this.View.createAction([JSON.parse(JSON.stringify(this.$array[i])), JSON.parse(JSON.stringify(this.$array[i-1]))],
                                  ['default', 'default']);
        }
    }
}

export default DynamicArray;
