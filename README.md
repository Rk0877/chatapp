# Real-Time Chat Application

This is a real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js). It supports real-time messaging, user authentication, and integration with language models for automated responses.

## Features

- **User Authentication**: Registration and login using email and password, secured with JSON Web Tokens (JWT).
- **Real-Time Messaging**: Send and receive messages in real-time using Socket.io.
- **Message Storage**: All messages are stored in MongoDB.
- **User Status**: Users can set their status as 'AVAILABLE' or 'BUSY'.
- **Automated Responses**: When a user is 'BUSY', an appropriate response is generated using a language model API.
- **Frontend**: A simple frontend to demonstrate the backend functionalities.

## Prerequisites

- Node.js (v16.13.0 or higher)
- MongoDB (v4.4 or higher)

## Getting Started

### Clone the Repository and run instruction

```sh
git clone https://github.com/Rk0877/chatapp.git
cd chatapp

npm install

Create a .env file in the root directory and add the following variables:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
LLM_API_KEY=your_language_model_api_key (if applicable)


Ensure MongoDB is running. If installed locally, you can start it with:
mongod


node server.js





