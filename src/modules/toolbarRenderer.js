class ToolbarRenderer {
  constructor(domElements) {
    this.domElements = domElements;
    this.displayToolbar();
  }

  displayToolbar() {
    let toolbar = `<ul id='toolbar'>
                    <li id="addData"><i class='fa fa-plus'></i></li>
                    <li id="updateData"><i class='fa fa-edit'></i></li>
                    <li id="deleteData"><i class='fa fa-trash'></i></li>
                  </ul>`;
    document.getElementById(this.domElements.containerId).insertAdjacentHTML('beforeEnd', toolbar);
    this.configureEvents();
  }

  configureEvents() {
      document.getElementById('toolbar').addEventListener('click', function() {
        let target = event.target;
        if(target.matches('#addData')) {
          displayAddModal();
        }
      });
  }

  displayAddModal() {
    let addModel = `<div class="addModal">
                        <form id="addForm">
                          <div class="form-group">
                            <label>Data</label>
                            <input type="number" name="data">
                          </div>
                          <div class="form-group">
                            <label>Position</label>
                            <input type="number" name="index">
                          </div>
                          <input type="button" class="addBtn">
                        </form>
                    </div>`;

    let addModel = 
  }

}
