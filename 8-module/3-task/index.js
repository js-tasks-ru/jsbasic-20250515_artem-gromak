/**
 * Класс Cart представляет компонент «Корзина».
 * Управляет добавлением, удалением и подсчетом товаров, обновляет CartIcon.
 */
export default class Cart {
  cartItems = [];

  /**
   * @param {CartIcon} cartIcon - экземпляр иконки корзины для обновления отображения
   */
  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  /**
   * Добавляет товар в корзину.
   * @param {Object|null} product - Объект товара
   */
  addProduct(product) {
    if (!product) {
      return;
    }

    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.count++;
      this.onProductUpdate(existingItem);
    } else {
      const cartItem = {
        product,
        count: 1,
      };
      this.cartItems.push(cartItem);
      this.onProductUpdate(cartItem);
    }
  }

  /**
   * Обновляет количество товара в корзине.
   * @param {string} productId - ID товара
   * @param {number} amount - Изменение количества (+1 или -1)
   */
  updateProductCount(productId, amount) {
    const index = this.cartItems.findIndex(
      (item) => item.product.id === productId
    );
    if (index === -1) {
      return;
    }

    const cartItem = this.cartItems[index];
    cartItem.count += amount;

    if (cartItem.count <= 0) {
      this.cartItems.splice(index, 1);
    }

    this.onProductUpdate(cartItem);
  }

  /**
   * Проверяет, пуста ли корзина.
   * @returns {boolean} true если корзина пуста
   */
  isEmpty() {
    return this.cartItems.length === 0;
  }

  /**
   * Возвращает общее количество всех товаров в корзине.
   * @returns {number}
   */
  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  /**
   * Возвращает общую стоимость всех товаров в корзине.
   * @returns {number}
   */
  getTotalPrice() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.count,
      0
    );
  }

  /**
   * Метод вызывается при каждом изменении корзины.
   * Пока только обновляет иконку корзины.
   * @param {Object} cartItem - Обновлённый объект товара
   */
  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
  }
}
