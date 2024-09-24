# Backend API

This is the backend folder of the project built with **Node.js**. The server handles API requests, processes data, and interacts with the database. The application follows best practices in terms of code structure and RESTful API design.

## Features

- **Node.js** with **Express.js** for building RESTful APIs.
- **MongoDB** for database storage (using **Mongoose** as an ODM).
- **JWT Authentication** for secure user authentication and authorization.
- **Environment variables** for configuration management.
- **MVC (Model-View-Controller)** architecture for better project organization.
- **Error Handling** with custom middleware.
- **Request validation** using `Joi` or `express-validator`.
- **CORS** support for cross-origin requests.

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v14.x or later)
- **MongoDB** (for local development or provide a MongoDB connection string)

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. Navigate to the `backend` folder:

   ```bash
   cd your-repo/backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the `backend` folder and add the necessary environment variables:

   ```bash
   cp .env.example .env
   ```

   Put your `STABILITY_API_KEY` key

### Running the server

1. Start the server in development mode:

   ```bash
   npm run dev
   ```

2. The server will run on `http://localhost:3000/` (or the port defined in `.env`).

### API Endpoints

The following are the main API routes available in this backend:

- **Authentication**:
  - `POST /api/auth/register` - Register a new user.
  - `POST /api/auth/login` - Log in a user.
- **User**:
  - `GET /api/users/:id` - Fetch a user by ID.
  - `PUT /api/users/:id` - Update user information.
  - `DELETE /api/users/:id` - Delete a user account.
- **Other API routes** can be documented here...

## Project Structure

```bash
backend/
│
├── controllers/   # Logic for handling API requests
├── models/        # MongoDB models
├── routes/        # Route definitions
├── middleware/    # Custom middleware (authentication, validation, etc.)
├── config/        # Configuration files
├── utils/         # Utility functions
├── app.js         # Entry point of the application
└── package.json   # Project metadata and dependencies
```

## Scripts

- `npm run dev`: Run the server in development mode.
- `npm start`: Run the server in production mode.

## Environment Variables

- `PORT`: Port number for the server (default is 5000).
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for signing JWT tokens.

---

## API Documentation

Here’s a detailed API documentation for the image generation API you’ve implemented using the Stability.ai service.

---

# Image Generation API Documentation

## Overview

This API allows users to generate images based on a text prompt using the Stability.ai API. The image is generated in a specific format (JPEG) and returned as a Base64-encoded string. The user must provide a valid API key in the request header for authentication.

---

## **Base URL**

```
http://localhost:3000/api
```

## **Endpoints**

### 1. **Generate Image**

Generates an image based on the given text prompt using the Stability.ai API.

- **URL**: `/generate-image`
- **Method**: `POST`
- **Headers**:
  - `Authorization`: Bearer token for API authentication.
  - `Content-Type`: `application/json`
- **Request Body Parameters**:
  - `prompt` (string, required): A text description of the image to be generated.
- **Response**: The API returns a Base64-encoded string of the generated image.

---

### **Request Example**

#### **POST** `/generate-image`

**Request Headers**:

```json
{
  "Authorization": "Bearer YOUR_API_KEY",
  "Content-Type": "application/json"
}
```

**Request Body**:

```json
{
  "prompt": "A futuristic cityscape with flying cars and neon lights"
}
```

---

### **Response Example (Success: 200 OK)**

The response contains the generated image in Base64-encoded format.

```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAB... (truncated)"
}
```

**Description**:

- **200 OK**: The request was successful and the image has been generated.
- The response contains the `image` field with the Base64-encoded string of the generated image in JPEG format.

---

### **Response Example (Error: 400 Bad Request)**

```json
{
  "error": "Prompt is required"
}
```

**Description**:

- **400 Bad Request**: This error occurs if the `prompt` field is missing or invalid.

---

### **Response Example (Error: 402 Payment Required)**

```json
{
  "error": "Request failed with status code 402"
}
```

**Description**:

- **402 Payment Required**: This error occurs if there is an issue with the API key, such as exceeding the usage limit or requiring a paid plan.

---

### **Error Handling**

The API returns appropriate HTTP status codes for errors:

- **400 Bad Request**: Invalid or missing request parameters.
- **401 Unauthorized**: Invalid or missing `Authorization` token.
- **402 Payment Required**: Exceeded API usage limit or requires a paid subscription.
- **500 Internal Server Error**: A server-side error occurred.

---

## **Rate Limiting**

The Stability.ai API may have rate limits based on the subscription plan associated with your API key. Ensure you monitor the usage to avoid exceeding the quota.

---

## **Authentication**

This API requires a Bearer token in the `Authorization` header. The token is your Stability.ai API key.

Example:

```bash
Authorization: Bearer sk-SSxj1H5vqkjEJkMCL8d7Lgl14qaw3SpZk4FqP5TWBBsI9Y4E
```

If you are testing locally or from a frontend application, ensure the token is passed correctly.

---

## **Setup and Run the Server**

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the server**:

   ```bash
   node server.js
   ```

3. **Test the API**:
   - You can test the API using **Postman** or **cURL** by making a `POST` request to `http://localhost:5000/api/generate-image` with the appropriate `Authorization` header and request body.

---

## **License**

This API is provided under the MIT License. You are free to use, modify, and distribute this API as needed.

---

## **Contact**

For questions or support regarding the Image Generation API, contact the developer at:

- **Name**: Vikram Kumar
- **Email**: [YourEmail@example.com]
- **GitHub**: [YourGitHubProfile]

---
