import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MovieDetails from './MovieDetails';

import './App.css';

const API_URL = 'https://www.omdbapi.com?apikey=fff8b4f8';

// Ye wahi purana logic hai jo aapne bheja tha
function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

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
              <span className="movie-type">{movie.Type}</span>
              
              {/* Image par click karne se Detail Page khulega */}
              <Link to={`/movie/${movie.imdbID}`}>
                <div className="movie-poster">
                  <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} alt={movie.Title} />
                </div>
              </Link>

              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <Link to={`/movie/${movie.imdbID}`} className="trailer-btn" style={{marginRight: '5px'}}>
                  Details
                </Link>
                <a href={`https://www.youtube.com/results?search_query=${movie.Title}+trailer`} target="_blank" rel="noreferrer" className="trailer-btn">
                  Trailer
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="empty"><h2>No movies found!</h2></div>
        )}
      </div>
    </div>
  );
}

// Final App component jo Pages ko control karega
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;