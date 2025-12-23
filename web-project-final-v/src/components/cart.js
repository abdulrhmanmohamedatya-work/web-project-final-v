function createCart() {
  return `
    <aside class="cartSidebar" id="cartSidebar">
      <div class="cartHeader">
        <h3>Shopping Cart</h3>
        <button class="cartCloseBtn" id="cartClose">×</button>
      </div>
      <div class="cartContent">
        <div class="cartItems" id="cartItems">
          <div class="emptyCart">
            <p>Your cart is empty</p>
            <span class="emptyCartIcon">🛒</span>
          </div>
        </div>
        <div class="cartFooter" id="cartFooter" style="display: none;">
          <div class="cartTotal">
            <div class="totalRow">
              <span>Subtotal:</span>
              <span id="cartSubtotal">$0.00</span>
            </div>
            <div class="totalRow totalFinal">
              <span>Total:</span>
              <span id="cartTotal">$0.00</span>
            </div>
          </div>
          <div class="cartActions">
            <button class="clearCartBtn" id="clearCart">Clear Cart</button>
            <button class="checkoutBtn" id="checkout">Checkout</button>
          </div>
        </div>
      </div>
    </aside>
    <div class="cartOverlay" id="cartOverlay"></div>
  `
}

function renderCartItem(item) {
  return `
    <div class="cartItem" data-id="${item.id}">
      <div class="cartItemImage">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="cartItemInfo">
        <h4 class="cartItemTitle">${item.title}</h4>
        <p class="cartItemPrice">$${item.price}</p>
        <div class="quantityControls">
          <button class="quantityBtn decrease" data-id="${item.id}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantityBtn increase" data-id="${item.id}">+</button>
        </div>
      </div>
      <div class="cartItemActions">
        <span class="itemTotal">$${(item.price * item.quantity).toFixed(2)}</span>
        <button class="removeItemBtn" data-id="${item.id}">🗑️</button>
      </div>
    </div>
  `
}