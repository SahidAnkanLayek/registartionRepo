## Microservices architecture :-----
=====================================

 Microservices architecture is a design pattern where an application is built as a collection of small services, each running in its own process and communicating with lightweight mechanisms, often an HTTP resource API. Each service is built around a specific business capability and can be deployed independently.

Let's consider a simple e-commerce application as an example. In a monolithic architecture, all the functionalities like user management, product management, order management, and payment processing would be part of a single application. However, in a microservices architecture, each of these functionalities would be a separate service.

User Service: This service would handle user-related operations like user registration, login, and profile management. It could be written in Node.js with a MongoDB database for storing user data.

Product Service: This service would manage product-related operations like adding new products, updating product details, and fetching product information. It could be written in Node.js with a PostgreSQL database for storing product data.

Order Service: This service would handle order-related operations like creating a new order, updating order status, and fetching order details. It could also be written in Node.js with a PostgreSQL database for storing order data.

Payment Service: This service would manage payment-related operations like processing payments, handling refunds, and storing payment information. It could be written in Node.js with a third-party payment gateway API for processing payments.

Each of these services can be developed, deployed, and scaled independently, which provides a lot of flexibility and makes it easier to maintain and update the application. However, it also introduces some complexity in terms of service communication, data consistency, and operational overhead.

## how to store jwt token in the user browser ?
===============================================
Ans:--  In this example, after a successful login, the server returns a JWT token in the response. We then store this token in both local storage and a cookie using the localStorage.setItem() and document.cookie methods, respectively.

fetch('/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'johnDoe',
    password: 'password123'
  })
})
.then(response => response.json())
.then(data => {
  const token = data.token;
  // Store the token in local storage
  localStorage.setItem('jwtToken', token);

  // Store the token in a cookie
  const expires = new Date(Date.now() + 3600000); // expires in 1 hour
  document.cookie = `jwtToken=${token}; expires=${expires.toUTCString()}; path=/`;
})
.catch(error => console.error('Error:', error));

## Proper folder structure:---
==============================


project/
│
├── routes/
│   └── authRoutes.js
│
├── controllers/
│   └── authController.js
│
├── models/
│   └── userModel.js
│
├── middlewares/
│   └── authMiddleware.js
│
├── config/
│   └── database.js
│
├── .env
├── .gitignore
└── app.js


## *.log is a pattern used to match any file with a .log extension.
In -->>> ".gitignore file", *.log is a pattern used to match any file with a .log extension. This pattern tells Git to ignore any files with the .log extension when tracking changes or staging files for commit.

## require('dotenv').config()
//This line loads environment variables from a .env file into process.env. This is useful for storing configuration variables like database connection strings or API keys securely.


## const port = process.env.PORT || 5000;
 This sets the port number for the Express server. It uses the PORT environment variable if it's set, otherwise defaults to port 5000.
