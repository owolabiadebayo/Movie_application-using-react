import React, { useEffect, useState } from "react";
import Movie from "./component/Movies";

// ec1701b1dbecda1cc91ed04b31a789ce514864d9
const FEATURED_API =
  "https://api.themoviedb.org/3/movie/popular?api_key=e966d1c585f0ca3f4fc8e3d2f422cfae&language=en-US&page=1&region=NG";
const Search_Api =
  "https://api.themoviedb.org/3/search/movie?api_key=e966d1c585f0ca3f4fc8e3d2f422cfae&language=en-US&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  console.log(movies);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    
    if (searchTerm) {
      getMovies(Search_Api + searchTerm)

      setSearchTerm("");
    }
  };
  console.log(searchTerm);

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
      <h3>NETFLIX</h3>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            placeholder="search..."
            className="search"
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie_container">
        {movies.length > 0 &&  movies.map((movie) => <Movie key={movie.id} {...movie}/>)}
      </div>
    </>
  );
}

export default App;
