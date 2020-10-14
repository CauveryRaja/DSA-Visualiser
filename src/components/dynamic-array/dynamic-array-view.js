class DynamicArrayView {

    constructor(cxt) {
        this.$cxt = cxt;
    }

    computeCoordinates(index) {
        let x = 100, y = 200;
        let offset = 50;
        return {
            x: x + (index*offset),
            y: y + (Math.floor(index/10) * offset)
        }
    }

    triggerActions(events) {
        events.forEach((entry, i) => {
            setTimeout(() => {
                if(entry instanceof Array) {
                    entry.forEach(subEntry => {
                        let innerMethod = this.getMethodByAction(entry.actionType);
                        innerMethod.call(this, subEntry.elm)
                    });
                }
                else {
                    let method = this.getMethodByAction(entry.actionType);
                    method.call(this, entry.elm);
                }
            }, i*1000);
        });
    }

    getMethodByAction(actionType) {
        let method;
        switch(actionType) {
            case 'active':      method = this.setActiveCell;
                                break;
            case 'traverse':    method = this.traverseCell;
                                break;
            default:            method = this.drawElmCell;
        }
        return method;
    }

    setActiveCell(elm) {
        this.drawCell(elm, 'active');
    }

    traverseCell(elm) {
        this.drawCell(elm, 'traverse');
    }

    drawElmCell(elm) {
        this.drawCell(elm, 'default');
    }

    drawCell(elm, status) {
        let color = this.getColorByStatus(status);
        let {x,y} = elm.pos;
        this.$cxt.fillStyle = color;
        this.$cxt.clearRect(x,y,50,50);
        this.$cxt.fillRect(x,y,50,50);

        this.$cxt.strokeStyle = '#cc6600';
        this.$cxt.strokeRect(x,y,50,50);

        // Display Data Value
        if(elm.data) {
            this.$cxt.fillStyle = 'black';
            this.$cxt.font = '18px serif';
            this.$cxt.fillText(elm.data, x+20, y+30);
        }
    }

    getColorByStatus(status) {
        let colorMap = {
            'active': 'green',
            'traverse': 'blue',
            'default': '#ffcc66'
        }
        return colorMap[status];
    }
}

export default DynamicArrayView;
