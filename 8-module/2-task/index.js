import createElement from "../../assets/lib/create-element.js";
import ProductCard from '../../6-module/2-task/index.js';

/**
 * Класс ProductGrid представляет компонент «Список товаров».
 * Позволяет отображать карточки товаров и применять к ним фильтрацию.
 */
export default class ProductGrid {
  /**
   * Создает экземпляр списка товаров.
   * @param {Array<Object>} products - Массив объектов товаров.
   */
  constructor(products) {
    this._products = products;
    this._filters = {};
    this._grid = null;
    this._inner = null;
    this._initialize();
    this.updateFilter({});
  }

  /**
   * Возвращает корневой DOM-элемент компонента.
   * @returns {HTMLElement|null} Корневой элемент списка товаров.
   */
  get elem() {
    return this._grid;
  }

  /**
   * Обновляет фильтры и отображает товары, соответствующие условиям.
   * @param {Object} filters - Объект с фильтрами.
   */
  updateFilter(filters) {
    Object.assign(this._filters, filters);
    this._inner.innerHTML = "";

    const filtered = this._products.filter((product) => {
      if (this._filters.noNuts && product.nuts) {
        return false;
      }
      if (this._filters.vegeterianOnly && !product.vegeterian) {
        return false;
      }
      if (
        this._filters.maxSpiciness !== undefined &&
        product.spiciness !== undefined &&
        product.spiciness > this._filters.maxSpiciness
      ) {
        return false;
      }
      if (
        this._filters.category &&
        product.category !== this._filters.category
      ) {
        return false;
      }
      return true;
    });

    for (const product of filtered) {
      const card = new ProductCard(product);
      this._inner.appendChild(card.elem);
    }
  }

  /**
   * Инициализирует DOM-структуру компонента и кэширует элементы.
   * @private
   */
  _initialize() {
    this._grid = this._render();
    this._inner = this._grid.querySelector(".products-grid__inner");
  }

  /**
   * Создает DOM-структуру списка товаров.
   * @returns {HTMLElement} Корневой элемент компонента.
   * @private
   */
  _render() {
    return createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);
  }
}
