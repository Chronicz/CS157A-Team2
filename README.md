# CozyFirm

This is a furniture-focused web application that contains the following key features:

- A catalog of chairs and tables available and basic information about them
- A blog post tab where users can write blogs about specific pieces of furniture
- A wishlist feature where users can save furnitures of interest

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Future Plans](#future_plans)
4. [Report](#report)

<a name="installation"></a>

## Installation

- Clone this repository: `git clone https://github.com/Chronicz/CS157A-Team2.git`
- Download `entire schema initialization.sql` and import it into any Database Management System (DBMS)
- Download Node.js and Node Package Manager
- Open the project in any IDE
- Navigate to `index.js` and modify this part of the code to have your DBMS credentials:
  `
  const db = mysql.createConnection({
    host: "your_host_name",
    user: "your_root",
    password: "your_password",
    database: "cozyfirm"
})`

- Install API modules by typing `npm i` followed by package names in command prompt at directories `/frontend/cozyfirm` and `/backend`
- Required Packages: Next.js, Express.js, Axios, CORS, NextAuth.js, multer, moment, fs, mysql2
  
<a name="usage"></a>

## Usage
- Navigate to `/backend` and type `npm start` in command prompt
- Navigate to `/frontend/cozyfirm` and type `npm run` in command prompt
- On web browser, navigate to `http://localhost:3000/` and enjoy the application!

<a name="#future_plans"></a>

## Future Plans

- Collect data on more furnitures
- Add furniture reommendation function based on desired attributes
- Compplete wishlist functionality
- Complete the user authentication and log-in function

<a name = "report"></a>

## Report

- Report link: [https://docs.google.com/document/d/1Rt68FyEbdxCqF8_EGBTKEV-4bHcQ6G1PPFdL6f8lGNc/edit?usp=sharing](https://docs.google.com/document/d/1WKYEEgbUFvvgzJIWUwBQ4U0SB6V9lprNcImqFhWNhZE/edit?usp=sharing)
