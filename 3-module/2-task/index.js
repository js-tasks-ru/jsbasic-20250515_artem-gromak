function filterRange(arr, a, b) {
  // Проверка, что arr — массив
  if (!Array.isArray(arr)) {
    throw new Error("Первый аргумент должен быть массивом");
  }

  // Проверка, что a и b — числа
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Второй и третий аргументы должны быть числами");
  }

  // Проверка, что a <= b
  if (a > b) {
    throw new Error("Значение a должно быть меньше или равно b");
  }

  // Фильтрация элементов в диапазоне [a, b]
  return arr.filter((element) => element >= a && element <= b);
}
