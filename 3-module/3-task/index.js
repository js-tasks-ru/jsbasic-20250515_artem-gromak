function camelize(str) {
  // Проверка, что str — строка
  if (typeof str !== "string") {
    throw new Error("Аргумент должен быть строкой");
  }

  return str
    .split("-")
    .map((el, idx) => {
      return idx == 0 ? el : el.charAt(0).toUpperCase() + el.slice(1);
    })
    .join("");
}
