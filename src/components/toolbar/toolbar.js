import InfoBar from '../entity-info/entity-info';
import ToolbarView from './toolbar-view';

class Toolbar {
  constructor(domElements, model) {
    this.domElements = domElements;
    this.infoBar = new InfoBar(this.domElements, model);
    this.view = new ToolbarView(domElements);
    this.displayToolbar();
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

export default Toolbar;
