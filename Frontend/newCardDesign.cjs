const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf8');

// Strip out existing .product-card styles to start fresh
const regexToReplace = /\.product-card \{[\s\S]*?(?=\/\* Category Card Clickable Enhancements \*\/|\/\* category)/i;
// Just replace any `.product-card` declarations and related children until a known safe spot or just remove them selectively.
// Since we appended previously, we might have multiple definitions. Let's just strip everything matching .product-card and children.
css = css.replace(/\.product-card\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.product-img-wrapper\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.product-img\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.wishlist-btn\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.veg-indicator\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.product-info\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.delivery-tag\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.product-title\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.product-subtitle\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.card-divider\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.price-rating-row\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.price-section\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.product-price\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.price-unit\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.rating-section\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.rating-label\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.rating-value\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.product-footer\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.add-btn\.full-width\b[^\{]*\{[\s\S]*?\}/g, '');
css = css.replace(/\.add-btn\b[^\{]*\{[\s\S]*?\}/g, '');

const newCardCss = `
.product-card {
  width: 100% !important;
  height: 100% !important;
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  border-color: #d0d0d0;
}

.product-img-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1.2 / 1;
  background-color: #f9f9f9;
}

.product-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px 16px 0 0;
}

.wishlist-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #fff;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  color: #555;
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
.veg-indicator.veg { color: #0f9d58; }
.veg-indicator.non-veg { color: #d11243; }

.product-info {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
}

.delivery-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #e6f4ea;
  color: #0f9d58;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  width: fit-content;
  margin-bottom: 6px;
}

.product-title {
  font-size: 16px;
  font-weight: 700;
  color: #111;
  margin: 0 0 2px 0;
  line-height: 1.2;
}

.product-subtitle {
  font-size: 11px;
  color: #666;
  margin-bottom: 8px;
}

.card-divider {
  height: 1px;
  background-color: #f0f0f0;
  margin: 6px 0;
}

.price-rating-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
}

.price-section {
  display: flex;
  flex-direction: column;
}

.product-price {
  font-size: 20px;
  font-weight: 800;
  color: #111;
  line-height: 1;
}

.price-unit {
  font-size: 11px;
  color: #666;
  margin-top: 2px;
}

.rating-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.rating-label {
  font-size: 10px;
  color: #888;
  margin-bottom: 2px;
}

.rating-value {
  display: flex;
  align-items: center;
  gap: 4px;
}

.rating-value .score {
  font-size: 14px;
  font-weight: 700;
  color: #111;
}

.product-footer {
  margin-top: auto;
}

.add-btn.full-width {
  width: 100%;
  background-color: #0f9d58;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  cursor: pointer;
}

.add-btn.full-width:hover {
  background-color: #0d8a4d;
}
`;

css += newCardCss;

fs.writeFileSync('src/App.css', css);
