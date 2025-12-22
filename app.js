// Initial Values
const INITIAL_SEARCH_VALUE = 'spiderman';
const log = console.log;

// Selecting elements from the DOM
const searchButton = document.querySelector('#search');
const searchInput = document.querySelector('#exampleInputEmail1');
const moviesContainer = document.querySelector('#movies-container');
const moviesSearchable = document.querySelector('#movies-searchable');
const modal = document.querySelector('#modal');
const modalBody = document.querySelector('#modal-body');
const closeBtn = document.querySelector('.close');
const loadingSpinner = document.querySelector('#loading');

// Modal close event
closeBtn.onclick = function () {
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

function showLoading(show) {
    loadingSpinner.style.display = show ? 'block' : 'none';
}

function createImageContainer(imageUrl, id) {
    const tempDiv = document.createElement('div');
    tempDiv.setAttribute('class', 'imageContainer');
    tempDiv.setAttribute('data-id', id);

    const movieElement = `
        <img src="${imageUrl}" alt="Movie Poster" data-movie-id="${id}" loading="lazy">
    `;
    tempDiv.innerHTML = movieElement;

    return tempDiv;
}

function resetInput() {
    searchInput.value = '';
}

function handleGeneralError(error) {
    log('Error: ', error.message);
    alert(error.message || 'Internal Server Error');
    showLoading(false);
}

function createIframe(video) {
    const videoKey = (video && video.key) || 'No key found!!!';
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoKey}`;
    iframe.width = '100%';
    iframe.height = '400';
    iframe.style.minHeight = '300px';
    iframe.style.borderRadius = '10px';
    iframe.allowFullscreen = true;
    return iframe;
}

function insertIframeIntoContent(video, content) {
    const videoContent = document.createElement('div');
    videoContent.style.marginBottom = '2rem';
    const iframe = createIframe(video);

    videoContent.appendChild(iframe);
    content.appendChild(videoContent);
}

function createVideoTemplate(data) {
    const videos = data.results || [];

    let htmlContent = '';

    if (videos.length === 0) {
        htmlContent = `
            <div style="text-align: center; padding: 2rem;">
                <p>Tidak ada trailer untuk film ini</p>
            </div>
        `;
    } else {
        for (let i = 0; i < Math.min(videos.length, 4); i++) {
            const video = videos[i];
            const videoKey = (video && video.key) || 'No key found!!!';
            htmlContent += `
                <div style="margin-bottom: 2rem;">
                    <h3 style="margin-bottom: 1rem;">${video.name || 'Trailer'}</h3>
                    <iframe 
                        src="https://www.youtube.com/embed/${videoKey}" 
                        width="100%" 
                        height="400" 
                        style="border-radius: 10px;"
                        allowfullscreen>
                    </iframe>
                </div>
            `;
        }
    }

    return htmlContent;
}

function renderMovies(data) {
    const moviesBlock = generateMoviesBlock(data);
    moviesContainer.appendChild(moviesBlock);
}

function renderSearchMovies(data) {
    moviesSearchable.innerHTML = '';
    const moviesBlock = generateMoviesBlock(data);
    moviesSearchable.appendChild(moviesBlock);
    showLoading(false);
}

function generateMoviesBlock(data) {
    const movies = data.results;
    const section = document.createElement('div');
    section.setAttribute('class', 'movies-grid');

    for (let i = 0; i < movies.length; i++) {
        const { poster_path, id } = movies[i];

        if (poster_path) {
            const imageUrl = MOVIE_DB_IMAGE_ENDPOINT + poster_path;
            const imageContainer = createImageContainer(imageUrl, id);
            section.appendChild(imageContainer);
        }
    }

    return section;
}

function showMovieModal(movieData) {
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 200px 1fr; gap: 2rem; margin-bottom: 2rem;">
            <div>
                <img src="${MOVIE_DB_IMAGE_ENDPOINT}${movieData.poster_path}" 
                     alt="${movieData.title}" 
                     style="width: 100%; border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.3);">
            </div>
            <div>
                <h2 style="margin-top: 0; color: #06dee1; font-size: 1.8rem;">${movieData.title || movieData.name}</h2>
                <p style="color: #79ff6c; font-size: 1.1rem; margin: 0.5rem 0;">
                    <i class="fas fa-star"></i> ${(movieData.vote_average || 0).toFixed(1)}/10
                </p>
                <p style="color: rgba(255,255,255,0.8); margin: 1rem 0;">
                    <strong>Release Date:</strong> ${movieData.release_date || 'N/A'}
                </p>
                <p style="color: rgba(255,255,255,0.8); line-height: 1.6;">
                    <strong>Overview:</strong><br>${movieData.overview || 'Tidak ada deskripsi'}
                </p>
            </div>
        </div>
        <div id="trailer-section">
            <h3 style="color: #06dee1; margin-top: 2rem; margin-bottom: 1rem;">Trailer</h3>
            <div id="trailers-container">Loading trailers...</div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Fetch and display trailers
    getVideosByMovieId(movieData.id);
}

// Click on any movies
// Event Delegation
document.onclick = function (event) {
    const { tagName } = event.target;
    if (tagName.toLowerCase() === 'img' && event.target.dataset.movieId) {
        const movieId = event.target.dataset.movieId;
        // Get movie details
        getMovieDetails(movieId);
    }
}

searchButton.onclick = function (event) {
    event.preventDefault();
    const value = searchInput.value;
    if (value) {
        showLoading(true);
        searchMovie(value);
    }
    resetInput();
}

// Allow Enter key to search
searchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchButton.click();
    }
})

// Initialize the search
searchMovie(INITIAL_SEARCH_VALUE);

