const API_KEY = '531824c59374ba1968139fa7bcc652dc'
const slider = document.getElementById('movieSlider')

async function consult(search, extra = '') {
    //&query=thor&page=1&include_adult=false
    const res = await fetch(`https://api.themoviedb.org/3/${search}?api_key=${API_KEY}&language=en${extra}`)
    const data = await res.json()
    return data.results
}

async function loadMovies() {
    const movies = await consult('trending/movie/day')
    console.log(movies)
    let content = ''
    movies.forEach(movie => {
        content += `<div class="film">
                                <img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="">
                                <h5>${movie.original_title}</h5>
                            </div>
                        `
    });
    slider.innerHTML = content
}

loadMovies()