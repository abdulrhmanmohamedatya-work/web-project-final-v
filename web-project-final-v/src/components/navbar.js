function createNavbar() {
  return `
    <nav class="navbar">
      <div class="navContainer">
        <div class="navBrand">
          <img src="./src/img/clothes-rack.png" alt="ShopHub" class="navLogo">
          <h1>ShopHub</h1>
        </div>
        <div class="navActions">
          <button class="cartToggleBtn" id="cartToggle">
            <span class="cartIcon">🛒</span>
            <span class="cartCount" id="cartCount">0</span>
          </button>
        </div>
      </div>
    </nav>
  `
}