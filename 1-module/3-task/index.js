function ucFirst(str) {
  if (typeof str !== "string") {
    throw new TypeError("Аргумент должен быть строкой.");
  }

  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
}
