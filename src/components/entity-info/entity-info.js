import InfoView from './info-view';

class InfoBar {
  constructor(domElements, entity) {
    this.domElements = domElements;
    this.entity = entity;
    this.view = new InfoView(domElements);
  }

  init(type) {
    this.view.displayInfoBar();
    switch(type) {
      case 'DynamicArray':  this.view.showArrayInfo();
                            break;
      case 'LinkedList':    this.view.showListInfo();
                            break;
    }
  }

  showAddForm() {
      let form = this.view.showAddForm();
      let insertData = this.entity.insert.bind(this.entity);
      // let form = document.getElementById(this.domElements.addForm);
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        let [data, pos] = [form.elements['data'].value, form.elements['index'].value];
        insertData(data, pos);
      });
  }

}
export default InfoBar;
