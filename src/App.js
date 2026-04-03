import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://www.omdbapi.com?apikey=fff8b4f8';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  // Function to fetch movies from API
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  // Initial load when app opens
  useEffect(() => {
    searchMovies('Avengers');
  }, []);

  return (
    <div className="app">
      <h1>MovieZone</h1>

      <div className="search">
        <input 
          placeholder="🔍 Search for movies..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchMovies(searchTerm)}
        />
        <button onClick={() => searchMovies(searchTerm)}>Search</button>
      </div>

      <div className="container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div className="movie-card" key={movie.imdbID}>
              {/* Type Badge (Movie/Series) */}
              <span className="movie-type">{movie.Type}</span>
              
              <div className="movie-poster">
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} 
                  alt={movie.Title} 
                />
              </div>

              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                {/* Watch Trailer Link */}
                <a 
                  href={`https://www.youtube.com/results?search_query=${movie.Title}+trailer`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="trailer-btn"
                >
                  Watch Trailer
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="empty">
            <h2>No movies found. Try another name!</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;