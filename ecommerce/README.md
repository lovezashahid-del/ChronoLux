# ChronoLux — Watch Ecommerce Website

A premium watch ecommerce site with separate Men's and Women's collections, full shopping flow from login to checkout.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Landing page with hero, category cards, featured products |
| Login / Register | `login.html` | User authentication with tabbed login & registration |
| Men's Watches | `men.html` | Men's collection (sets men's browsing session) |
| Women's Watches | `women.html` | Women's collection (sets women's browsing session) |
| Product Detail | `product.html` | Individual watch with quantity selector & add to cart |
| Shopping Cart | `cart.html` | Cart management with quantity controls (requires login) |
| Checkout | `checkout.html` | Shipping & payment form with order confirmation |

## Demo Account

- **Email:** demo@chrono.com
- **Password:** demo123

## How to Run

No build tools required. Open `index.html` in your browser, or serve locally:

```bash
# Python
python -m http.server 8080

# Node (if installed)
npx serve .
```

Then visit `http://localhost:8080`

## Features

- Separate browsing sessions for Men's and Women's collections
- Login required to add items to cart
- Persistent cart and auth via localStorage
- 12 watches (6 men's, 6 women's) with images, ratings, and descriptions
- Responsive dark luxury theme
- Free shipping on orders over $200

## Project Structure

```
ecommerce/
├── index.html          # Home page
├── login.html          # Login & register
├── men.html            # Men's watches
├── women.html          # Women's watches
├── product.html        # Product detail
├── cart.html           # Shopping cart
├── checkout.html       # Checkout
├── css/
│   └── styles.css      # All styles
└── js/
    ├── products.js     # Product catalog
    ├── auth.js         # Authentication & sessions
    ├── cart.js         # Cart management
    └── app.js          # Shared UI helpers
```
