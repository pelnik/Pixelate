const table = document.querySelector('table');

const numberOfRowsElement = document.querySelector('#number-of-rows');
const addRowButton = document.querySelector('#adjust-rows-up');
const removeRowButton = document.querySelector('#adjust-rows-down');

const selectElement = document.querySelector('#color-select');
const fillGridElement = document.querySelector('#fill-grid');
const fillBackgroundElement = document.querySelector('#fill-uncolored-cells');
const clearGridElement = document.querySelector('#clear-grid');

const numberOfColsElement = document.querySelector('#number-of-columns');
const columnAdjustmentElements = [...document.querySelectorAll('.column-adjustments')];


let numberOfColumns = 20;
let numberOfStartingRows = 3;
let numberOfRows = 0;
let currentColorClass = 'redCell';


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
  const targetElementType = evt.target.tagName;
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


numberOfRowsElement.textContent = numberOfRows;

function makeRow() {
  numberOfRows += 1;
  numberOfRowsElement.textContent = numberOfRows;
  const newRow = document.createElement('tr');

  for (let i = 0; i < numberOfColumns; i++) {
    const newCell = document.createElement('td');
    newRow.appendChild(newCell);
  }

  table.appendChild(newRow);
}

addRowButton.addEventListener('click', makeRow);


function deleteRow() {
  if (!(numberOfRows <= 0)) {
    numberOfRows -= 1;
    numberOfRowsElement.textContent = numberOfRows;
    table.lastChild.remove();
  }
}

removeRowButton.addEventListener('click', deleteRow);


for (let i = 0; i < numberOfStartingRows; i++) {
  makeRow();
}

numberOfColsElement.textContent = numberOfColumns;

function columnAdjustments(evt) {
  const id = evt.target.id;
  const allRows = [...document.querySelectorAll('tr')];

  if  (id === 'adjust-columns-up') {
    numberOfColumns += 1;
    allRows.forEach((row) => {
      const newCell = document.createElement('td');
      row.appendChild(newCell);
    })
  } else if (id === 'adjust-columns-down') {
    numberOfColumns -= 1;
    allRows.forEach((row) => {
      row.removeChild(row.lastChild);
    })

  }

  numberOfColsElement.textContent = numberOfColumns;
}



columnAdjustmentElements.forEach((element) => {
  element.addEventListener('click', columnAdjustments);
});