import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="movie-type">
        <p>{movie.Type}</p>
      </div>

      <div>
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} 
          alt={movie.Title} 
        />
      </div>

      <div className="movie-info">
        <span>{movie.Year}</span>
        <h3>{movie.Title}</h3>
        <a href="#" className="trailer-btn">Watch Trailer</a>
      </div>
    </div>
  );
}

export default MovieCard;