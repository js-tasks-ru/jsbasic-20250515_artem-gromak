import createElement from '../../assets/lib/create-element.js';

/**
 * Класс Modal представляет компонент «Модальное окно».
 * Позволяет открывать, закрывать окно, задавать заголовок и содержимое.
 * Поддерживает закрытие по кнопке, клавише Escape, подложке и программно.
 */
export default class Modal {
  /**
   * Создает экземпляр модального окна.
   * Инициализирует DOM-структуру и привязывает обработчик клавиш.
   */
  constructor() {
    this._modal = null;
    this._titleEl = null;
    this._bodyEl = null;
    this._isOpen = false;
    this._keydownHandler = this._onKeyDown.bind(this);
    this._initialize();
  }

  /**
   * Возвращает корневой DOM-элемент модального окна.
   * @returns {HTMLElement|null} Корневой элемент модального окна.
   */
  get elem() {
    return this._modal;
  }

  /**
   * Открывает модальное окно, добавляя его в body и класс is-modal-open.
   * @throws {Error} Если модальное окно уже открыто.
   */
  open() {
    if (this._isOpen) {
      throw new Error('Модальное окно уже открыто');
    }
    if (!this._modal) {
      this._initialize();
    }
    document.body.appendChild(this._modal);
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', this._keydownHandler);
    this._isOpen = true;
    this._modal.querySelector('.modal__close').focus();
  }

  /**
   * Закрывает модальное окно, удаляя его из DOM и класс is-modal-open.
   */
  close() {
    if (!this._isOpen || !this._modal || !this._modal.parentNode) {
      return;
    }
    this._modal.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this._keydownHandler);
    this._isOpen = false;
  }

  /**
   * Устанавливает заголовок модального окна.
   * @param {string} title - Текст заголовка.
   * @throws {Error} Если заголовок не является строкой или модальное окно не инициализировано.
   */
  setTitle(title) {
    if (typeof title !== 'string') {
      throw new Error('Title должнен быть строкой');
    }
    if (!this._titleEl) {
      throw new Error('Модальный элемент заголовка не инициализирован');
    }
    this._titleEl.textContent = this._escapeHtml(title);
  }

  /**
   * Устанавливает содержимое тела модального окна.
   * @param {HTMLElement} node - DOM-элемент для вставки.
   * @throws {Error} Если node не является HTMLElement или модальное окно не инициализировано.
   */
  setBody(node) {
    if (!(node instanceof HTMLElement)) {
      throw new Error('Содержимое тела должно быть элементом HTMLElement');
    }
    if (!this._bodyEl) {
      throw new Error('Элемент модального тела не инициализирован');
    }
    this._bodyEl.innerHTML = '';
    this._bodyEl.appendChild(node);
  }

  /**
   * Инициализирует DOM-структуру и кэширует элементы.
   * @private
   */
  _initialize() {
    this._modal = this._render();
    this._titleEl = this._modal.querySelector('.modal__title');
    this._bodyEl = this._modal.querySelector('.modal__body');
  }

  /**
   * Создает DOM-структуру модального окна с помощью createElement.
   * @returns {HTMLElement} Корневой элемент модального окна.
   * @private
   */
  _render() {
    const modal = createElement(`
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal__overlay" aria-hidden="true"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close" aria-label="Close modal">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title" id="modal-title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);

    modal.querySelector('.modal__close').addEventListener('click', () => this.close());
    modal.querySelector('.modal__overlay').addEventListener('click', () => this.close());

    return modal;
  }

  /**
   * Обрабатывает нажатие клавиши Escape для закрытия окна.
   * @param {KeyboardEvent} event - Событие клавиатуры.
   * @private
   */
  _onKeyDown(event) {
    if (event.code === 'Escape' && this._isOpen) {
      event.preventDefault();
      this.close();
    }
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
