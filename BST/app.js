let rootNode, size = 0, height = 0, activities = [];

function Node(data, lChild, rChild, pos, level) {
    this.data = data;
    this.leftChild = lChild;
    this.rightChild = rChild;
    this.pos = pos;
    this.level = level;
}

function add(num) {
    num = parseInt(num);
    let node = new Node(num, null, null, null);
    console.log(node);
    node.pos = computeCoordinate(node, tree[size-1]);
    let index = tree.push(node);
    displayNode(node.data,...node.pos);
    size++;
}

function insert(num) {
    activities = [];
    num = parseInt(num);
    if(!rootNode) {
        rootNode = new Node(num, null, null);
        rootNode.level = 0;
        rootNode.pos = computeCoordinate(rootNode);
        displayNode(rootNode.data,...rootNode.pos);
    }
    else {
        let currNode = rootNode, count = 0;
        activities.push({activity: 'traverse', node: currNode});
        let i=0;
        let rootCallback = ()=>traverseNode(currNode.data,...currNode.pos);
        setTimeout(rootCallback.bind(currNode), i++*500);
        while(currNode != null) {
            let child = num <= currNode.data ? 'leftChild' : 'rightChild';
            count++;
            if(currNode[child]) {
                currNode = currNode[child];
                activities.push({activity: 'traverse', node: currNode});
                let callback = (currNode) => {
                    traverseNode(currNode.data,...currNode.pos);
                    console.log(i*500);
                };
                setTimeout(callback.bind(this, currNode),i++*500);
            }
            else {
                currNode[child] = new Node(num, null, null);
                currNode[child].level = count;
                if(count>height) {
                    setTimeout(() => displayTree(), i++*500);
                }
                else {
                    currNode[child].pos = computeCoordinate(currNode[child], currNode, child);
                    let callback = () => displayNode(currNode[child].data,...currNode[child].pos,
                        ...currNode.pos, currNode[child].level);
                    setTimeout(callback.bind(currNode), i++*500);
                }
                activities.push({activity: 'add', parent: currNode, node: currNode[child]});
                break;
            }
        }
    }
    size++;
    console.log(activities);
    window.requestAnimationFrame(displayNode);
    animateActivities();
    computeTreeHeight();
}

function traverseNode(data,x,y) {
    console.log('traversing...', x, y, data);
    cxt.moveTo(x+20, y);
    cxt.arc(x, y, 20, 0, Math.PI*2);
    cxt.fillStyle = "green";
    cxt.fill();

    // Data
    cxt.fillStyle = 'white';
    cxt.font = '18px serif';
    cxt.fillText(data, x-4, y+5);
}

function animateActivities() {
    activities.forEach(obj => {
        let {activity, node} = obj;
        switch(obj.activity) {
            case 'traverse': setTimeout(() => displayNode(node.data, ...node.pos, color="green"),1000);
                            break;
        }
    })
}

let cxt, canvasWidth, canvasHeight;
function init() {
    let canvas = document.querySelector('canvas');
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    if(canvas.getContext) {
        cxt = canvas.getContext('2d');
    }
}

function computeCoordinate(node, parent, dir) {
    let pos = [];
    if(!parent) {
        pos[0] = canvasWidth/2;
        pos[1] = 40;
    }
    else {
        let px, py, diff=1;
        [px, py] = [...parent.pos];
        diff += (height+1)-node.level;
        if(dir.startsWith('left')) {
            pos[0] = px - diff*40;
            pos[1] = py + diff*40;
        }
        else {
            pos[0] = px + diff*40;
            pos[1] = py + diff*40;
        }
        console.log(node, parent, diff, pos);
    }
    return pos;
}

function computeTreeHeight() {
    height = Math.floor(Math.log2(size));
}

function displayTree() {
    console.log('Rendering whole tree...');
    cxt.clearRect(0,0, canvasWidth, canvasHeight);
    if(rootNode) {
        displayNode(rootNode.data, ...rootNode.pos);
        displayChildNodes(rootNode);
    }
}

function displayChildNodes(currNode) {
    if(currNode['leftChild']) {
        currNode['leftChild'].pos = computeCoordinate(currNode['leftChild'], currNode, 'left');
        displayNode(currNode['leftChild'].data, ...currNode['leftChild'].pos,
                    ...currNode.pos, currNode['leftChild'].level);
        displayChildNodes(currNode['leftChild']);
    }
    if(currNode['rightChild']) {
        currNode['rightChild'].pos = computeCoordinate(currNode['rightChild'], currNode, 'right');
        displayNode(currNode['rightChild'].data, ...currNode['rightChild'].pos,
                    ...currNode.pos, currNode['rightChild'].level);
        displayChildNodes(currNode['rightChild']);
    }
}

function displayNode(data, x, y, px, py, level, color='orange') {
    cxt.beginPath();

    // Node 
    cxt.moveTo(x+20, y);
    cxt.arc(x, y, 20, 0, Math.PI*2);
    cxt.fillStyle = color;
    cxt.fill();

    // Edges between All nodes except for Root
    if(px && py) {
        cxt.strokeStyle = color;
        cxt.moveTo(x, y);
        cxt.lineTo(px, py);
        cxt.stroke();
    }

    // Data
    cxt.fillStyle = 'black';
    cxt.font = '18px serif';
    cxt.fillText(data, x-4, y+5);
}