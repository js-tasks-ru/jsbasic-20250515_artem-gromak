import createElement from '../../assets/lib/create-element.js';

/**
 * Класс RibbonMenu представляет компонент горизонтального меню с категориями.
 * Поддерживает прокрутку, выбор категории и генерацию события при выборе.
 */
export default class RibbonMenu {
  /**
   * Создает экземпляр меню.
   * @param {Object[]} categories - Массив объектов с данными о категориях.
   * @param {string} categories[].id - Уникальный идентификатор категории (пустой для "All").
   * @param {string} categories[].name - Название категории для отображения.
   * @throws {Error} Если массив категорий пуст или содержит некорректные данные.
   */
  constructor(categories) {
    this._validateCategories(categories);
    this._categories = categories;
    this._elem = this._render();
    this._initEventListeners();
    setTimeout(() => this._updateArrows(), 0);
  }

  /**
   * Возвращает корневой DOM-элемент меню.
   * @returns {HTMLElement} Корневой элемент меню.
   */
  get elem() {
    return this._elem;
  }

  /**
   * Проверяет корректность массива категорий.
   * @param {Object[]} categories - Массив категорий.
   * @throws {Error} Если массив пуст или категории не содержат обязательных полей.
   * @private
   */
  _validateCategories(categories) {
    if (!Array.isArray(categories) || categories.length === 0) {
      throw new Error('Массив Categories не должен быть пустым');
    }
    categories.forEach((category, index) => {
      if (!('name' in category)) {
        throw new Error(`В категории с индексом ${index} отсутствует обязательное поле: «имя»`);
      }
      if (!('id' in category)) {
        category.id = '';
      }
    });
  }

  /**
   * Создает DOM-структуру меню.
   * @returns {HTMLElement} Корневой элемент меню.
   * @private
   */
  _render() {
    const ribbon = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
          ${this._categories.map((category, index) => `
            <a href="#" class="ribbon__item ${index === 0 ? 'ribbon__item_active' : ''}" data-id="${this._escapeHtml(category.id)}">${this._escapeHtml(category.name)}</a>
          `).join('')}
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);
    return ribbon;
  }

  /**
   * Инициализирует обработчики событий для меню.
   * @private
   */
  _initEventListeners() {
    const inner = this._elem.querySelector('.ribbon__inner');
    const arrowLeft = this._elem.querySelector('.ribbon__arrow_left');
    const arrowRight = this._elem.querySelector('.ribbon__arrow_right');

    arrowLeft.addEventListener('click', () => {
      inner.scrollBy(-350, 0);
    });
    arrowRight.addEventListener('click', () => {
      inner.scrollBy(350, 0);
    });

    inner.addEventListener('scroll', () => {
      this._updateArrows();
    });

    inner.addEventListener('click', (event) => {
      const item = event.target.closest('.ribbon__item');
      if (item) {
        event.preventDefault();
        this._selectCategory(item);
      }
    });
  }

  /**
   * Обновляет видимость стрелок прокрутки.
   * @private
   */
  _updateArrows() {
    const inner = this._elem.querySelector('.ribbon__inner');
    const arrowLeft = this._elem.querySelector('.ribbon__arrow_left');
    const arrowRight = this._elem.querySelector('.ribbon__arrow_right');

    const scrollLeft = inner.scrollLeft;
    const scrollWidth = inner.scrollWidth;
    const clientWidth = inner.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    const hasOverflow = scrollWidth > clientWidth;

    arrowLeft.classList.toggle('ribbon__arrow_visible', hasOverflow && scrollLeft > 0);
    arrowRight.classList.toggle('ribbon__arrow_visible', hasOverflow && scrollRight >= 1);
  }

  /**
   * Обрабатывает выбор категории.
   * @param {HTMLAnchorElement} item - Элемент выбранной категории.
   * @private
   */
  _selectCategory(item) {
    const activeItem = this._elem.querySelector('.ribbon__item_active');
    if (activeItem) {
      activeItem.classList.remove('ribbon__item_active');
    }

    // Добавляем активный класс на новую категорию
    item.classList.add('ribbon__item_active');

    // Генерируем событие ribbon-select
    const categoryId = item.dataset.id;
    const customEvent = new CustomEvent('ribbon-select', {
      detail: categoryId,
      bubbles: true
    });
    this._elem.dispatchEvent(customEvent);
  }

  /**
   * Экранирует HTML-символы в строке для предотвращения XSS.
   * @param {string} text - Текст для экранирования.
   * @returns {string} Экранированный текст.
   * @private
   */
  _escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
