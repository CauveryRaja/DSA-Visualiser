import InfoView from './entity-info';

class InfoBar {
  constructor(domElements, entity) {
    this.domElements = domElements;
    this.entity = entity;
    this.view = new InfoView(domElements);
  }

  init(type) {
    this.displayInfoBar();
    switch(type) {
      case 'DynamicArray':  this.showArrayInfo();
                            break;
      case 'LinkedList':    this.showListInfo();
                            break;
    }
  }

  showAddForm() {
      this.view.showAddForm();
      let insertData = this.entity.insert.bind(this.entity);
      let form = this.domElements.addForm;
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        let [data, pos] = [form.elements['data'].value, form.elements['index'].value];
        insertData(data, pos);
      });
  }

}
export default InfoBar;
