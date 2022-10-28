const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const result = document.getElementById("results");
const apiKey = "a6271da45423f425e16ee334ee61c8ee";

let research = "";
let movies = [];

async function displayMovies() {
    await getMovies();

    if(movies.results.length === 0) {
        return alert('Aucun film trouvé');
    }

    movies.results.length = 24;

    result.innerHTML = movies.results.map((movie) => `
      <li>
        <h2>${movie.original_title}</h2>
        <div class="card-content">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="film poster attach" class="attach"></img>
          <div class="infos">
            <p>${movie.overview}</p>
            <p>Popularité : ${movie.popularity} 🌟</p>
          </div>
        </div>
      </li>
    `).join("");
}

async function getMovies() {
    movies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=` + apiKey + `&query=${research}`).then((response) => response.json());
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    research = searchInput.value;
    displayMovies().then(r => { return r; });
});