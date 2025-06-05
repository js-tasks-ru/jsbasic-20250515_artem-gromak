function hideSelf() {
  // Находим кнопку с классом hide-self-button
  const button = document.querySelector(".hide-self-button");

  // Проверяем, что кнопка существует
  if (!button) {
    console.warn("Кнопка с классом hide-self-button не найдена");
    return;
  }

  // Добавляем обработчик события click
  button.addEventListener("click", () => {
    button.hidden = true;
  });
}
