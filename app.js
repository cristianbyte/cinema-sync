const API_KEY = '531824c59374ba1968139fa7bcc652dc'
const slider = document.getElementById('movieSlider')
const search = document.getElementById('form')
const searchInput = document.getElementById('search')

async function consult(search, options = '') {
    //&query=thor&page=1&include_adult=false
    const res = await fetch(`https://api.themoviedb.org/3/${search}api_key=${API_KEY}&language=en${options}`)
    const data = await res.json()
    return data.results
}

function loadSlider(movies) {
    document.getElementById('poster').src = `https://image.tmdb.org/t/p/original${movies[0].backdrop_path}`
    let content = ''
    console.log(movies)
    movies.forEach((movie) => {
        if (movie.poster_path == null) {
            return
        }
        content += `<div class="film">
                                <img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="">
                                <h5>${movie.original_title}</h5>
                            </div>
                        `
    });
    slider.innerHTML = content
}

async function loadMovies() {
    const movies = await consult('trending/movie/day?')
    loadSlider(movies)
}

search.addEventListener('submit', async (e) => {
    e.preventDefault()
    const stringForSearch = searchInput.value
    const movies = await consult(`search/movie?query=${stringForSearch}&`)
    loadSlider(movies)

})

slider.addEventListener('wheel', (event) => {
    event.preventDefault();
    slider.scrollBy({
        left: event.deltaY < 0 ? -50 : 50,
    });
});

loadMovies()