
# Personal Expense Tracker

## Overview
The Personal Expense Tracker is a RESTful API developed using Node.js and Express.js, designed to help users manage their financial records efficiently. Users can record their income and expenses, categorize them, and generate reports for better financial tracking.

## Features
- User authentication (registration and login)
- Create, read, update, and delete transactions
- Categorize transactions into income and expenses
- Generate summaries and reports based on transactions
- Pagination for transaction retrieval

## Technologies Used
- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication
- Mongoose for MongoDB object modeling

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB (locally installed or a MongoDB Atlas account)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. Install the required packages:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```plaintext
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/yourdbname
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```
   Alternatively, use Nodemon for automatic server restarts during development:
   ```bash
   npx nodemon
   ```

### API Endpoints

#### User Authentication
- **POST** `/api/users/register`: Register a new user.
- **POST** `/api/users/login`: Login an existing user.

#### Transactions
- **POST** `/api/transactions`: Add a new transaction.
- **GET** `/api/transactions`: Retrieve all transactions (with pagination).
- **GET** `/api/transactions/:id`: Retrieve a transaction by ID.
- **PUT** `/api/transactions/:id`: Update a transaction by ID.
- **DELETE** `/api/transactions/:id`: Delete a transaction by ID.
- **GET** `/api/summary`: Retrieve a summary of transactions (total income, expenses, and balance).

### Example Requests

**User Signup Example**
```json
{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword"
}
```

**Post Transaction Example**
```json
{
    "type": "income",
    "category": "Salary",
    "amount": 5000,
    "date": "2024-10-22",
    "description": "Monthly salary"
}
```

### Contributing
Contributions are welcome! Please submit a pull request or open an issue for discussion.

### License
This project is licensed under the MIT License.

### Acknowledgements
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)
```

### Customization Tips
- Replace `yourusername` with your actual GitHub username in the clone URL.
- Add or modify sections based on additional features or changes in your project.
- Consider including a section for troubleshooting common issues or FAQs if necessary.

###images

https://drive.google.com/file/d/12H0ye4WMFOGSHSBSH6Xv7cLm9kGXYiPV/view?usp=sharing
https://drive.google.com/file/d/1g1g2P2SkUovFHLGALpzsyKP8g4YkB9iK/view?usp=sharing
https://drive.google.com/file/d/1YmXT7n6TAeA-RKPspSnKUQb2XEs-4AvZ/view?usp=sharing
https://drive.google.com/file/d/1ilBzPdWJs1crT_sExl8fP7V8aa9tT3Ba/view?usp=sharing
https://drive.google.com/file/d/1h2i98WODMEV9mU9r0PF0TEDfFW2rgEx_/view?usp=sharing
