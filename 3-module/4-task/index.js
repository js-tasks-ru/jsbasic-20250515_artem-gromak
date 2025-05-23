function showSalary(users, age) {
  // Проверка, что users — массив
  if (!Array.isArray(users)) {
    throw new Error('Первый аргумент должен быть массивом');
  }

  // Проверка, что age — число
  if (typeof age !== 'number') {
    throw new Error('Второй аргумент должен быть числом');
  }

  // Фильтрация пользователей по возрасту и создание строк
  const result = users
    .filter(user => user.age <= age)
    .map(user => `${user.name}, ${user.balance}`);

  // Объединение строк без лишнего \n в конце
  return result.join('\n');
}
