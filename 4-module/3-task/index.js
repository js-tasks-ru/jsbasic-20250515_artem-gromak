
function highlight(table) {
  // Проверка, что table — это DOM-элемент <table>
  if (!(table instanceof HTMLTableElement)) {
    throw new TypeError('Аргумент должен быть элементом <table>');
  }

  // Проверка наличия <tbody>
  if (!table.tBodies[0]) {
    return;
  }

  const rows = table.tBodies[0].rows;

  for (const row of rows) {
    if (row.cells.length < 4) {
      continue;
    }

    const ageCell = row.cells[1];
    const genderCell = row.cells[2];
    const statusCell = row.cells[3];

    // 1. Проверяем атрибут data-available у ячейки Status
    const dataAvailable = statusCell.getAttribute('data-available');
    if (dataAvailable === null) {
      row.setAttribute('hidden', '');
    } else {
      row.classList.add(dataAvailable === 'true' ? 'available' : 'unavailable');
    }

    // 2. Проверяем Gender и добавляем класс male/female
    const gender = genderCell.textContent.trim();
    if (gender === 'm') {
      row.classList.add('male');
    } else if (gender === 'f') {
      row.classList.add('female');
    }

    // 3. Проверяем Age и добавляем стиль, если возраст < 18
    const age = parseFloat(ageCell.textContent);
    if (!isNaN(age) && age < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}
