import createElement from "../../assets/lib/create-element.js";

/**
 * Класс ProductCard представляет компонент карточки товара.
 * Создает DOM-элемент карточки и генерирует событие при добавлении товара.
 */
export default class ProductCard {
  /**
   * Создает экземпляр карточки товара.
   * @param {Object} product - Объект с данными о товаре.
   * @param {string} product.id - Уникальный идентификатор товара.
   * @param {string} product.name - Название товара.
   * @param {number} product.price - Цена товара.
   * @param {string} product.image - Название файла изображения товара.
   * @param {string} [product.category] - Категория товара (опционально).
   * @throws {Error} Если отсутствуют обязательные поля объекта product.
   */
  constructor(product) {
    this._validateProduct(product);
    this._product = product;
    this._elem = this._render();
    this._initEventListeners();
  }

  /**
   * Возвращает корневой DOM-элемент карточки.
   * @returns {HTMLElement} Корневой элемент карточки.
   */
  get elem() {
    return this._elem;
  }

  /**
   * Проверяет наличие обязательных полей в объекте товара.
   * @param {Object} product - Объект с данными о товаре.
   * @throws {Error} Если отсутствует одно из обязательных полей.
   */
  _validateProduct(product) {
    const requiredFields = ["id", "name", "image", "price"];
    for (const field of requiredFields) {
      if (!(field in product)) {
        throw new Error(`Отсутствует обязательное поле продукта: "${field}"`);
      }
    }
  }

  /**
   * Создает DOM-структуру карточки товара.
   * @returns {HTMLElement} Корневой элемент карточки.
   */
  _render() {
    const { name, image, price } = this._product;

    const card = createElement(`
      <div class="card">
        <div class="card__top">
          <img class="card__image"
            src="/assets/images/products/${image}"
            alt="${this._escapeHtml(name)}">
          <span class="card__price">€${price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this._escapeHtml(name)}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="Add to cart">
          </button>
        </div>
      </div>
    `);

    return card;
  }

  /**
   * Инициализирует обработчики событий для карточки.
   * Генерирует событие `product-add` при клике на кнопку.
   */
  _initEventListeners() {
    const button = this._elem.querySelector(".card__button");

    button.addEventListener("click", () => {
      const event = new CustomEvent("product-add", {
        detail: this._product.id,
        bubbles: true,
      });
      this._elem.dispatchEvent(event);
    });
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
//  * Класс ProductCard представляет компонент карточки товара.
//  * Создает DOM-элемент карточки и генерирует событие при добавлении товара.
//  */
// export default class ProductCard {
// /**
//    * Создает экземпляр карточки товара.
//    * @param {Object} product - Объект с данными о товаре.
//    * @param {string} product.id - Уникальный идентификатор товара.
//    * @param {string} product.name - Название товара.
//    * @param {number} product.price - Цена товара.
//    * @param {string} product.image - Название файла изображения товара.
//    * @param {string} [product.category] - Категория товара (опционально).
//    * @throws {Error} Если отсутствуют обязательные поля объекта product.
//    */
//   constructor(product) {
//     if (!product || !product.id || !product.name || !product.price || !product.image) {
//       throw new Error('Неверные данные о продукте: отсутствуют обязательные поля');
//     }

//     this._product = product;
//     this._createElement = this._createCard();
//     this._initEventListeners();
//   }

// /**
//  * Возвращает корневой DOM-элемент карточки.
//  * @returns {HTMLElement} Корневой элемент карточки.
//  */
//   get elem() {
//     return this._createElement;
//   }

//   /**
//    * Создает DOM-структуру карточки товара.
//    * @returns {HTMLElement} Корневой элемент карточки.
//    */
//   _createCard() {
//     const card = this._createElement('div', ['card']);
//     card.append(
//       this._createCardTop(),
//       this._createCardBody()
//     );
//     return card;
//   }

//   /**
//    * Создает верхнюю часть карточки (изображение и цена).
//    * @returns {HTMLElement} Элемент верхней части карточки.
//    */
//   _createCardTop() {
//     const cardTop = this._createElement('div', ['card__top']);
//     cardTop.append(
//       this._createImage(`/assets/images/products/${this._product.image}`, 'product', ['card__image']),
//       this._createElement('span', ['card__price'], `€${this._product.price.toFixed(2)}`)
//     );
//     return cardTop;
//   }

//   /**
//    * Создает основную часть карточки (название и кнопка).
//    * @returns {HTMLElement} Элемент основной части карточки.
//    */
//   _createCardBody() {
//     const cardBody = this._createElement('div', ['card__body']);
//     const button = this._createElement('button', ['card__button'], null, { type: 'button', 'aria-label': `Add ${this._product.name} to cart` });
//     button.append(this._createImage('/assets/images/icons/plus-icon.svg', 'icon'));
//     cardBody.append(
//       this._createElement('div', ['card__title'], this._product.name),
//       button
//     );
//     return cardBody;
//   }

//   /**
//    * Создает DOM-элемент с указанными классами, текстом и атрибутами.
//    * @param {string} tag - Тег элемента.
//    * @param {string[]} classes - Массив классов.
//    * @param {string|null} textContent - Текстовое содержимое (опционально).
//    * @param {Object} attributes - Объект с атрибутами (опционально).
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
//    * Создает элемент изображения.
//    * @param {string} src - Путь к изображению.
//    * @param {string} alt - Альтернативный текст.
//    * @param {string[]} classes - Массив классов (опционально).
//    * @returns {HTMLImageElement} Элемент изображения.
//    */
//   _createImage(src, alt, classes = []) {
//     return this._createElement('img', classes, null, { src, alt });
//   }

//  /**
//    * Инициализирует обработчики событий для карточки.
//    * Генерирует событие `product-add` при клике на кнопку.
//    */
//   _initEventListeners() {
//     const button = this._createElement.querySelector('.card__button');
//     button.addEventListener('click', () => {
//       const event = new CustomEvent('product-add', {
//         detail: this._product.id,
//         bubbles: true,
//       });
//       this._createElement.dispatchEvent(event);
//     });
//   }
// }
