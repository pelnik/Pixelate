const table = document.querySelector('table');
const addRowButton = document.querySelector('#add-row');
const selectElement = document.querySelector('select');

const numberOfColumns = 20;
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

function colorize(evt) {
  const cell = evt.target;
  const cellClassList = cell.classList;

  if (cellClassList.contains(currentColorClass)) {
    cellClassList.remove(currentColorClass)
  } else {
    cellClassList.add(currentColorClass);
  }
}

table.addEventListener('click', colorize);



function selectorChange(evt) {
  currentColorClass = evt.target.value;
}

selectElement.addEventListener('change', selectorChange)