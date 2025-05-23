function namify(users) {
  // Проверка, что аргумент — массив
  if (!Array.isArray(users)) {
    throw new Error("Аргумент должен быть массивом");
  }

  // Проверка, что массив не пуст
  if (users.length === 0) {
    throw new Error("Массив не должен быть пустым");
  }

  // Извлечение имен из объектов
  return users.map((user) => user.name);
}
