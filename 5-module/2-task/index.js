function toggleText() {
  // Находим кнопку с классом toggle-text-button
  const button = document.querySelector(".toggle-text-button");

  // Проверяем, что кнопка существует
  if (!button) {
    console.warn("Кнопка с классом toggle-text-button не найдена");
    return;
  }

  // Добавляем обработчик события click
  button.addEventListener("click", () => {
    if (text.hasAttribute("hidden")) {
      text.removeAttribute("hidden");
    } else {
      text.setAttribute("hidden", "");
    }
  });
}
