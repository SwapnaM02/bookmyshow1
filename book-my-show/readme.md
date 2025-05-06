# BookMyShow - Movie Ticket Booking Platform

## Overview

BookMyShow is a comprehensive movie ticket booking platform that connects movie-goers, theatre owners, and administrators in a seamless digital ecosystem. The application provides a user-friendly interface for booking movie tickets, managing theatres, and administering the entire system.

## Features

- **User Authentication & Authorization**: Secure login/registration system with role-based access control

- **Seat Selection**: Interactive seat layout and selection
- **Booking Management**: View and manage bookings
- **Theatre Management**: Add/manage theatres and screens
- **Show Scheduling**: Configure show timings and pricing
- **Admin Controls**: Approve theatres and manage platform content
- **Payment Integration**: Secure payment processing with multiple options
- **Password Recovery**: Self-service password reset functionality


## Technology Stack

- **Frontend**: React.js, Redux, HTML5, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)


## API Documentation

API documentation is available at `/api/docs` when running the server locally.

Key API endpoints:

```
# Authentication
POST /api/auth/register      - Register a new user
POST /api/auth/login         - User login
POST /api/auth/forgot-password - Initiate password reset
POST /api/auth/reset-password - Complete password reset

# Movies
GET /api/movies              - List all movies
GET /api/movies/:id          - Get movie details
POST /api/movies             - Add new movie (admin only)

# Theatres
GET /api/theatres            - List all theatres
POST /api/theatres           - Register new theatre (partner)
PUT /api/theatres/:id/approve - Approve theatre (admin only)

# Shows
GET /api/shows               - List shows
POST /api/shows              - Create show (partner only)

# Bookings
POST /api/bookings           - Create a booking
GET /api/bookings/user       - Get user's bookings
```

## Demo

[![Bookmyshow video](https://img.youtube.com/vi/Qe7r5okCH4I/maxresdefault.jpg)](https://youtu.be/Qe7r5okCH4I)