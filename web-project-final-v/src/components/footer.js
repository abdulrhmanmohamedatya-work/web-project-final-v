import styles from './footer.module.css'

export function createFooter() {
    return `
    <footer class="${styles.footer}">
      <div class="${styles.footerContent}">
        <p>&copy; 2024 <span class="${styles.footerBrand}">ShopHub</span>. All rights reserved.</p>
      </div>
    </footer>
  `
}