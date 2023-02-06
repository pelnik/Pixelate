const table = document.querySelector('table');
const addRowButton = document.querySelector('#add-row');

const numberOfColumns = 20;

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
  cell.classList.toggle('aquaCell')
}

table.addEventListener('click', colorize);