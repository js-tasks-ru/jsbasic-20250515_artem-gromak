function factorial(num) {
  if (typeof num !== "number") {
    throw new TypeError("Аргумент должнен быть числом");
  }

  if (num < 0) {
    throw new TypeError("Аргемент не должен быть меньше нуля");
  }

  if (num === 0 || num === 1) {
    return 1;
  }

  let result = 1;

  for (let i = 2; i <= num; i++) {
    result *= i;
  }

  return result;
}
