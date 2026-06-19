function renderProductCard(product) {
  return `
    <article class="product-card" data-id="${product.id}">
      <a href="product.html?id=${product.id}" class="product-card-link">
        <div class="product-image-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <span class="product-category-tag">${product.category === 'men' ? "Men's" : "Women's"}</span>
        </div>
        <div class="product-info">
          <span class="product-brand">${product.brand}</span>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-meta">
            <span class="product-rating">${renderStars(product.rating)} ${product.rating}</span>
            <span class="product-price">${formatPrice(product.price)}</span>
          </div>
        </div>
      </a>
      <button class="btn btn-sm btn-primary add-to-cart-btn" data-id="${product.id}">
        Add to Cart
      </button>
    </article>
  `;
}

function renderProductGrid(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = products.map(renderProductCard).join('');
  attachAddToCartListeners(container);
}

function attachAddToCartListeners(container) {
  container.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!Auth.isLoggedIn()) {
        window.location.href = 'login.html';
        return;
      }
      Cart.addItem(btn.dataset.id);
      btn.textContent = 'Added ✓';
      btn.classList.add('added');
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.classList.remove('added');
      }, 1500);
    });
  });
}

function initNavbar() {
  const user = Auth.getUser();
  const authLinks = document.getElementById('auth-links');
  if (authLinks) {
    if (user) {
      authLinks.innerHTML = `
        <span class="nav-user">Hi, ${user.name.split(' ')[0]}</span>
        <button class="btn btn-ghost btn-sm" id="logout-btn">Logout</button>
      `;
      document.getElementById('logout-btn')?.addEventListener('click', () => Auth.logout());
    } else {
      authLinks.innerHTML = `<a href="login.html" class="btn btn-ghost btn-sm">Login</a>`;
    }
  }

  const session = Auth.getSession();
  document.querySelectorAll('.nav-link[data-category]').forEach((link) => {
    if (session.category === link.dataset.category) {
      link.classList.add('active');
    }
  });

  Cart.updateBadge();
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

document.addEventListener('DOMContentLoaded', initNavbar);
