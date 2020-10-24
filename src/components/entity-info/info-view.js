import './entity-info.scss';

class InfoView {
    constructor(domElements) {
        this.domElements = domElements;
    }

    showArrayInfo() {
      this.clearInfoBar();
      let elm = `<div class="dynamicArrayInfo">
                    Dynamic Array doubles its capacity if size exceeds capacity
                 </div>`;
      document.getElementById(this.domElements.infoBar).insertAdjacentHTML('beforeEnd', elm);
    }

    showListInfo() {
      this.clearInfoBar();
      let elm = `<div class="dynamicArrayInfo">
                    Linked List inserts one by one
                 </div>`;
      document.getElementById(this.domElements.infoBar).insertAdjacentHTML('beforeEnd', elm);
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
      document.getElementById(this.domElements.infoBar).insertAdjacentHTML('beforeEnd', domElm);
      return document.getElementById(this.domElements.addForm);
    }

    displayInfoBar() {
      let domElm = `<div id="info-bar">
                  Info bar
                </div>`;
      document.getElementById(this.domElements.container).insertAdjacentHTML('beforeEnd', domElm);
    }

    clearInfoBar() {
      document.getElementById(this.domElements.infoBar).innerHTML = '';
    }
}

export default InfoView;
