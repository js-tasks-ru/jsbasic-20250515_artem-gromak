function checkSpam(str) {
  if (typeof str !== "string") {
    throw new TypeError("Аргумент должен быть строкой.");
  }
  if (!str) {
    return false;
  }

  const lowerStr = str.toLowerCase();
  return lowerStr.includes("1xbet") || lowerStr.includes("xxx");
}
