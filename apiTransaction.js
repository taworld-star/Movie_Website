// Initial Values
const MOVIE_DB_API = '6bf3b3542f9ff12290736047042a751d';
const MOVIE_DB_ENDPOINT = 'https://api.themoviedb.org';
const MOVIE_DB_IMAGE_ENDPOINT = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_POST_IMAGE = 'https://via.placeholder.com/150';

function requestMovies(url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
}

function generateMovieDBUrl(path) {
    const url = `${MOVIE_DB_ENDPOINT}/3${path}?api_key=${MOVIE_DB_API}`;
    return url;
}

function getTopRatedMovies() {
    const url = generateMovieDBUrl(`/movie/top_rated`);
    requestMovies(url, renderMovies, handleGeneralError);
}

function getTrendingMovies() {
    const url = generateMovieDBUrl('/trending/movie/day');
    requestMovies(url, renderMovies, handleGeneralError);
}

function searchUpcomingMovies() {
    const url = generateMovieDBUrl('/movie/upcoming');
    requestMovies(url, renderMovies, handleGeneralError);
}

function searchPopularMovie() {
    const url = generateMovieDBUrl('/movie/popular');
    requestMovies(url, renderMovies, handleGeneralError);
}

// Search movies
function searchMovie(value) {
    const url = generateMovieDBUrl('/search/movie') + '&query=' + value;
    requestMovies(url, renderSearchMovies, handleGeneralError);
}

// Get movie details
function getMovieDetails(movieId) {
    const url = generateMovieDBUrl(`/movie/${movieId}`);
    requestMovies(url, (data) => {
        showMovieModal(data);
        getVideosByMovieId(movieId);
    }, handleGeneralError);
}

// Get videos/trailers for movie
function getVideosByMovieId(movieId) {
    const url = generateMovieDBUrl(`/movie/${movieId}/videos`);
    requestMovies(url, (data) => {
        const trailersContainer = document.querySelector('#trailers-container');
        if (trailersContainer) {
            trailersContainer.innerHTML = createVideoTemplate(data);
        }
    }, handleGeneralError);
}