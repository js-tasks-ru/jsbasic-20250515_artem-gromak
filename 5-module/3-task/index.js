function initCarousel() {
  // Находим элементы
  const carouselInner = document.querySelector(".carousel__inner");
  const arrowRight = document.querySelector(".carousel__arrow_right");
  const arrowLeft = document.querySelector(".carousel__arrow_left");

  // Проверяем наличие всех элементов
  if (!carouselInner || !arrowRight || !arrowLeft) {
    console.warn(
      "Не найдены необходимые элементы карусели (.carousel__inner, .carousel__arrow_right, .carousel__arrow_left)"
    );
    return;
  }

  const slideWidth = carouselInner.offsetWidth;
  const totalSlides = 4;
  let currentIndex = 0;

  // Функция для обновления положения ленты и видимости стрелок
  updateCarousel = () => {
    carouselInner.style.transform = `translateX(-${
      currentIndex * slideWidth
    }px)`;

    arrowLeft.style.display = currentIndex === 0 ? "none" : "";
    arrowRight.style.display = currentIndex === totalSlides - 1 ? "none" : "";
  };

  // Начальная настройка (скрываем стрелку назад, если на первом слайде)
  updateCarousel();

  // Обработчик для стрелки вправо
  arrowRight.addEventListener("click", () => {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Обработчик для стрелки влево
  arrowLeft.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
}
