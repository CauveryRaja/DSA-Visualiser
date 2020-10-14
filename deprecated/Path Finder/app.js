let rows, cols, gridElm, gridContainer;

function init() {
    gridElm = document.getElementById('grid');
    gridContainer = document.querySelector('.grid-container');
    rows = Math.floor(gridContainer.offsetHeight/10);
    cols = Math.floor(gridContainer.offsetWidth/10);
    console.log(gridContainer, gridContainer.style.width, gridContainer.style.height, rows, cols);
}

function displayGrid() {
    let htmlStr = '';
    for(let i=0; i<rows; i++) {
        htmlStr += `<tr id="row-${i}" class="rows">`;
        for(let j=0; j<cols; j++) {
            htmlStr += `<td id="cell-${j}" class="cells"></td>`
        }
        htmlStr += `</tr>`
    };
    gridElm.insertAdjacentHTML('afterBegin', htmlStr);
}