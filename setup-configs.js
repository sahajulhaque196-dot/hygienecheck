const fs = require('fs');

const postcssContent = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
fs.writeFileSync('postcss.config.js', postcssContent, 'utf8');

const tailwindContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        hygiene: {
          5: '#10B981',
          4: '#34D399',
          3: '#F59E0B',
          2: '#F97316',
          1: '#EF4444',
          0: '#DC2626',
        },
        brand: {
          dark: '#0B0F17',
          card: '#111827',
          emerald: '#10B981',
          accent: '#059669',
          border: '#1F2937',
        }
      }
    },
  },
  plugins: [],
};
`;
fs.writeFileSync('tailwind.config.js', tailwindContent, 'utf8');

if (fs.existsSync('postcss.config.mjs')) fs.unlinkSync('postcss.config.mjs');
if (fs.existsSync('tailwind.config.ts')) fs.unlinkSync('tailwind.config.ts');
console.log('CONFIGS_UPDATED_SUCCESS');
