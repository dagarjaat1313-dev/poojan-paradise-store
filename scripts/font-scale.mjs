import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const publicDir = path.join(root, 'public');
fs.mkdirSync(publicDir, { recursive: true });

const indexPath = path.join(root, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');
html = html.replace(/\s*<script[^>]*src=["']\/font-scale\.js["'][^>]*><\/script>/gi, '');
fs.writeFileSync(indexPath, html);

try { fs.unlinkSync(path.join(publicDir, 'font-scale.js')); } catch {}
