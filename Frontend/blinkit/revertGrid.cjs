const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf8');

// We will overwrite the custom grid block at the end of the file
const revertedGridCss = `
.product-grid, .category-product-grid {
  display: grid !important;
  grid-template-columns: repeat(5, 1fr) !important;
  grid-auto-flow: row !important;
  grid-template-rows: auto !important;
  gap: 16px !important;
  padding-bottom: 12px;
  overflow: visible !important;
}

@media (max-width: 992px) {
  .product-grid, .category-product-grid {
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 12px !important;
  }
}

@media (max-width: 600px) {
  .product-grid, .category-product-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 8px !important;
  }
}

.product-card {
  width: 100% !important;
  height: auto !important;
  aspect-ratio: 1 / 1.15;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.08);
  border-color: #e0e0e0;
}

.product-img-wrapper {
  position: relative;
  width: 100%;
  height: 55%;
  background-color: #f7f9fa;
  border-bottom: none;
}

.product-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wishlist-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #fff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  color: #666;
  border: none;
  cursor: pointer;
}

.veg-indicator {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 12px;
  height: 12px;
  border: 1px solid currentColor;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 2px;
  padding: 2px;
}

.product-info {
  height: 45%;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
`;

// remove all recent slider/grid overrides we made at the bottom
css = css.replace(/\.product-grid, \.category-product-grid \{[\s\S]*?justify-content: space-between;\n\}/g, '');

css += revertedGridCss;

fs.writeFileSync('src/App.css', css);
