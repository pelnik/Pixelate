const table = document.querySelector('table');
const addRowButton = document.querySelector('#add-row');
const selectElement = document.querySelector('#color-select');

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


let mouseStatus = null;


document.addEventListener('mouseup', () => {
  mouseStatus = 'mouseup';
  console.log(mouseStatus);
})
document.addEventListener('mousedown',  () => {
  mouseStatus = 'mousedown';
  console.log(mouseStatus);
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


