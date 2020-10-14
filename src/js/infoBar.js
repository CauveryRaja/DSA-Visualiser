class InfoBar {
  constructor(domElements, model) {
    this.domElements = domElements;
    this.model = model;
  }

  init(type) {
    this.displayInfoBar();
    let domElm = '';
    switch(type) {
      case 'DynamicArray': domElm = this.showArrayInfo();
                            break;
      case 'LinkedList': domElm = this.showListInfo();
                            break;
    }
    return domElm;
  }

  showArrayInfo() {
    this.clearInfoBar();
    let elm = `<div class="dynamicArrayInfo">
                  Dynamic Array doubles its capacity if size exceeds capacity
               </div>`;
    document.getElementById('infoBar').insertAdjacentHTML('beforeEnd', elm);
  }

  showListInfo() {
    this.clearInfoBar();
    let elm = `<div class="dynamicArrayInfo">
                  Linked List inserts one by one
               </div>`;
    document.getElementById('infoBar').insertAdjacentHTML('beforeEnd', elm);
  }

  showAddForm() {
    this.clearInfoBar();
    let domElm = `<form id="add-form">
                    <div class="form-title">Add Form</div>
                    <div class="form-group">
                      <label for="data">Data</label>
                      <input type="number" name="data" placeholder="Enter Data" required="true" class="form-field">
                    </div>
                    <div class="form-group">
                      <label for="index">Position</label>
                      <input type="number" name="index" placeholder="Enter Index (Optional)" class="form-field">
                    </div>
                    <button class="addBtn">Add</button>
                  </form>`;
    document.getElementById('infoBar').insertAdjacentHTML('beforeEnd', domElm);
    let insertData = this.model.insert.bind(this.model);
    let form = document.getElementById('add-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      let [data, pos] = [form.elements['data'].value, form.elements['index'].value];
      insertData(data, pos);
    });
  }

  displayInfoBar(domElm) {
    domElm = `<div id="infoBar">
                ${domElm}
              </div>`;
    document.getElementById(this.domElements.containerId).insertAdjacentHTML('beforeEnd', domElm);
  }

  clearInfoBar() {
    document.getElementById('infoBar').innerHTML = '';
  }

}
export default InfoBar;
