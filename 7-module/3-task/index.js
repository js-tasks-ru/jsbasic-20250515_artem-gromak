import createElement from '../../assets/lib/create-element.js';

/**
 * Класс StepSlider представляет компонент «Пошаговый слайдер».
 * Позволяет выбирать значение из заданного диапазона шагов.
 */
export default class StepSlider {
  /**
   * Создает экземпляр слайдера.
   * @param {Object} config - Конфигурация слайдера.
   * @param {number} config.steps - Количество шагов (больше 1).
   * @param {number} [config.value=0] - Начальное значение (шаг).
   * @throws {Error} Если конфигурация некорректна.
   */
  constructor({ steps, value = 0 }) {
    this._validateConfig(steps, value);
    this._steps = steps;
    this._value = Math.max(0, Math.min(Math.floor(value), steps - 1));
    this._elem = this._render();
    this._initEventListeners();
    this._updateSlider();
  }

  /**
   * Возвращает корневой DOM-элемент слайдера.
   * @returns {HTMLElement} Корневой элемент слайдера.
   */
  get elem() {
    return this._elem;
  }

  /**
   * Возвращает текущее значение слайдера.
   * @returns {number} Текущий шаг (0 до steps-1).
   */
  get value() {
    return this._value;
  }

  /**
   * Проверяет корректность конфигурации.
   * @param {number} steps - Количество шагов.
   * @param {number} value - Начальное значение.
   * @throws {Error} Если steps < 2 или value некорректно.
   * @private
   */
  _validateConfig(steps, value) {
    if (!Number.isInteger(steps) || steps < 2) {
      throw new Error('Steps должны быть целым числом больше 1');
    }
    if (!Number.isFinite(value) || value < 0) {
      throw new Error('Значение должно быть неотрицательным числом');
    }
  }

  /**
   * Создает DOM-структуру слайдера.
   * @returns {HTMLElement} Корневой элемент слайдера.
   * @private
   */
  _render() {
    return createElement(`
      <div class="slider" role="slider" aria-valuemin="0" aria-valuemax="${this._steps - 1}" aria-valuenow="${this._value}" tabindex="0">
        <div class="slider__thumb" aria-label="Slider thumb">
          <span class="slider__value">${this._value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${Array.from({ length: this._steps }, (_, index) => `
            <span class="${index === this._value ? 'slider__step-active' : ''}"></span>
          `).join('')}
        </div>
      </div>
    `);
  }

  /**
   * Инициализирует обработчики событий для слайдера.
   * @private
   */
  _initEventListeners() {
    this._elem.addEventListener('click', (event) => this._handleClick(event));
    this._elem.addEventListener('keydown', (event) => this._handleKeyDown(event));
  }

  /**
   * Обрабатывает клик по слайдеру для изменения значения.
   * @param {MouseEvent} event - Событие клика.
   * @private
   */
  _handleClick(event) {
    if (event.target.closest('.slider__thumb')) {
      return;
    }

    const rect = this._elem.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const segmentCount = this._steps - 1;
    const clickPercent = clickX / width;
    const newValue = Math.round(clickPercent * segmentCount);

    this._setValue(newValue);
  }

  /**
   * Обрабатывает нажатие клавиш для изменения значения.
   * @param {KeyboardEvent} event - Событие клавиатуры.
   * @private
   */
  _handleKeyDown(event) {
    const keyActions = {
      ArrowLeft: () => this._setValue(this._value - 1),
      ArrowRight: () => this._setValue(this._value + 1),
      Home: () => this._setValue(0),
      End: () => this._setValue(this._steps - 1),
    };

    if (keyActions[event.code]) {
      event.preventDefault();
      keyActions[event.code]();
    }
  }

  /**
   * Устанавливает новое значение слайдера и обновляет UI.
   * @param {number} newValue - Новое значение (шаг).
   * @private
   */
  _setValue(newValue) {
    const clampedValue = Math.max(0, Math.min(newValue, this._steps - 1));
    if (clampedValue === this._value) {
      return;
    }

    this._value = clampedValue;
    this._updateSlider();

    const customEvent = new CustomEvent('slider-change', {
      detail: this._value,
      bubbles: true,
    });
    this._elem.dispatchEvent(customEvent);
  }

  /**
   * Обновляет визуальное состояние слайдера.
   * @private
   */
  _updateSlider() {
    const thumb = this._elem.querySelector('.slider__thumb');
    const progress = this._elem.querySelector('.slider__progress');
    const valueEl = this._elem.querySelector('.slider__value');
    const stepsEl = this._elem.querySelector('.slider__steps');
    const stepSpans = stepsEl.querySelectorAll('span');

    valueEl.textContent = this._value;

    stepSpans.forEach((span, index) => {
      span.classList.toggle('slider__step-active', index === this._value);
    });

    const leftPercent = (this._value / (this._steps - 1)) * 100;
    thumb.style.left = `${leftPercent}%`;
    progress.style.width = `${leftPercent}%`;

    this._elem.setAttribute('aria-valuenow', this._value);
  }
}
