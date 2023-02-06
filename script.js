const table = document.querySelector('table');
const addRowButton = document.querySelector('#add-row');
const selectElement = document.querySelector('#color-select');
const fillGridElement = document.querySelector('#fill-grid');
const fillBackgroundElement = document.querySelector('#fill-uncolored-cells');
const clearGridElement = document.querySelector('#clear-grid');
const numberOfColsElement = document.querySelector('#number-of-columns');
const columnAdjustmentElements = [...document.querySelectorAll('.column-adjustments')];


let numberOfColumns = 20;
let currentColorClass = 'redCell';


function makeRow() {
  const newRow = document.createElement('tr');

  for (let i = 0; i < numberOfColumns; i++) {
    const newCell = document.createElement('td');
    newRow.appendChild(newCell);
  }

  table.appendChild(newRow);
}

addRowButton.addEventListener('click', makeRow);


let mouseStatus = null;


document.addEventListener('mouseup', () => {
  mouseStatus = 'mouseup';
})
document.addEventListener('mousedown',  () => {
  mouseStatus = 'mousedown';
})


function colorize(evt) {
  const cell = evt.target;
  const cellClassList = cell.classList;
  const targetElementType = evt.target.nodeName;
  const eventType = evt.type;

  if (targetElementType !== 'TD') {
    return null;
  }

  if (eventType === 'mousedown') {
    if (cellClassList.contains(currentColorClass)) {
      cellClassList.remove(currentColorClass)
    } else {
      cellClassList.add(currentColorClass);
    }
  }

  if (eventType === 'mouseover' &&
      !cellClassList.contains(currentColorClass) &&
      mouseStatus === 'mousedown') {
    cellClassList.add(currentColorClass);
  }

}

table.addEventListener('mousedown', colorize);
table.addEventListener('mouseover', colorize);



function selectorChange(evt) {
  currentColorClass = evt.target.value;
}

selectElement.addEventListener('change', selectorChange)


function fillGrid() {
  allCells = [...document.querySelectorAll('td')];

  for (let i = 0; i < allCells.length; i++) {
    const cell = allCells[i];

    cell.className = '';
    cell.classList.add(currentColorClass);
  }
}


fillGridElement.addEventListener('click', fillGrid);



function fillBackground() {
  allCells = [...document.querySelectorAll('td')];

  for (let i = 0; i < allCells.length; i++) {
    const cell = allCells[i];

    if (cell.classList.length === 0) {
      cell.classList.add(currentColorClass);
    }
  }
}


fillBackgroundElement.addEventListener('click', fillBackground);



function clearGrid() {
  allCells = [...document.querySelectorAll('td')];

  for (let i = 0; i < allCells.length; i++) {
    const cell = allCells[i];
    cell.className = '';
  }
}

clearGridElement.addEventListener('click', clearGrid);


numberOfColsElement.textContent = numberOfColumns;

function columnAdjustments(evt) {
  const id = evt.target.id;

  if  (id === 'adjust-columns-up') {
    numberOfColumns += 1;
  } else if (id === 'adjust-columns-down') {
    numberOfColumns -= 1; 
  }

  numberOfColsElement.textContent = numberOfColumns;
}



columnAdjustmentElements.forEach((element) => {
  element.addEventListener('click', columnAdjustments);
});