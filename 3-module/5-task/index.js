function getMinMax(str) {
  // Проверка, что str — строка
  if (typeof str !== "string") {
    throw new Error("Аргумент должен быть строкой");
  }
  // Получаем массив и фультруем в нем числа
  const numbers = str.split(" ").filter((el) => Number(el));

  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}
