function truncate(str, maxlength) {
  if (typeof str !== "string" || typeof maxlength !== "number") {
    throw new TypeError("Неккоректный тип аргументов");
  }

  if (maxlength < 0) {
    throw new TypeError("Максимальная длина должна быть неотрицательной");
  }

  return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
}
