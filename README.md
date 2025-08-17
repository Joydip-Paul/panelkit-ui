# Panelkit UI

Lightweight, class-based **UI framework for admin dashboards**. Built with SCSS, shipped as plain CSS. Optional tiny JS adds dropdown behavior (open/close, outside-click, submenu toggle, auto-flip near edges).

**Author:** Joydip Paul · [GitHub](https://github.com/joydip-paul)

---

## ✨ Features
- Clean, predictable classes (`pk-btn`, `pk-dropdown`, utilities)
- Admin-first primitives: buttons, cards, dropdown
- **No required JS** — CSS works alone; JS is optional
- Works with **Angular, React, Vite/Vanilla, Next.js**
- Includes **minified** build

---

## 📦 Install
```bash
npm i panelkit-ui
# or
yarn add panelkit-ui
# or
pnpm add panelkit-ui

## How to Use

# In plain HTML
# <link rel="stylesheet" href="./node_modules/panelkit-ui/dist/main.css" />
# <script src="./node_modules/panelkit-ui/dist/panelkit.js"></script> <!-- optional -->
 
#  In angular.json 
# {
#   "styles": [
#     "node_modules/panelkit-ui/dist/main.css",
#     "src/styles.scss"
#   ],
#   "scripts": [
#     "node_modules/panelkit-ui/dist/panelkit.js" // optional (dropdown auto-init)
#   ]
# }
