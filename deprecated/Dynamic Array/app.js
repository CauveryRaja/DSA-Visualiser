class DynamicArray {
    constructor() {
        this.data = [];
        this.$array = [];
    }

    insert(data, index) {
        data = parseInt(data);
        index = parseInt(index);
        let entryObj = {
            data: data,
            pos: this.computeCoordinates(index ? index : this.$array.length)
        };
        let insertActions = [];
        if(!index) {
            this.data.push(data);
            this.$array.push(entryObj);
            insertActions.push({elm:entryObj, actionType:'default'});
        }
        else {
            let {x,y} = this.computeCoordinates(this.$array.length);
            this.$array[this.$array.length] = {pos:{x:x,y:y}};
            insertActions.push({
                elm:this.$array[this.$array.length-1], 
                actionType:'default'
            });
            for(let i=this.$array.length-1; i>index; i--) {
                this.$array[i].data = this.$array[i-1].data;
                this.$array[i-1].data = undefined;
                insertActions.push([{
                    elm: JSON.parse(JSON.stringify(this.$array[i])),
                    actionType: 'default'
                },
                {
                    elm: JSON.parse(JSON.stringify(this.$array[i-1])),
                    actionType: 'default'
                }]);
            }
            this.$array[index] = entryObj;
            insertActions.push({
                elm: this.$array[index], 
                actionType: 'default'
            });
        }
        this.triggerActions(insertActions);
    }

    computeCoordinates(index) {
        let x = 100, y = 200;
        let offset = 50;
        return {
            x: x + (index*offset),
            y: y + (Math.floor(index/10) * offset)
        }
    }

    initCanvas() {
        let canvas = document.querySelector('canvas');
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;
        if(canvas.getContext) {
            this.$cxt = canvas.getContext('2d');
        }
    }

    triggerActions(events) {
        console.log(events);
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
        console.log('DrawElmCell: ', elm);
        this.drawCell(elm, 'default');
    }

    drawCell(elm, status) {
        let color = this.getColorByStatus(status);
        let {x,y} = elm.pos;
        this.$cxt.fillStyle = color;
        this.$cxt.clearRect(x,y,50,50);
        this.$cxt.fillRect(x,y,50,50);
        this.$cxt.fillStyle = 'black';
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
            'default': 'lightgrey'
        }
        return colorMap[status];
    }
}

let dynArray = new DynamicArray();

// class DynamicArrayCanvas {
//     constructor() {
//         this.initCanvas();
//     }

//     initCanvas() {
//         let canvas = document.querySelector('canvas');
//         canvasWidth = canvas.width;
//         canvasHeight = canvas.height;
//         if(canvas.getContext) {
//             this.$cxt = canvas.getContext('2d');
//         }
//     }

//     traverseCell(elm) {
//         this.drawCell(elm, 'traverse');
//     }

//     drawCell(elm, status) {
//         let color = this.getColorByStatus(status);
//         let [x,y] = elm.pos;
//         this.$cxt.fillStyle = color;
//         this.$cxt.fillRect(x,y,100,100);

//         this.$cxt.fillStyle = 'black';
//         this.$cxt.font = '18px serif';
//         this.$cxt.fillText(data, x-4, y+5);
//     }

//     getColorByStatus(status) {
//         let colorMap = {
//             'active': 'green',
//             'traverse': 'blue' 
//         }
//         return colorMap[status];
//     }
// }