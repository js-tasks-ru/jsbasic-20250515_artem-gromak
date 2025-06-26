import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
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
   * Создаёт DOM-элемент карточки товара для отображения в модальном окне.
   * @param {Object} product - объект товара
   * @param {number} count - количество единиц товара
   * @returns {HTMLElement} элемент карточки товара
   */
  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  /**
   * Создаёт и возвращает форму заказа с заполненными значениями и итоговой суммой.
   * @returns {HTMLElement} DOM-элемент формы заказа
   */
  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">
            €${this.getTotalPrice().toFixed(2)}
            </span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  /**
   * Открывает модальное окно с содержимым корзины и формой заказа,
   * а также добавляет обработчики на кнопки изменения количества и отправку формы.
   */
  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");

    this.modalBody = document.createElement("div");
    for (let item of this.cartItems) {
      this.modalBody.append(this.renderProduct(item.product, item.count));
    }
    this.modalBody.append(this.renderOrderForm());

    this.modal.setBody(this.modalBody);
    this.modal.open();

    this.modalBody.addEventListener("click", (event) => {
      let button = event.target.closest(".cart-counter__button");
      if (!button) {
        return;
      }

      let productElem = event.target.closest("[data-product-id]");
      let productId = productElem.dataset.productId;
      let isPlus = button.classList.contains("cart-counter__button_plus");
      let isMinus = button.classList.contains("cart-counter__button_minus");

      if (isPlus) {
        this.updateProductCount(productId, 1);
      } else if (isMinus) {
        this.updateProductCount(productId, -1);
      }
    });

    this.modalBody
      .querySelector(".cart-form")
      .addEventListener("submit", (e) => this.onSubmit(e));
  }

  /**
   * Метод вызывается при каждом изменении корзины.
   * Пока только обновляет иконку корзины.
   * @param {Object} cartItem - Обновлённый объект товара
   */
  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.body.classList.contains("is-modal-open")) {
      return;
    }

    if (this.isEmpty()) {
      this.modal.close();
      return;
    }

    const productId = cartItem.product.id;
    const productElem = this.modalBody.querySelector(
      `[data-product-id="${productId}"]`
    );

    if (productElem) {
      productElem.querySelector(".cart-counter__count").textContent =
        cartItem.count;
      productElem.querySelector(".cart-product__price").textContent = `€${(
        cartItem.count * cartItem.product.price
      ).toFixed(2)}`;
    }

    const infoPrice = this.modalBody.querySelector(`.cart-buttons__info-price`);
    if (infoPrice) {
      infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
    }
  }

  /**
   * Отправляет заказ на сервер, очищает корзину и отображает сообщение об успехе.
   * @param {SubmitEvent} event - событие отправки формы
   */
  async onSubmit(event) {
    event.preventDefault();

    const form = this.modalBody.querySelector(".cart-form");
    const button = form.querySelector('[type="submit"]');
    button.classList.add("is-loading");

    const formData = new FormData(form);

    try {
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        this.modal.setTitle("Success!");
        this.cartItems = [];

        this.modal.setBody(
          createElement(`
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
        `)
        );
      }
    } finally {
      button.classList.remove("is-loading");
    }
  }

  /**
   * Добавляет обработчик клика по иконке корзины для открытия модального окна.
   */
  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
