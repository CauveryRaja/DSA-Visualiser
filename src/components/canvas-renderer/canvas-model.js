class CanvasModel {
    constructor() {
        this.entityType = '';
        this.entity = null;
    }

    setEntityType(type) {
        this.entityType = type;
    }

    setEntity(obj) {
        this.entity = obj;
    }
}

export default CanvasModel;
