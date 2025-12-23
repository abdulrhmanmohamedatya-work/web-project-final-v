class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('shopHub_cart')) || []
        this.isCartOpen = false
    }

    init() {
        this.bindEvents()
        this.updateCartUI()
        this.initializeFilters()
    }

    bindEvents() {
        // Cart toggle
        document.getElementById('cartToggle').addEventListener('click', () => this.toggleCart())
        document.getElementById('cartClose').addEventListener('click', () => this.closeCart())
        document.getElementById('cartOverlay').addEventListener('click', () => this.closeCart())

        // Add to cart buttons
        document.addEventListener('click', (e) => {
            // Find the button element (could be clicked directly or on a child element)
            const button = e.target.closest('button[data-id]')
            if (button && button.textContent.trim().includes('Add to Cart')) {
                const productId = parseInt(button.dataset.id)
                this.addToCart(productId)
            }
        })

        // Cart item controls
        document.addEventListener('click', (e) => {
            // Handle quantity increase/decrease buttons
            const button = e.target.closest('button[data-id]')
            if (!button) return

            const productId = parseInt(button.dataset.id)

            if (button.classList.contains('increase') || button.textContent.trim() === '+') {
                this.updateQuantity(productId, 1)
            } else if (button.classList.contains('decrease') || button.textContent.trim() === '-') {
                this.updateQuantity(productId, -1)
            } else if (button.textContent.includes('🗑️') || button.classList.contains('removeItemBtn')) {
                this.removeFromCart(productId)
            }
        })

        // Cart actions
        document.getElementById('clearCart').addEventListener('click', () => this.clearCart())
        document.getElementById('checkout').addEventListener('click', () => this.checkout())
    }

    initializeFilters() {
        const categoryFilter = document.getElementById('categoryFilter')
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.filterProducts(e.target.value)
            })
        }
    }

    // CRUD Operations
    addToCart(productId) {
        const productData = product.find(p => p.id === productId)
        if (!productData) return

        const existingItem = this.cart.find(item => item.id === productId)

        if (existingItem) {
            existingItem.quantity += 1
        } else {
            this.cart.push({
                ...productData,
                quantity: 1
            })
        }

        this.saveCart()
        this.updateCartUI()
        this.showAddedToCartFeedback(productId)
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId)
        if (!item) return

        item.quantity += change

        if (item.quantity <= 0) {
            this.removeFromCart(productId)
        } else {
            this.saveCart()
            this.updateCartUI()
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId)
        this.saveCart()
        this.updateCartUI()
    }

    clearCart() {
        if (this.cart.length === 0) return

        if (confirm('Are you sure you want to clear your cart?')) {
            this.cart = []
            this.saveCart()
            this.updateCartUI()
        }
    }

    // UI Updates
    updateCartUI() {
        this.updateCartCount()
        this.renderCartItems()
        this.updateCartTotal()
    }

    updateCartCount() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0)
        const cartCountElement = document.getElementById('cartCount')
        if (cartCountElement) {
            cartCountElement.textContent = totalItems
        }
    }

    renderCartItems() {
        const cartItemsContainer = document.getElementById('cartItems')
        const cartFooter = document.getElementById('cartFooter')

        if (!cartItemsContainer || !cartFooter) return;

        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = `
        <div class="empty-cart">
          <p>Your cart is empty</p>
          <span class="empty-cart-icon">🛒</span>
        </div>
      `
            cartFooter.style.display = 'none'
        } else {
            cartItemsContainer.innerHTML = this.cart.map(item => renderCartItem(item)).join('')
            cartFooter.style.display = 'block'
        }
    }

    updateCartTotal() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        const subtotalEl = document.getElementById('cartSubtotal')
        const totalEl = document.getElementById('cartTotal')
        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`
        if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`
    }

    // Cart visibility
    toggleCart() {
        if (this.isCartOpen) {
            this.closeCart()
        } else {
            this.openCart()
        }
    }

    openCart() {
        const cartSidebar = document.getElementById('cartSidebar')
        const cartOverlay = document.getElementById('cartOverlay')

        if (cartSidebar && cartOverlay) {
            cartSidebar.setAttribute('data-open', 'true')
            cartOverlay.setAttribute('data-active', 'true')
            document.body.style.overflow = 'hidden'
            this.isCartOpen = true
        } else {
            console.error('Cart elements not found:', { cartSidebar, cartOverlay })
        }
    }

    closeCart() {
        const cartSidebar = document.getElementById('cartSidebar')
        const cartOverlay = document.getElementById('cartOverlay')

        if (cartSidebar && cartOverlay) {
            cartSidebar.removeAttribute('data-open')
            cartOverlay.removeAttribute('data-active')
            document.body.style.overflow = 'auto'
            this.isCartOpen = false
        }
    }

    // Product filtering
    filterProducts(category) {
        const filteredProducts = category === 'all' ? product : product.filter(p => p.category === category)
        const grid = document.getElementById('productsGrid')
        if (grid) grid.innerHTML = renderProducts(filteredProducts)
    }

    // Feedback
    showAddedToCartFeedback(productId) {
        // Find the button with this product ID that contains "Add to Cart"
        const buttons = document.querySelectorAll(`button[data-id="${productId}"]`)
        const button = Array.from(buttons).find(btn => btn.textContent.trim().includes('Add to Cart'))

        if (!button) return

        const originalText = button.textContent

        button.textContent = 'Added!'
        button.style.backgroundColor = '#4CAF50'

        setTimeout(() => {
            button.textContent = originalText
            button.style.backgroundColor = ''
        }, 1000)
    }

    // Checkout
    checkout() {
        if (this.cart.length === 0) return

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        alert(`Checkout - Total: $${total.toFixed(2)}\n\nThank you for your purchase!`)

        this.clearCart()
        this.closeCart()
    }

    // Persistence
    saveCart() {
        localStorage.setItem('shopHub_cart', JSON.stringify(this.cart))
    }
}