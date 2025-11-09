# ArtLebedev Test App

Компонент автоформы на Vue 3, который строит форму на основе переданной JSON-схемы (FormGenerator.vue).
Конкретно, парсим переданный Json и передаем в компонент, который строит форму с соответствующими инпутами.
Можно поиграться с Json'ом, посмотреть как отрабатываются возможные ошибки

## Тут деплой

https://sticktoyourguns.github.io/test-lebedev-app/

## Технологии

- Vue 3 + Composition API
- Vite
- SCSS

## Структура проекта

```
src/
├── assets/          # Статические ресурсы
│   └── styles/      # SCSS стили
├── components/      # Vue компоненты
├── composables/     # Сервисы
```

## Установка и запуск

```bash
git clone https://github.com/StickToYourGuns/test-lebedev-app.git
cd test-lebedev-app
npm install
npm run dev
```