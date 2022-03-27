// function to search the movie
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "4bf96aa9f48cf1e136f4baa7f633ba7f";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
let moviedescBackground = document.querySelector(
  ".movie-Full-description-details "
);

let homeH1 = document.querySelector(".home-h1");

async function searchMovieHandler() {
  //get query
  let userQuery = document.getElementById("input-search").value;
  console.log(userQuery);

  if (userQuery) {
    //clearing the input feild
    document.getElementById("input-search").value = "";
    document.querySelector(".bg-collage").style.display = "none";
    document.querySelector("#h1").style.display = "block";
    document.querySelector(".movieList-flex").style.visibility = "visible";

    //search movie API

    let searchResultText = document.getElementById("h1");
    let container_main = document.querySelector(".container-inside");
    container_main.style.background = "#000";
    container_main.style.filter = "none";
    searchResultText.innerHTML = `Search Results for : ${userQuery.toUpperCase()}`;
    let response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${userQuery}&page=1&include_adult=false`
    );
    parsedResponse = await response.json();

    console.log(parsedResponse);
    let movieResponse = [];
    movieResponse = parsedResponse.results;
    let MovielistFlex = document.getElementById("movieList-flex");
    let MoviesListBox = document.getElementById("ul"); //ul-element
    MoviesListBox.innerHTML = "";
    for (let i = 0; i < movieResponse.length; i++) {
      let newListItem = document.createElement("li");
      newListItem.setAttribute("class", "grid-item");
      let MoviesImageBox = document.createElement("img");
      MoviesImageBox.setAttribute("class", "img-flex");
      let MoviesTitleBox = document.createElement("span");
      MoviesTitleBox.setAttribute("class", "title");
      let MoviesRatingBox = document.createElement("span");
      MoviesRatingBox.setAttribute("class", "rating");
      if (movieResponse[i].poster_path === null) {
        MoviesImageBox.src = "th.webp";
      } else {
        MoviesImageBox.src = `${IMG_PATH}${movieResponse[i].poster_path}`;
      }
      MoviesTitleBox.innerHTML = movieResponse[i].title;
      MoviesRatingBox.innerHTML = `${movieResponse[i].vote_average} ⭐`;

      newListItem.append(MoviesImageBox);
      newListItem.append(MoviesTitleBox);
      newListItem.append(MoviesRatingBox);
      MoviesListBox.append(newListItem);
      MovielistFlex.append(MoviesListBox);

      MoviesTitleBox.addEventListener("click", () => {
        let mfdi = document.querySelector(".movie-Full-description-img");
        let descimg = document.createElement("img");
        mfdi.replaceChildren(descimg);
        descimg.setAttribute("id", "descimg");

        if (movieResponse[i].backdrop_path === null) {
          descimg.src = "th.webp";
          descimg.style.backgroundSize = "cover";
        } else {
          descimg.src = `${IMG_PATH}${movieResponse[i].backdrop_path}`;
        }

        let desctitle = document.querySelector(".movie-title");
        desctitle.innerHTML = movieResponse[i].title;
        let descyear = document.querySelector(".movie-year");
        descyear.innerHTML = movieResponse[i].release_date;
        let descdetail = document.querySelector(".movie-long-desc");
        descdetail.innerHTML = movieResponse[i].overview;
        moviedescBackground.style.visibility = "visible";
        document.querySelector(".movie-desc-container").style.visibility =
          "visible";
        document.querySelector(".movie-Full-description").style.display =
          "block";
      });
    }
    homeH1.addEventListener("click", () => {
      document.querySelector("#h1").style.display = "none";
      document.querySelector(".movie-desc-container").style.visibility =
        "hidden";
      document.querySelector(".movie-Full-description").style.display = "none";
      document.querySelector(".bg-collage").style.display = "flex";
      document.querySelector(".movieList-flex").style.visibility = "hidden";
    });
  }
}
