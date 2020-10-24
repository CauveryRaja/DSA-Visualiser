import './toolbar.scss';

class ToolbarView {
    constructor(domElements) {
        this.domElements = domElements;
    }

    displayToolbar() {
        let toolbar = `<ul id='toolbar'>
                      <li id="addData" title="Add Element"><i class='fa fa-plus'></i></li>
                      <li id="updateData" title="Update Element"><i class='fa fa-edit'></i></li>
                      <li id="deleteData" title="Delete Element"><i class='fa fa-trash'></i></li>
                    </ul>`;
        document.getElementById(this.domElements.container).insertAdjacentHTML('beforeEnd', toolbar);
    }
}

export default ToolbarView;
