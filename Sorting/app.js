let arr, svgCanvas, size, sortActions;

function init() {
    arr = [];
    sortActions = [];
    svgCanvas = document.getElementById('svg');
    generateArray();
}

function generateArray() {
    size = 20;
    for(let i=0; i<size; i++) {
        arr[i] = Math.ceil(Math.random()*500);
        renderElm(i, arr[i]);
    };
    // quickSort(0, size-1);
    // bubbleSort();
    mergeSort(0 ,size-1);
    triggerActions(sortActions);
}


// Quick Sort with Animation Algorithm
function partition(l,h) {
    let i=l, j=h;
    let sortActions = [];
    while(i<j) {
        for(; i<=h; i++) {
            sortActions.push({ elm: i, actionType: 'traverse' });
            if(arr[i]>arr[l]) 
                break;
        }
        for(; j>l; j--) {
            sortActions.push({ elm: j, actionType: 'traverse' });
            if(arr[j]<arr[l]) 
                break;
        }
        if(i<j) {
            sortActions.push([{ elm: i, actionType: 'active' }, { elm: j, actionType: 'active' }]);
            swap(i,j);
            sortActions.push({ elm: [i, j, arr[i], arr[j]], actionType: 'swap' });
            sortActions.push([{ elm: i, actionType: 'default' }, { elm: j, actionType: 'default' }]);
        }
    }
    if(i>j) {
        sortActions.push([{ elm: l, actionType: 'active' }, { elm: j, actionType: 'active' }]);
        swap(l,j);
        sortActions.push({ elm: [l,j,arr[l],arr[j]], actionType: 'swap' });
        sortActions.push([{ elm: l, actionType: 'default' }, { elm: j, actionType: 'default' }]);
    }
    // triggerActions(sortActions);
    return [j, sortActions];
}

function quickSort(l,h) {
    let m, actions;
    if(l<h) {
        [m, actions] = partition(l,h);
        sortActions = [...sortActions, ...actions];
        quickSort(l, m-1);
        quickSort(m+1, h);
    }
}

// Bubble Sort with Animations Algorithm
function bubbleSort() {
    let n = arr.length;
    for(let i=0; i<n-1; i++) {
        for(let j=0; j<n-i; j++) {
            sortActions.push({ elm: j, actionType: 'traverse' });
            if(arr[j] > arr[j+1]) {
                sortActions.push([{ elm: j, actionType: 'active' }, { elm: j+1, actionType: 'active' }]);
                swap(j, j+1);
                sortActions.push({ elm: [j, j+1, arr[j], arr[j+1]], actionType: 'swap' });
                sortActions.push([{ elm: j, actionType: 'default' }, { elm: j+1, actionType: 'default' }]);
            }
        }
    }
}

// Merge Sort with Animations Algorithm
function mergeSort(l, h) {
    if(l<h) {
        let m = Math.floor((l+h)/2);
        mergeSort(l, m);
        mergeSort(m+1, h);
        merge(l,m,h)
    }
}

function merge(l, m, h) {
    let i, j, temp;
    i = l;
    j = m+1;
    temp = [];
    while(i<=m && j<=h) {
        if(arr[i]<arr[j]) {
            temp.push(arr[i++]);
        }
        else {
            temp.push(arr[j++]);
        }
    }
    for(;i<=m; i++) {
        temp.push(arr[i]);
    }
    for(; j<=h; j++) {
        temp.push(arr[j]);
    }
    sortActions.push({ elm: [l,h], actionType: 'activeRange' });
    let anime = [];
    for(let k = l, x=0; k<=h; k++) {
        arr[k] = temp[x++];
        anime.push({ elm: [k, temp[x-1]], actionType: 'transform' });
    }
    sortActions.push(anime);
    sortActions.push({ elm: [l,h], actionType: 'defaultRange' });
}

function renderElm(index, height) {
    svgCanvas.insertAdjacentHTML('beforeend', 
    `<rect id="bar-${index}" fill="url(#MyGradient)" x="${index*15}" y="0" width="10" height="${height}">
         <animate id="bar-anime-${index}" attributeName="height" values="0;${height}" dur="0.5s" repeatCount="1"/>
    </rect>`);
}

function swap(i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

function triggerActions(events) {
    console.log(events);
    events.forEach((entry, i) => {
        setTimeout(() => {
            if(entry instanceof Array) {
                entry.forEach(subEntry => {
                    let innerMethod = getMethodByAction(subEntry.actionType);
                    innerMethod.call(this, subEntry.elm)
                });
            }
            else {
                let method = getMethodByAction(entry.actionType);
                method.call(this, entry.elm);
            }
        }, i*1000);
    });
}

function getMethodByAction(actionType) {
    let method;
    switch(actionType) {
        case 'active':      method = setActiveBar;
                            break;
        case 'activeRange': method = setActiveRange;
                            break;
        case 'defaultRange': method = setDefaultRange;
                            break;
        case 'traverse':    method = traverseBar;
                            break;
        case 'transform':   method = transformBar;
                            break;
        case 'sorted':      method = sortedBar;
                            break;
        case 'swap':        method = swapBar;
                            break;
        default:            method = drawElmBar;
    }
    return method;
}

function setActiveBar(elm) {
    let bar = document.getElementById('bar-'+elm);
    bar.style.fill = 'lightgreen';
}

// Used Only by Merge Sort
function setActiveRange(elm) {
    let [start, end] = [...elm];
    for(let i=start; i<=end; i++) {
        let bar = document.getElementById('bar-'+i);
        bar.style.fill = 'lightgreen';
    }
}

// Used Only by Merge Sort
function setDefaultRange(elm) {
    let [start, end] = [...elm];
    for(let i=start; i<=end; i++) {
        let bar = document.getElementById('bar-'+i);
        bar.style.fill = 'url(#MyGradient)';
    }
}

// Used Only by Merge Sort
function transformBar(elm) {
    let [index, height] = [...elm];
    let elm1 = document.getElementById('bar-'+index);

    elm1.style.transition = 'height 0.5s';
    elm1.style.height = height;
}

function traverseBar(elm) {
    let bar = document.getElementById('bar-'+elm);
    bar.style.fill = 'orange';
    setTimeout(() => bar.style.fill = 'url(#MyGradient)', 500);
}

function sortedBar(elm) {
    let bar = document.getElementById('bar-'+elm);
    bar.style.fill = 'green';
}

function swapBar(elms) {
    let [i, j, height1, height2] = [...elms];
    let elm1 = document.getElementById('bar-'+i);
    let elm2 = document.getElementById('bar-'+j);

    elm1.style.transition = 'height 0.5s';
    elm2.style.transition = 'height 0.5s';

    elm1.style.height = height1;
    elm2.style.height = height2;
}

function drawElmBar(elm) {
    let bar = document.getElementById('bar-'+elm);
    bar.style.fill = 'url(#MyGradient)'
}