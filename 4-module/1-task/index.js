function makeFriendsList(friends) {
  // Проверка, что входной аргумент — массив
  if (!Array.isArray(friends)) {
    throw new TypeError("Аргумент должен быть массивом");
  }

  // Создаем DOM-элемент <ul>
  const ulElement = document.createElement("ul");

  // Если массив пуст, возвращаем пустой <ul>
  if (friends.length === 0) {
    return ulElement;
  }

  friends.forEach((friend) => {
    const li = document.createElement("li");
    li.textContent = `${friend.firstName} ${friend.lastName}`;
    ulElement.appendChild(li);
  });

  return ulElement;
}
