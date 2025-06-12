/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    if (!Array.isArray(rows)) {
      throw new Error("Аргумент должен быть массивом");
    }

    this._rows = rows;
    this._headers = [
      { label: "Имя", key: "name" },
      { label: "Возраст", key: "age" },
      { label: "Зарплата", key: "salary" },
      { label: "Город", key: "city" },
    ];

    this._elem = this._createTable();
  }

  get elem() {
    return this._elem;
  }

  _createTable() {
    const table = document.createElement("table");

    if (this._rows.length > 0) {
      this._thead = this._createThead();
      table.appendChild(this._thead);
    }

    this._tbody = this._createTbody();
    table.appendChild(this._tbody);

    return table;
  }

  _createThead() {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");

    this._headers.forEach(({ label }) => {
      tr.appendChild(this._createElement("th", label));
    });

    tr.appendChild(this._createElement("th"));
    thead.appendChild(tr);

    return thead;
  }

  _createTbody() {
    const tbody = document.createElement("tbody");

    this._rows.forEach((row) => {
      tbody.appendChild(this._createRow(row));
    });

    return tbody;
  }

  _createRow(row) {
    const tr = document.createElement("tr");

    this._headers.forEach(({ key }) => {
      tr.appendChild(
        this._createElement("td", row[key] !== undefined ? row[key] : "")
      );
    });

    const tdButton = document.createElement("td");
    const button = this._createElement("button", "X");
    button.addEventListener("click", () => this._removeRow(tr, row));
    tdButton.appendChild(button);
    tr.appendChild(tdButton);

    return tr;
  }

  _removeRow(tr, row) {
    const index = this._rows.indexOf(row);
    if (index !== -1) {
      this._rows.splice(index, 1);
      tr.remove();
    }

    if (this._rows.length === 0 && this._thead) {
      this._thead.remove();
      this._thead = null;
    }
  }

  _createElement(tag, textContent = "") {
    const el = document.createElement(tag);
    el.textContent = textContent;
    return el;
  }

  getData() {
    return this._rows;
  }
}
