const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf8');

const regexToReplace = /\.product-card \{[\s\S]*?\}\s*\.product-card:hover \{[\s\S]*?\}\s*\.product-img-wrapper \{[\s\S]*?\}\s*\.product-img \{[\s\S]*?\}\s*\.wishlist-btn \{[\s\S]*?\}\s*\.veg-indicator \{[\s\S]*?\}\s*\.product-info \{[\s\S]*?\}/;

const newCardCss = `
.product-card {
  width: 100% !important;
  height: 100% !important;
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
  aspect-ratio: 1 / 1;
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
  top: 10px;
  right: 10px;
  background: #fff;
  border-radius: 50%;
  width: 28px;
  height: 28px;
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
  top: 10px;
  left: 10px;
  width: 14px;
  height: 14px;
  border: 1px solid currentColor;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 2px;
  padding: 2px;
}

.product-info {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Ensure the title doesn't overflow wildly */
.product-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
}
`;

css = css.replace(regexToReplace, newCardCss);

fs.writeFileSync('src/App.css', css);
