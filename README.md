# Job Portal – Full Stack Web Application

A full-stack Job Portal application developed using **React.js and Spring Boot**. The application allows users to manage job postings through a user-friendly interface and RESTful APIs.

## Features

- View all available job postings.
- Add new job postings.
- Update existing job details.
- Delete job postings.
- Search job postings using keywords.
- Integration between React frontend and Spring Boot backend.
- REST API-based communication.

## Technologies Used

**Frontend**
- React.js
- JavaScript
- Material UI
- Axios
- React Router DOM
- HTML5 and CSS3

**Backend**
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- RESTful APIs
- Maven

**Tools**
- IntelliJ IDEA
- Visual Studio Code
- Git and GitHub
- Postman

## Project Structure

```text
Job-Portal/
│
├── react-ui/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── spring-boot-rest/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
│
└── README.md
```

## Installation and Setup

### Prerequisites
- Java JDK
- Node.js and npm
- Configured database

### 1. Clone the Repository

```bash
git clone https://github.com/Prachidhekule/Job-Portal-Full-Stack-Job-Portal-using-React-and-Spring-Boot.git
```

### 2. Run the Backend

```bash
cd spring-boot-rest
```

Configure the database in `application.properties`.

Run the application:

```bash
.\mvnw.cmd spring-boot:run
```

Backend URL: `http://localhost:8080`

### 3. Run the Frontend

Open another terminal:

```bash
cd react-ui
npm install
npm start
```

Frontend URL: `http://localhost:3000`

## REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/jobPosts` | Get all job postings |
| GET | `/jobPost/{postId}` | Get job by ID |
| POST | `/jobPost` | Add a new job |
| PUT | `/jobPost` | Update job details |
| DELETE | `/jobPost/{postId}` | Delete a job |
| GET | `/load` | Load sample job data |

## Author

**Prachi Dhekule**

GitHub: [Prachidhekule](https://github.com/Prachidhekule)
