import InfoBar from './infoBar';

class ToolbarRenderer {
  constructor(domElements, model) {
    this.domElements = domElements;
    this.infoBar = new InfoBar(this.domElements, model);
    this.displayToolbar();
  }

  displayToolbar() {
    let toolbar = `<ul id='toolbar'>
                    <li id="addData" title="Add Element"><i class='fa fa-plus'></i></li>
                    <li id="updateData" title="Update Element"><i class='fa fa-edit'></i></li>
                    <li id="deleteData" title="Delete Element"><i class='fa fa-trash'></i></li>
                  </ul>`;
    document.getElementById(this.domElements.containerId).insertAdjacentHTML('beforeEnd', toolbar);
    this.configureEvents();
  }

  configureEvents() {
      let showAddForm = this.infoBar.showAddForm.bind(this.infoBar);
      document.getElementById('toolbar').addEventListener('click', function(event) {
        let target = event.target;
        if(target.closest('#addData')) {
          showAddForm();
        }
      });
  }

}

export default ToolbarRenderer;
