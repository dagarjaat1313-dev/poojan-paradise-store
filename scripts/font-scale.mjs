import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const publicDir = path.join(root, 'public');
fs.mkdirSync(publicDir, { recursive: true });

const runtime = `(() => {
  const SCALE = 1.5;
  const scaled = new WeakSet();
  const skip = new Set(['HTML','HEAD','BODY','SCRIPT','STYLE','META','LINK','IMG','VIDEO','SVG','PATH']);

  function scaleFonts(root = document) {
    const nodes = root.querySelectorAll ? root.querySelectorAll('*') : [];
    for (const el of nodes) {
      if (skip.has(el.tagName) || scaled.has(el)) continue;
      const cs = getComputedStyle(el);
      const text = el.textContent?.trim();
      if (!text && el.tagName !== 'INPUT' && el.tagName !== 'BUTTON') continue;
      const size = parseFloat(cs.fontSize);
      if (!Number.isFinite(size) || size <= 0) continue;
      el.style.fontSize = (size * SCALE) + 'px';
      scaled.add(el);
    }
  }

  const start = () => {
    scaleFonts();
    const observer = new MutationObserver(mutations => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType === 1) scaleFonts(node);
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();\n`;

fs.writeFileSync(path.join(publicDir, 'font-scale.js'), runtime);

const indexPath = path.join(root, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');
if (!html.includes('/font-scale.js')) {
  html = html.replace('</head>', '  <script src="/font-scale.js"></script>\n</head>');
  fs.writeFileSync(indexPath, html);
}
