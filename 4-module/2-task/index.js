function makeDiagonalRed(table) {
  // Проверка, что table — это DOM-элемент <table>
  if (!(table instanceof HTMLTableElement)) {
    throw new TypeError("Аргумент должен быть элементом <table>");
  }

  for (let i = 0; i < table.rows.length; i++) {
    if (table.rows[i].cells[i]) {
      table.rows[i].cells[i].style.backgroundColor = "red";
    }
  }
}
