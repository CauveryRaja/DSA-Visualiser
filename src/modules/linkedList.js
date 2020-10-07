class LinkedList {
    constructor() {
        this.root = undefined;
        this.size = 0;
    }

    insert2(data, index) {
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

    insertOld(data, index) {
        let node = new ListNode(data);
        node.setIndex(index ? index : this.size);
        node.computeCoordinates();
        let insertActions = [];
        insertActions.push({ node: node, actionType: 'default' });
        if(!this.root) {
            this.root = node;
        }
        this.size++;
        this.triggerActions(insertActions);
    }

    insert(data, index) {
        let node = new ListNode(data);
        node.pos = { x: 200, y: 30 };
        let insertActions = [];
        insertActions.push({ node: node.clone(), actionType: 'new' });
        if(!this.root) {
            this.root = node;
        }
        else {
            if(index) {
                let currNode = this.root;
                while(currNode.next.index != index) {
                    currNode = currNode.next;
                }
                let temp = currNode.next;
                node.next = temp;
                insertActions.push({node: [node, temp], actionType: 'drawEdge'});
                currNode.next = node;
                // insertActions.push({node: [currNode.clone(), node.clone()], actionType: 'drawEdge'});
                // insertActions.push([{node: [currNode.clone(), node.clone()], actionType: 'clearEdge'},
                insertActions.push([{ node: currNode, actionType: 'default' },
                                    { node: [currNode.clone(), temp.clone()], actionType: 'clearEdge'}]);
            }
            else {
                let currNode = this.root;
                while(currNode.next != null) {
                    currNode = currNode.next;
                }
                currNode.next = node;
                insertActions.push({node: [currNode.clone(), node.clone()], actionType: 'drawEdge'});
            }
        }
        insertActions.push({ node: node.clone(), actionType: 'clearCanvas' });
        this.size++;
        this.triggerActions(insertActions);
        setTimeout(() => this.iterateList(this.root), 4000);
    }

    iterateList(node) {
        let iterateActions = [], index = 0;
        while(node != null) {
            node.setIndex(index>=0 ? index : this.size);
            node.computeCoordinates();
            iterateActions.push({ node: node, actionType: 'default' });
            // this.drawNode(node, 'default');
            node = node.next;
            index++;
        }
        this.triggerActions(iterateActions);
    }

    initCanvas() {
        this.$canvas = document.querySelector('canvas');
        if(this.$canvas.getContext) {
            this.$cxt = this.$canvas.getContext('2d');
        }
    }

    triggerActions(events) {
        console.log(events);
        events.forEach((entry, i) => {
            setTimeout(() => {
                if(entry instanceof Array) {
                    entry.forEach(subEntry => {
                        let innerMethod = this.getMethodByAction(subEntry.actionType);
                        innerMethod.call(this, subEntry.node)
                    });
                }
                else {
                    let method = this.getMethodByAction(entry.actionType);
                    method.call(this, entry.node);
                }
            }, i*1000);
        });
    }

    getMethodByAction(actionType) {
        let method;
        switch(actionType) {
            case 'new':         method = this.drawNewNode;
                                break;
            case 'drawEdge':    method = this.drawNodeEdge;
                                break;
            case 'active':      method = this.setActiveNode;
                                break;
            case 'traverse':    method = this.traverseNode;
                                break;
            case 'clear':       method = this.clearElmNode;
                                break;
            case 'clearEdge':   method = this.clearNodeEdge;
                                break;
            case 'clearCanvas': method = this.clearCanvas;
                                break;
            default:            method = this.drawElmNode;
        }
        return method;
    }

    setActiveNode(node) {
        this.drawNode(node, 'active');
    }

    traverseNode(node) {
        this.drawNode(node, 'traverse');
        setTimeout(() => this.drawNode(node, 'default'), 1000);
    }

    clearElmNode(node) {
        this.clearNode(node);
    }

    drawNewNode(node) {
        this.drawOnlyNode(node, 'new');
    }

    drawNodeEdge(nodes) {
        console.log('Draw Edge', nodes);
        this.drawEdge(...nodes);
    }

    clearNodeEdge(nodes) {
        console.log('Clear Edge', nodes);
        this.clearEdge(...nodes);
    }

    drawElmNode(node) {
        this.drawNode(node, 'default');
    }

    drawOnlyNode(node, status) {
        let color = this.getColorByStatus(status);
        let {x,y} = node.pos;
        this.$cxt.fillStyle = color;
        this.$cxt.clearRect(x,y,100,100);

        //Data Section
        this.$cxt.fillRect(x,y,50,50);
        this.$cxt.fillStyle = 'black';
        this.$cxt.strokeRect(x,y,50,50);
        if(node.data) {
            this.$cxt.fillStyle = 'black';
            this.$cxt.font = '18px serif';
            this.$cxt.fillText(node.data, x+20, y+30);
        }

        this.$cxt.fillStyle = '#9c9696';
        this.$cxt.fillRect(x+50,y,50,50);
        this.$cxt.fillStyle = 'black';
        this.$cxt.strokeRect(x+50,y,50,50);
    }

    drawEdge(from, to) {
        console.log(from, to);
        let {x:x1, y:y1} = from.pos;
        let {x:x2, y:y2} = to.pos;

        this.$cxt.arc(x1+75, y1+25, 5, 0, 2*Math.PI, false);
        this.$cxt.fill();

        this.$cxt.beginPath();
        this.$cxt.moveTo(x1+75, y1+25);
        this.$cxt.quadraticCurveTo(x1-200, y1-100, x2, y2+25);
        this.$cxt.stroke();

        // this.$cxt.beginPath();
        this.$cxt.moveTo(x2-5, y2+20);
        this.$cxt.lineTo(x2-5, y2+30);
        this.$cxt.lineTo(x2, y2+25);
        this.$cxt.lineTo(x2-5, y2+20);
        this.$cxt.stroke();
        this.$cxt.closePath();
    }

    clearEdge(from, to) {
        let {x,y} = to.pos;
        this.$cxt.clearRect(x-99, y+20, 99, 30);
    }

    drawNode(node, status) {
        let color = this.getColorByStatus(status);
        let {x,y} = node.pos;
        this.$cxt.fillStyle = color;
        this.$cxt.clearRect(x,y,100,100);

        //Data Section
        this.$cxt.fillRect(x,y,50,50);
        this.$cxt.fillStyle = 'black';
        this.$cxt.strokeRect(x,y,50,50);
        if(node.data) {
            this.$cxt.fillStyle = 'black';
            this.$cxt.font = '18px serif';
            this.$cxt.fillText(node.data, x+20, y+30);
        }

        //Next pointer section along with arrow
        this.$cxt.fillStyle = '#9c9696';
        this.$cxt.fillRect(x+50,y,50,50);
        this.$cxt.fillStyle = 'black';
        this.$cxt.strokeRect(x+50,y,50,50);

        if(node.next) {
            // this.$cxt.arc(x+75, y+25, 5, 0, 2*Math.PI, false);
            // this.$cxt.fill();

            // this.$cxt.beginPath();
            // this.$cxt.moveTo(x+75, y+25);
            // this.$cxt.lineTo(x+200, y+25);
            // this.$cxt.stroke();
            // this.$cxt.closePath();

            // this.$cxt.beginPath();
            // this.$cxt.moveTo(x+190, y+20);
            // this.$cxt.lineTo(x+190, y+30);
            // this.$cxt.lineTo(x+200, y+25);
            // this.$cxt.lineTo(x+190, y+20);
            // this.$cxt.fill();
            // this.$cxt.closePath();

            this.drawEdge(node, node.next);
        }
    }

    clearNode(node) {
        let {x,y} = node.pos;
        this.$cxt.clearRect(x-1,y-2,52,54);
    }

    clearCanvas(node) {
        this.$cxt.clearRect(0,0,this.$canvas.width,this.$canvas.height);
    }

    getColorByStatus(status) {
        let colorMap = {
            'new': 'lightgreen',
            'active': 'green',
            'traverse': 'blue',
            'default': '#e2e2e2'
        }
        return colorMap[status];
    }
}

class ListNode {
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }

    setIndex(index) {
        this.index = index;
    }

    computeCoordinates() {
        let x = 100, y = 200;
        let offset = 100;
        this.pos = {
            x: x + (this.index*2*offset),
            y: y + (Math.floor(this.index/4) * offset)
        };
    }

    clone() {
        return JSON.parse(JSON.stringify(this));
    }
}

export default LinkedList;
