const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf8');

css = css.replace(/\.category-img-wrapper\s*\{[\s\S]*?\}/, `.category-img-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #fff;
  padding: 0;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
}`);

css = css.replace(/\.category-img\s*\{[\s\S]*?\}/, `.category-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}`);

// Also round out the category cards on mobile media queries just in case
css = css.replace(/\.category-card \{\s*border-radius: 8px;/g, '.category-card { border-radius: 16px;');

fs.writeFileSync('src/App.css', css);
