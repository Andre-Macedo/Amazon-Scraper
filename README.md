# Full-stack Test Amazon Scraper

This project is a full-stack web application that allows users to scrape Amazon product listings for a given keyword. It includes both a backend (Node.js) for handling the scraping logic and an interactive frontend (HTML, CSS, JavaScript) for user input and displaying the results.
Setup

## Prerequisites
  - Node.js installed on your machine.

## Installation

- Clone the repository:

```bash
git clone https://github.com/your-username/full-stack-test-amazon-scraper.git
```

- Navigate to the project directory:

```bash
cd full-stack-test-amazon-scraper
```

- Install dependencies:

```bash
npm install
```
## Running the Application

- Start the Node.js server:

    ```bash

    npm start
    ````

    Open your web browser and go to http://localhost:3000 to access the application.

## How to Use

- Enter the desired search keyword in the provided input field.

- Click the "Scrape" button to initiate the scraping process.

- View the extracted product details, including titles, ratings, reviews, and images, displayed on the webpage.

- Navigate through paginated results using the provided buttons.

## Project Structure

- public/: Contains static files (HTML, CSS, JS) for the frontend.
- server.js: Node.js backend script for handling scraping logic and serving frontend files.

## Dependencies

 - Express: Fast, unopinionated, minimalist web framework for Node.js.
 - Axios: Promise-based HTTP client for the browser and Node.js.
 - Cheerio: Fast, flexible, and lean implementation of core jQuery for the server.

## Notes
 - The application provides a simple grid display of product details and pagination for user-friendly navigation.

Feel free to explore, modify, and adapt this project for your needs!
