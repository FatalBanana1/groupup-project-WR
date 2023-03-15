# Groupup - by Wasiq Rashid

## **About**

Groupup is a full-stack web application inspired by Meetup. The build currently supports 5 features for user interactivity:

1. Groups: Full CRUD
2. Events: Full CRUD
3. Memberships: Full CRUD
4. Attendances: Full CRUD
5. Searchbar: Search for Groups

### Background:

This app allows users to create or explore groups and create or explore events within groups. Users can also join groups or join events.

This was my first Full Stack Application. I spent 2 weeks developing this and polishing it. I also worked hard to make this app compatible for Mobile Users. Try it out!

## ✨ **Features**:

### Splash Page

![img](https://media.discordapp.net/attachments/1084619922384101588/1084620994787946496/image.png?width=1724&height=837)

### Explore Groups

![img](https://media.discordapp.net/attachments/1084619922384101588/1084621088824246292/image.png?width=838&height=891)

### Explore Events

![img](https://media.discordapp.net/attachments/1084619922384101588/1084621200602435604/image.png?width=954&height=891)

### Group Details Page

![img](https://media.discordapp.net/attachments/1084619922384101588/1084621441632305273/image.png?width=1443&height=891)

### Event Details Page

![img](https://media.discordapp.net/attachments/1084619922384101588/1084621326821638164/image.png?width=1593&height=891)

### Memberships

![img](https://media.discordapp.net/attachments/1084619922384101588/1084621554903683128/image.png?width=1004&height=891)

### Attendances

![img](https://media.discordapp.net/attachments/1084619922384101588/1084621383612497920/image.png?width=765&height=891)

## 📁 Installation

1. Clone this repository (only this branch)

2. Install dependencies in both front and backend directories

    ```bash
    npm install
    ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `express_schema` schema, defined
   by the `SCHEMA` environment variable. Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. This app uses Sequelize.js as the ORM to handle creating the Database. Go to the backend directory, migrate your database, seed your database, and run the app

    ```bash
    cd backend
    ```

    ```bash
    npm run r
    ```

    ```bash (both frontend and backend directories )
    npm start
    ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## **Tech Stack**

### Languages:

[![JavaScript][javascript-shield]][javascript-url]
[![Python][python-shield]][python-url]
[![HTML][html-shield]][html-url]
[![CSS][css-shield]][css-url]

### Backend Development:

[![Express][express-shield]][express-url]
[![Sequelize][sequelize-shield]][sequelize-url]

### Frontend Development:

[![react][react-shield]][react-url]
[![react-router][react-router-shield]][react-router-url]
[![redux][redux-shield]][redux-url]

### Other Tech:

1. Node.js
2. SQLite
3. PostgreSQL

### Future Goals:

1. Implement Group Images feaure
2. Implement Event Images feaure

## Database Schema Design

![groupup-db-schema]

<!-- MARKDOWN LINKS & IMAGES -->

[groupup-db-schema]: ./groupup-wr-diagram.png
[javascript-shield]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[python-shield]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[html-shield]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[css-shield]: https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white
[flask-shield]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
[sqlite-shield]: https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white
[postgresql-shield]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[react-shield]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-router-shield]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[redux-shield]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[javascript-url]: https://www.javascript.com/
[python-url]: https://www.python.org/
[html-url]: https://www.w3.org/html/
[css-url]: https://www.w3.org/Style/CSS/Overview.en.html
[flask-url]: https://flask.palletsprojects.com/en/2.2.x/
[sqlite-url]: https://www.sqlite.org/index.html
[postgresql-url]: https://www.postgresql.org/
[react-url]: https://reactjs.org/
[react-router-url]: https://reactrouter.com/en/main
[redux-url]: https://redux.js.org/
[linkedin-url]: https://www.linkedin.com/in/wasiq-rashid-fsd/
[portfolio-url]: https://wasiqr-portfolio.onrender.com/
[express-url]: https://expressjs.com/en/4x/api.html
[sqlite-url]: https://www.sqlite.org/index.html
[sequelize-shield]: https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue
[sequelize-url]: https://sequelize.org/docs/v6/
[express-shield]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
