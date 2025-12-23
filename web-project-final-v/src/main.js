const cartManager = new CartManager()

function buildHomePage() {
  const app = document.getElementById('app')
  if (!app) {
    console.error('App element not found. Make sure #app exists in the DOM.')
    return
  }

  try {
    console.log('Building home page...')

    // Call global functions (assumed to be loaded)
    const navbar = createNavbar()
    const productGrid = createProductGrid()
    const cart = createCart()

    app.innerHTML = `
        <div class="appContainer">
          ${navbar}
          <main class="mainContent">
            <div class="contentWrapper">
              ${productGrid}
              ${cart}
            </div>
          </main>
        </div>
      `

    cartManager.init()
    console.log('Home page built successfully')
  } catch (error) {
    console.error('Error building home page:', error)
    console.error('Error stack:', error.stack)
  }
}

buildHomePage()
