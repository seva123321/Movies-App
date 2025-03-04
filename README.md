# Movie-DB — приложение для поиска фильмов!

[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/-JavaScript-464646?style=flat-square&logo=JavaScript)](https://www.javascript.com/)
[![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)](https://ant.design/)
[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

## Описание

**Movie-DB** — это удобное приложение для поиска фильмов, которое позволяет пользователям находить актуальные мировые киноленты, оценивать их и сохранять свои рейтинги. Приложение использует API от [The Movie Database (TMDB)](https://developer.themoviedb.org), что обеспечивает доступ к огромной базе данных фильмов.

## Основные функции

- **Поиск фильмов:** Найдите фильмы по названию, жанру или другим параметрам.
- **Оценка фильмов:** Поставьте рейтинг понравившимся фильмам.
- **Гостевая сессия:** Ваши оценки сохраняются на время сессии, даже без регистрации.
- **Пагинация:** Удобная постраничная навигация для просмотра большого количества фильмов.
- **Синхронизация рейтингов:** Рейтинги, выставленные на страницах поиска и оценки, синхронизируются.

## Стек технологий

- **JavaScript** — основной язык программирования.
- **React** — библиотека для создания пользовательского интерфейса.
- **Ant Design** — UI-библиотека для создания современного и отзывчивого дизайна.
- **Vercel** — платформа для деплоя и хостинга приложения.

## Как это работает

1. **Гостевая сессия:** При первом посещении сайта создается гостевая сессия. На время этой сессии сохраняются все выставленные вами рейтинги.
2. **Оценка фильмов:** Вы можете оценивать фильмы, и цвет круга рейтинга будет меняться в зависимости от вашего выбора. Если фильм не был оценен, рейтинг остается равным 0.
3. **Синхронизация:** Рейтинги, выставленные на странице поиска (`SearchPage`) и странице оценки (`RatePage`), синхронизируются.
4. **Пагинация:** Данные загружаются порциями, что обеспечивает быструю работу приложения даже при большом количестве фильмов.

## Как использовать

1. Перейдите на сайт приложения: [Movie-DB на Vercel](https://movies-app-seva2-git-main-vsevolods-projects-b699a14a.vercel.app).
2. Используйте поиск, чтобы найти интересующие вас фильмы.
3. Оценивайте фильмы, чтобы сохранить свои предпочтения.
4. Для доступа к сайту может потребоваться **VPN**.

## Установка и запуск

Если вы хотите запустить проект локально, выполните следующие шаги:

1. Клонируйте репозиторий:

   ```
   git clone https://github.com/seva123321/movie-db.git
   ```
2. Перейдите в папку проекта:
   ```
   cd movie-db
   ```
   Run
  
3. Установите зависимости:
   ```
   npm install
   ```
4. Запустите проект:
   ```
   npm run dev
   ```

5. Откройте браузер и перейдите по адресу: http://localhost:5173.
   
