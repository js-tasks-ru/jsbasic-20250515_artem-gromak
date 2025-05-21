function sumSalary(salaries) {
  if (!salaries || typeof salaries !== "object") {
    throw new TypeError("Некорректный аргумент");
  }

  let sum = 0;

  for (const key in salaries) {
    const value = salaries[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      sum += value;
    }
  }

  return sum;
}
