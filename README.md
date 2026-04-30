# WTWR (What to Wear?): Back End

A RESTful API backend for a weather-based clothing recommendation application. This server manages user accounts, clothing items, and provides endpoints for a full-stack fashion app that helps users decide what to wear based on current weather conditions.

## Overview

- Project Pitch Video
- Running the Project
- Project description
- Project purpose
- Technologies used
- Key learning objectives

## Project Pitch Video

Check out [this video](https://www.loom.com/share/de41513c51ce47448b8de861cd8599af), where I describe my
project, the steps I took to build the backend of the WTRW app, a challenge I faced while building it, and the lessons I learned from it.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

## Project Description

This API backend server manages user accounts, clothing items, and provides endpoints for a full-stack app that gives users recommendations on what to wear based on current weather conditions.

## Project Purpose

Express.js backend serves as the foundation for the WTWR application providing:

- **User management:** Profile management
- **Clothing item management:** CRUD operations for user's wardrobe items
- **Weather integration:** API endpoints that support weather-based clothing recommendations
- **Data persistence:** MongoDB integration for reliable data storage

## Technologies Used:

### Backend Framework & Runtime:

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework for building RESTful APIs

### Database & ODM:

- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Object Document Mapper (ODM) for MongoDB

### Authentication & Security:

- **bcryptjs** - Password hashing and encryption
- **jsonwebtoken (JWT)** - Token-based authentication
- **CORS** - Cross-Oring Resource Sharing configuration

### Development Tools:

- **ESLint** - Code linting with Airbnb style guide
- **Prettier** - Code formatting
- **Git & Github** - Version control and collaboration
- **Postman** - API Testing
- **Github Actions** - For automated testing

### API Features:

- **RESTful Architecture** - Standard HTTP methods (GET, POST, PUT, DELETE)
- **JSON Data Exchange** - Structured data communication
- **Error handling** - Comprehensive error responses and validation
- **Custom middleware** - For authentication
- **CORS support** - Cross-origin resource sharing for frontend integration

## Key Learning Objectives

This project demonstrates proficiency in:

- Building scalable backend APIs with Express.js
- Database design and management with MongoDB
- RESTful API design principles
- Error handling and data validation
- Server Architecture & Organization
- Database Integration
- Authentication & Authorization
- Code organization following industry best practices
