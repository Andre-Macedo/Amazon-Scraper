// Import necessary libraries
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a route for scraping Amazon product listings
app.get('/api/scrape', async (req, res) => {
    try {
        // Extract the search keyword from the query parameters
        const keyword = req.query.keyword;
        if (!keyword) {
            throw new Error('Please provide a keyword');
        }
        // Extract the page number from the query parameters (default to 1)
        const page = req.query.page || 1;
        const itemsPerPage = 10;
        const startIndex = (page - 1) * itemsPerPage;
        let lastIndex = 1;

        // Construct the Amazon search URL with the specified keyword and page
        const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}&page=${page}`;
        // Make a GET request to the Amazon search results page
        const response = await axios.get(amazonUrl);
        // Load the HTML content into Cheerio for parsing
        const $ = cheerio.load(response.data);

        // Array to store extracted product details
        const products = [];

        // Iterate over each product listing on the page and extract details
        $('.s-result-item').each((index, element) => {
            const title = $(element).find('h2 span').text().trim();
            const rating = $(element).find('.a-icon-star-small .a-icon-alt').text().trim();
            const reviews = $(element).find('.s-item__reviews-count').text().trim();
            const imageUrl = $(element).find('img.s-image').attr('src');
            products.push({ title, rating, reviews, imageUrl });
        });

        // Extract the total number of pages from the pagination strip
        lastIndex = $('.s-pagination-strip').children().last().prev().text().trim();

        // Send the extracted data as JSON response
        res.json({products, 'totalProducts': lastIndex});
    } catch (error) {
        // Handle errors and send an internal server error response
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
