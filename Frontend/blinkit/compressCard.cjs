const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf8');

// We will selectively replace the classes we introduced in newCardDesign.cjs

css = css.replace(/\.product-img-wrapper\s*\{[\s\S]*?\}/, `.product-img-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1.4 / 1;
  background-color: #f9f9f9;
}`);

css = css.replace(/\.product-info\s*\{[\s\S]*?\}/, `.product-info {
  flex: 1;
  padding: 8px;
  display: flex;
  flex-direction: column;
}`);

css = css.replace(/\.delivery-tag\s*\{[\s\S]*?\}/, `.delivery-tag {
  display: flex;
  align-items: center;
  gap: 3px;
  background-color: #e6f4ea;
  color: #0f9d58;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  width: fit-content;
  margin-bottom: 4px;
}`);

css = css.replace(/\.product-title\s*\{[\s\S]*?\}/, `.product-title {
  font-size: 14px;
  font-weight: 700;
  color: #111;
  margin: 0 0 2px 0;
  line-height: 1.1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}`);

css = css.replace(/\.product-subtitle\s*\{[\s\S]*?\}/, `.product-subtitle {
  font-size: 10px;
  color: #666;
  margin-bottom: 4px;
}`);

css = css.replace(/\.card-divider\s*\{[\s\S]*?\}/, `.card-divider {
  height: 1px;
  background-color: #f0f0f0;
  margin: 4px 0;
}`);

css = css.replace(/\.price-rating-row\s*\{[\s\S]*?\}/, `.price-rating-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 6px;
}`);

css = css.replace(/\.product-price\s*\{[\s\S]*?\}/, `.product-price {
  font-size: 16px;
  font-weight: 800;
  color: #111;
  line-height: 1;
}`);

css = css.replace(/\.price-unit\s*\{[\s\S]*?\}/, `.price-unit {
  font-size: 9px;
  color: #666;
  margin-top: 1px;
}`);

css = css.replace(/\.rating-label\s*\{[\s\S]*?\}/, `.rating-label {
  font-size: 9px;
  color: #888;
  margin-bottom: 1px;
}`);

css = css.replace(/\.rating-value \.score\s*\{[\s\S]*?\}/, `.rating-value .score {
  font-size: 12px;
  font-weight: 700;
  color: #111;
}`);

css = css.replace(/\.add-btn\.full-width\s*\{[\s\S]*?\}/, `.add-btn.full-width {
  width: 100%;
  background-color: #0f9d58;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px;
  font-weight: 700;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  cursor: pointer;
}`);

fs.writeFileSync('src/App.css', css);
