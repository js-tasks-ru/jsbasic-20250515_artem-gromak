import createElement from "../../assets/lib/create-element.js";

/**
 * Класс Carousel представляет компонент карусели.
 * Создает DOM-элемент карусели, поддерживает переключение слайдов и генерирует событие при добавлении товара.
 */
export default class Carousel {
  /**
   * Создает экземпляр карусели.
   * @param {Object[]} slides - Массив объектов с данными о слайдах.
   * @param {string} slides[].id - Уникальный идентификатор товара.
   * @param {string} slides[].name - Название товара.
   * @param {number} slides[].price - Цена товара.
   * @param {string} slides[].image - Название файла изображения.
   * @throws {Error} Если массив слайдов пуст или содержит некорректные данные.
   */
  constructor(slides) {
    this._validateSlides(slides);
    this._slides = slides;
    this._currentSlide = 0;
    this._elem = this._render();
    this._initEventListeners();
  }

  /**
   * Возвращает корневой DOM-элемент карусели.
   * @returns {HTMLElement} Корневой элемент карусели.
   */
  get elem() {
    return this._elem;
  }

  /**
   * Проверяет корректность массива слайдов.
   * @param {Object[]} slides - Массив слайдов.
   * @throws {Error} Если массив пуст или слайды не содержат обязательных полей.
   */
  _validateSlides(slides) {
    if (!Array.isArray(slides) || slides.length === 0) {
      throw new Error("Массив слайдов не должен быть пустым");
    }
    const requiredFields = ["id", "name", "price", "image"];
    slides.forEach((slide, index) => {
      requiredFields.forEach((field) => {
        if (!(field in slide)) {
          throw new Error(
            `На слайде с индексом ${index} отсутствует обязательное поле: "${field}"`
          );
        }
      });
    });
  }

