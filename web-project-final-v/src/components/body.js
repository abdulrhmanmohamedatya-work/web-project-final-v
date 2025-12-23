function createProductGrid() {
  return `
    <section class="productsSection">
      <div class="sectionHeader">
        <h2>Featured Products</h2>
        <div class="filters">
          <select id="categoryFilter" class="filterSelect">
            <option value="all">All Categories</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelry</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
      </div>
      <div class="productsGrid" id="productsGrid">
        ${renderProducts(product)}
      </div>
    </section>
  `
}

function renderProducts(products) {
  return products.map(item => `
    <div class="productCard" data-id="${item.id}">
      <div class="productImage">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
      </div>
      <div class="productInfo">
        <h3 class="productTitle">${item.title}</h3>
        <p class="productCategory">${item.category}</p>
        <div class="productRating">
          <span class="stars">${'★'.repeat(Math.floor(item.rating.rate))}${'☆'.repeat(5 - Math.floor(item.rating.rate))}</span>
          <span class="ratingCount">(${item.rating.count})</span>
        </div>
        <div class="productFooter">
          <span class="productPrice">$${item.price}</span>
          <button class="addToCartBtn" data-id="${item.id}">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('')
}