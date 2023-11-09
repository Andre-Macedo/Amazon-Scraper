// Get the elements from the DOM
const scrapeBtn = document.getElementById('scrapeBtn');
const keywordInput = document.getElementById('keyword');
const resultsDiv = document.getElementById('results');
const paginationDiv = document.getElementById('pagination');

// Default values
let currentPage = 1;

// Event listener for the scrape button
scrapeBtn.addEventListener('click', () => {
    // Get the keyword from the input
    const keyword = keywordInput.value.trim();

    // Check if the keyword is empty
    if (!keyword) {
        alert('Please enter a keyword');
        return;
    }

    // Make an AJAX request to the backend
    fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}&page=${currentPage}`)
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error('Error:', error));
});

/**
 * Display the search results on the webpage.
 * @param {Object} data - The data containing the search results.
 */
function displayResults(data) {
    // Clear the results and pagination divs
    resultsDiv.innerHTML = '';
    paginationDiv.innerHTML = '';
    console.log(data);

    // Check if there are no results
    if (data.products.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    // Display each product
    data.products.forEach(product => {
        const productDiv = document.createElement('div');
        let displayTitle = product.title.length > 150 ? product.title.substring(0, 150) + '...' : product.title;
        displayTitle = displayTitle.replace(/&nbsp;/g, ' ');
        productDiv.classList.add('product-item');

        // Check if the image URL is defined
        const imageUrl = product.imageUrl || ''; // Provide a fallback image URL
        productDiv.innerHTML = `
        <div class="product-content">
            <h3>${displayTitle}</h3>
            <p>Rating: ${product.rating}</p>
            <p>Reviews: ${product.reviews}</p>
            ${imageUrl ? `<img src="${imageUrl}" alt="${product.title}">` : ''}
        </div>`;

        resultsDiv.appendChild(productDiv);
    });

    // Add pagination buttons
    for (let i = 1; i <= Math.ceil(data.totalProducts); i++) {
        const button = document.createElement('button');
        const keyword = keywordInput.value.trim();
        button.innerText = i;
        button.addEventListener('click', () => {
            currentPage = i;
            fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}&page=${currentPage}`)
                .then(response => response.json())
                .then(data => displayResults(data))
                .catch(error => console.error('Error:', error));
        });
        paginationDiv.appendChild(button);
    }
}