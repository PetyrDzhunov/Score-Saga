# Score Saga API

## Overview

Score Saga API is a RESTful API built with Express.js and PostgreSQL as the database, designed to manage user accounts, predictions, matches, and leaderboards for a football prediction game. This application leverages Sequelize ORM for database interactions and includes scheduled tasks for fetching match fixtures and calculating user success rates. The API uses JWT authentication to secure endpoints and is documented using Swagger, providing a user-friendly interface for exploring the available endpoints and their functionalities.

## Features

- **User Management**: Register, login, and manage user accounts.
- **Prediction Management**: Create and retrieve user predictions for football matches (requires authorization).
- **Match Management**: Fetch and store upcoming football match fixtures.
- **Leaderboard**: View users with the highest prediction success rates.
- **Cron Jobs**: Scheduled tasks to fetch match fixtures and calculate user success rates.
- **JWT Authentication**: Secure endpoints using JSON Web Tokens.
- **Swagger Documentation**: Interactive API documentation available at `/api-docs`.

## Endpoints

### User Endpoints
- `GET /users` - Retrieve a list of all users.
- `POST /users` - Register a new user.
- `POST /users/login` - Login a user.
- `GET /users/{id}` - Retrieve a user by ID.
- `DELETE /users/{id}` - Delete a user by ID.

### Prediction Endpoints (requires authorization)
- `GET /predictions` - Retrieve a list of all predictions.
- `POST /predictions` - Create a new prediction.
- `PUT /predictions/{id}` - Update a prediction.
- `DELETE /predictions/delete/{id}` - Delete a prediction by ID.

### Match Endpoints (requires authorization)
- `GET /matches` - Retrieve a list of all matches.
- `GET /matches/{id}` - Retrieve a match by ID.

### Leaderboard Endpoint
- `GET /leaderboard` - Retrieve a leaderboard showing users with the highest success rates.

## Cron Jobs

### Fetch Fixtures
Scheduled to run every hour to fetch or update upcoming/current match fixtures and store them in the database.

### Calculate Success Rate
Scheduled to run every hour to calculate and update the success rates of users based on their predictions.
