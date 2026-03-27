// build.js — compiles src/app.jsx into index.html
const fs = require('fs');
const babel = require('@babel/core');

const template = fs.readFileSync('src/index.template.html', 'utf8');
const jsxCode = fs.readFileSync('src/app.jsx', 'utf8');

const result = babel.transformSync(jsxCode, {
  presets: [
    ['@babel/preset-env', { targets: '>0.5%, not dead', modules: false }],
    '@babel/preset-react'
  ],
  filename: 'app.jsx',
});

const html = template.replace('<!-- BUILD_OUTPUT -->', result.code);
fs.writeFileSync('index.html', html);
console.log('Built index.html (' + html.length + ' bytes)');
