import InfoBar from '../entity-info/entity-info';

class Toolbar {
  constructor(domElements, model) {
    this.domElements = domElements;
    this.infoBar = new InfoBar(this.domElements, model);
    this.displayToolbar();
    this.view = new ToolbarView();
  }

  displayToolbar() {
      this.view.displayToolbar();
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