  /**
   * Создает DOM-структуру карусели.
   * @returns {HTMLElement} Корневой элемент карусели.
   */
  _render() {
    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left" style="display: none;">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this._slides
        .map(
          (slide) => `
            <div class="carousel__slide"
            data-id="${this._escapeHtml(slide.id)}">
              <img
              src="/assets/images/carousel/${this._escapeHtml(slide.image)}"
              class="carousel__img"
              alt="slide">
              <div class="carousel__caption">
                <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                <div class="carousel__title">
                ${this._escapeHtml(slide.name)}
                </div>
                <button
                type="button"
                class="carousel__button"
                aria-label="Add ${this._escapeHtml(slide.name)} to cart">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>
            </div>
          `
        )
        .join("")}
        </div>
      </div>
    `);

    return carousel;
  }

  /**
   * Инициализирует обработчики событий для карусели.
   */
  _initEventListeners() {
    const arrowRight = this._elem.querySelector(".carousel__arrow_right");
    const arrowLeft = this._elem.querySelector(".carousel__arrow_left");

    // Обработчики для стрелок
    arrowRight.addEventListener("click", () => this._nextSlide());
    arrowLeft.addEventListener("click", () => this._prevSlide());

    // Обработчик для кнопок добавления
    this._elem.addEventListener("click", (event) => {
      const button = event.target.closest(".carousel__button");
      if (button) {
        const slide = button.closest(".carousel__slide");
        const slideId = slide.dataset.id;
        const customEvent = new CustomEvent("product-add", {
          detail: slideId,
          bubbles: true,
        });
        this._elem.dispatchEvent(customEvent);
      }
    });

    // Обновление видимости стрелок
    this._updateArrows();
  }

  /**
   * Переключает карусель на следующий слайд.
   */
  _nextSlide() {
    if (this._currentSlide < this._slides.length - 1) {
      this._currentSlide++;
      this._updateCarousel();
    }
  }

  /**
   * Переключает карусель на предыдущий слайд.
   */
  _prevSlide() {
    if (this._currentSlide > 0) {
      this._currentSlide--;
      this._updateCarousel();
    }
  }

  /**
   * Обновляет положение карусели и видимость стрелок.
   */
  _updateCarousel() {
    const inner = this._elem.querySelector(".carousel__inner");
    const slideWidth = inner.querySelector(".carousel__slide").offsetWidth;
    inner.style.transform = `translateX(-${this._currentSlide * slideWidth}px)`;
    this._updateArrows();
  }

  /**
   * Обновляет видимость стрелок в зависимости от текущего слайда.
   */
  _updateArrows() {
    const arrowRight = this._elem.querySelector(".carousel__arrow_right");
    const arrowLeft = this._elem.querySelector(".carousel__arrow_left");
    arrowLeft.style.display = this._currentSlide === 0 ? "none" : "";
    arrowRight.style.display =
      this._currentSlide === this._slides.length - 1 ? "none" : "";
  }

  /**
   * Экранирует HTML-символы в строке для предотвращения XSS.
   * @param {string} text - Текст для экранирования.
   * @returns {string} Экранированный текст.
   */
  _escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}

//////////////////////
/** Класс ProductCard без импортируемой функции createElement  */
//////////////////////

// /**
//  * Класс Carousel представляет компонент карусели.
//  * Создает DOM-элемент карусели, поддерживает переключение слайдов и генерирует событие при добавлении товара.
//  */
// export default class Carousel {
//   /**
//    * Создает экземпляр карусели.
//    * @param {Object[]} slides - Массив объектов с данными о слайдах.
//    * @param {string} slides[].id - Уникальный идентификатор товара.
//    * @param {string} slides[].name - Название товара.
//    * @param {number} slides[].price - Цена товара.
//    * @param {string} slides[].image - Название файла изображения.
//    * @throws {Error} Если массив слайдов пуст или содержит некорректные данные.
//    */
//   constructor(slides) {
//     this._validateSlides(slides);
//     this._slides = slides;
//     this._currentSlide = 0;
//     this._elem = this._render();
//     this._initEventListeners();
//   }

//   /**
//    * Возвращает корневой DOM-элемент карусели.
//    * @returns {HTMLElement} Корневой элемент карусели.
//    */
//   get elem() {
//     return this._elem;
//   }

//   /**
//    * Проверяет корректность массива слайдов.
//    * @param {Object[]} slides - Массив слайдов.
//    * @throws {Error} Если массив пуст или слайды не содержат обязательных полей.
//    */
// _validateSlides(slides) {
//   if (!Array.isArray(slides) || slides.length === 0) {
//     throw new Error('Массив слайдов не должен быть пустым');
//   }
//   const requiredFields = ['id', 'name', 'price', 'image'];
//   slides.forEach((slide, index) => {
//     requiredFields.forEach(field => {
//       if (!(field in slide)) {
//         throw new Error(`На слайде с индексом ${index} отсутствует обязательное поле: "${field}"`);
//       }
//     });
//   });
// }

//   /**
//    * Создает DOM-структуру карусели.
//    * @returns {HTMLElement} Корневой элемент карусели.
//    */
//   _render() {
//     const carousel = this._createElement('div', ['carousel']);
//     carousel.append(
//       this._createArrow('right', '/assets/images/icons/angle-icon.svg'),
//       this._createArrow('left', '/assets/images/icons/angle-left-icon.svg', { display: 'none' }),
//       this._createInner()
//     );
//     return carousel;
//   }

//   /**
//    * Создает элемент стрелки для навигации.
//    * @param {string} direction - Направление стрелки ('left' или 'right').
//    * @param {string} iconSrc - Путь к иконке стрелки.
//    * @param {Object} styles - CSS-стили для стрелки (опционально).
//    * @returns {HTMLElement} Элемент стрелки.
//    */
//   _createArrow(direction, iconSrc, styles = {}) {
//     const arrow = this._createElement('div', [`carousel__arrow`, `carousel__arrow_${direction}`]);
//     const img = this._createElement('img', [], null, { src: iconSrc, alt: 'icon' });
//     arrow.append(img);
//     Object.entries(styles).forEach(([key, value]) => {
//       arrow.style[key] = value;
//     });
//     return arrow;
//   }

//   /**
//    * Создает контейнер для слайдов.
//    * @returns {HTMLElement} Элемент с классом carousel__inner.
//    */
//   _createInner() {
//     const inner = this._createElement('div', ['carousel__inner']);
//     this._slides.forEach(slide => {
//       inner.append(this._createSlide(slide));
//     });
//     return inner;
//   }

//   /**
//    * Создает элемент слайда.
//    * @param {Object} slide - Данные слайда.
//    * @returns {HTMLElement} Элемент слайда.
//    */
//   _createSlide(slide) {
//     const slideEl = this._createElement('div', ['carousel__slide'], null, { 'data-id': slide.id });
//     const img = this._createElement('img', ['carousel__img'], null, {
//       src: `/assets/images/carousel/${slide.image}`,
//       alt: 'slide'
//     });
//     const caption = this._createElement('div', ['carousel__caption']);
//     const price = this._createElement('span', ['carousel__price'], `€${slide.price.toFixed(2)}`);
//     const title = this._createElement('div', ['carousel__title'], slide.name);
//     const button = this._createElement('button', ['carousel__button'], null, {
//       type: 'button',
//       'aria-label': `Add ${slide.name} to cart`
//     });
//     const buttonImg = this._createElement('img', [], null, {
//       src: '/assets/images/icons/plus-icon.svg',
//       alt: 'icon'
//     });

//     button.append(buttonImg);
//     caption.append(price, title, button);
//     slideEl.append(img, caption);
//     return slideEl;
//   }

//   /**
//    * Создает DOM-элемент с указанными классами, текстом и атрибутами.
//    * @param {string} tag - Тег элемента.
//    * @param {string[]} classes - Массив классов (опционально).
//    * @param {string|null} textContent - Текстовое содержимое (опционально).
//    * @param {Object} attributes - Атрибуты элемента (опционально).
//    * @returns {HTMLElement} Созданный элемент.
//    */
//   _createElement(tag, classes = [], textContent = null, attributes = {}) {
//     const element = document.createElement(tag);
//     if (classes.length) {
//       element.classList.add(...classes);
//     }
//     if (textContent !== null) {
//       element.textContent = textContent;
//     }
//     Object.entries(attributes).forEach(([key, value]) => {
//       element.setAttribute(key, value);
//     });
//     return element;
//   }

//   /**
//    * Инициализирует обработчики событий для карусели.
//    */
//   _initEventListeners() {
//     const arrowRight = this._elem.querySelector('.carousel__arrow_right');
//     const arrowLeft = this._elem.querySelector('.carousel__arrow_left');

//     // Обработчики для стрелок
//     arrowRight.addEventListener('click', () => this._nextSlide());
//     arrowLeft.addEventListener('click', () => this._prevSlide());

//     // Обработчик для кнопок добавления
//     this._elem.addEventListener('click', (event) => {
//       const button = event.target.closest('.carousel__button');
//       if (button) {
//         const slide = button.closest('.carousel__slide');
//         const slideId = slide.dataset.id;
//         const customEvent = new CustomEvent('product-add', {
//           detail: slideId,
//           bubbles: true,
//         });
//         this._elem.dispatchEvent(customEvent);
//       }
//    });

//     // Обновление видимости стрелок
//     this._updateArrows();
//   }

//   /**
//    * Переключает карусель на следующий слайд.
//    */
//   _nextSlide() {
//     if (this._currentSlide < this._slides.length - 1) {
//       this._currentSlide++;
//       this._updateCarousel();
//     }
//   }

//   /**
//    * Переключает карусель на предыдущий слайд.
//    */
//   _prevSlide() {
//     if (this._currentSlide > 0) {
//       this._currentSlide--;
//       this._updateCarousel();
//     }
//   }

//   /**
//    * Обновляет положение карусели и видимость стрелок.
//    */
//   _updateCarousel() {
//     const inner = this._elem.querySelector('.carousel__inner');
//     const slideWidth = inner.querySelector('.carousel__slide').offsetWidth;
//     inner.style.transform = `translateX(-${this._currentSlide * slideWidth}px)`;
//     this._updateArrows();
//   }

//   /**
//    * Обновляет видимость стрелок в зависимости от текущего слайда.
//    */
//   _updateArrows() {
//     const arrowRight = this._elem.querySelector('.carousel__arrow_right');
//     const arrowLeft = this._elem.querySelector('.carousel__arrow_left');
//     arrowLeft.style.display = this._currentSlide === 0 ? 'none' : '';
//     arrowRight.style.display = this._currentSlide === this._slides.length - 1 ? 'none' : '';
//   }
// }
