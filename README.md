```markdown
# Fake store

Проект, який демонструє роботу з React, TypeScript, TailwindCSS, MUI та Context API для створення інтерфейсу інтернет-магазину.

## Технології

- React
- TypeScript
- TailwindCSS
- MUI (Material UI)
- Context API
- Axios

## Опис

Цей проект є частиною інтернет-магазину, де користувачі можуть переглядати продукти, додавати їх до кошика і переглядати деталі товарів.

## Встановлення та налаштування

### Крок 1: Клонування репозиторію

Спочатку клонувати репозиторій на ваш локальний комп'ютер:

```bash
git clone https://github.com/danikua/fozzy
cd fake-store
```

### Крок 2: Встановлення залежностей

Встановіть всі необхідні залежності за допомогою npm або yarn:

```bash
npm install
# або
yarn install
```

### Крок 3: Налаштування TailwindCSS

1. Встановіть TailwindCSS та його залежності:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```

2. Додайте файли конфігурації Tailwind в `tailwind.config.js`:

   ```javascript
   module.exports = {
     content: [
       './src/**/*.{html,js,jsx,ts,tsx}', // шлях до вашого коду
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

3. Налаштуйте файл CSS для використання Tailwind:

   В `src/index.css` (або відповідний файл CSS):

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

### Крок 4: Налаштування MUI (Material UI)

1. Встановіть MUI та його залежності:

   ```bash
   npm install @mui/material @emotion/react @emotion/styled
   ```

2. У компоненті, який потребує стилів MUI, імпортуйте компоненти, такі як `Card`, `Typography`, `Button` і інші.

### Крок 5: Запуск проекту

Для запуску проекту використовуйте наступну команду:

```bash
npm run dev
# або
yarn start
```

Це запустить проект на `http://localhost:3000`.

## Структура проекту

- `src/` — основна папка з компонентами та логікою:
  - `api/` — функціїдля запиту на сервер.
  - `components/` — компоненти UI.
  - `context/` — контексти для управління станом (наприклад, кошик).
  - `types/` — типи для TypeScript.
  - `App.tsx` — головний компонент.
  - `index.tsx` — точка входу в додаток.

## Для розробників

- Для перевірки коду на помилки та стиль використовуйте ESLint.
- Код стиль: дотримуйтесь стандарту TypeScript та React.

## Ліцензія

Цей проект ліцензується під MIT License - дивіться файл [LICENSE](LICENSE) для деталей.
```
