const CART_KEY = 'chrono_cart';

const Cart = {
  getItems() {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveItems(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    this.updateBadge();
  },

  addItem(productId, quantity = 1) {
    const items = this.getItems();
    const existing = items.find((i) => i.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({ productId, quantity });
    }
    this.saveItems(items);
  },

  removeItem(productId) {
    const items = this.getItems().filter((i) => i.productId !== productId);
    this.saveItems(items);
  },

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const items = this.getItems();
    const item = items.find((i) => i.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.saveItems(items);
    }
  },

  clear() {
    localStorage.removeItem(CART_KEY);
    this.updateBadge();
  },

  getCount() {
    return this.getItems().reduce((sum, i) => sum + i.quantity, 0);
  },

  getTotal() {
    return this.getItems().reduce((sum, item) => {
      const product = getProductById(item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  },

  updateBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = this.getCount();
    badges.forEach((badge) => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  },
};

document.addEventListener('DOMContentLoaded', () => Cart.updateBadge());
