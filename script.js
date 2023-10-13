const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=51ca1e241e720d72e2bb92a4b36859f5`

async function getData() {
    try {
        const response = await fetch(url)
        if (!response.ok) {
           throw new Error(`Request failed with status: ${response.status}`);
       }
        const data = await response.json();
        console.log(data.results)
        return data.results;
    } catch(error){
        console.error('Registration error:', error);
        throw error;
    }
}
getData();


class MoviePage {
    async renderMovies() {
        const main = document.querySelector('main'); 
        const movies = await getData(); 

        movies.forEach((movieData) => {
            const movie = document.createElement('div');
            movie.classList.add('movie');
            main.appendChild(movie);

            const img = document.createElement('img');
            img.classList.add('movie-img');
            img.src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
            movie.appendChild(img);

            const movieInfo = document.createElement('div');
            movieInfo.classList.add('movie-info');
            movie.appendChild(movieInfo);

            const title = document.createElement('h3');
            title.textContent = movieData.title
            movieInfo.appendChild(title);

            const orange = document.createElement('span');
            orange.classList.add('orange')
            orange.textContent = movieData.vote_average
            movieInfo.appendChild(orange);

            const overview = document.createElement('div');
            overview.classList.add('overview')
            movie.appendChild(overview);

            const overviewTitle = document.createElement('h3');
            overviewTitle.textContent = movieData.overview
            overview.appendChild(overviewTitle);
        });
    }
    async renderSearch() {
        const search = document.getElementById('search');

        search.addEventListener('keydown', async (event) => {
            if(event.key === "Enter") {
                event.preventDefault();
                const searchTerm = search.value;
                const filteredMovies = (await getData()).filter(movieData =>
                    movieData.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
                this.clearMovies();
                this.renderFilteredMovies(filteredMovies); 
            }
        });
    }

    clearMovies() {
        const main = document.querySelector('main');
        main.innerHTML = ''; 
    }
    renderFilteredMovies(movies) {
        const main = document.querySelector('main');
        movies.forEach(movieData => {
            const movie = document.createElement('div');
            movie.classList.add('movie');
            main.appendChild(movie);
    
            const img = document.createElement('img');
            img.classList.add('movie-img');
            img.src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
            movie.appendChild(img);
    
            const movieInfo = document.createElement('div');
            movieInfo.classList.add('movie-info');
            movie.appendChild(movieInfo);
    
            const title = document.createElement('h3');
            title.textContent = movieData.title;
            movieInfo.appendChild(title);
    
            const orange = document.createElement('span');
            orange.classList.add('orange');
            orange.textContent = movieData.vote_average;
            movieInfo.appendChild(orange);
    
            const overview = document.createElement('div');
            overview.classList.add('overview');
            movie.appendChild(overview);
    
            const overviewTitle = document.createElement('h3');
            overviewTitle.textContent = movieData.overview;
            overview.appendChild(overviewTitle);
        });
    }
}

const moviePage = new MoviePage();
moviePage.renderMovies();
moviePage.renderSearch();
