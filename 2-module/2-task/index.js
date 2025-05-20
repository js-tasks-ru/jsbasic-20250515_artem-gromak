function isEmpty(obj) {
  if (typeof obj !== "object") {
    throw new TypeError("Аргумент должнен быть объектом");
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }

  return true;
}
