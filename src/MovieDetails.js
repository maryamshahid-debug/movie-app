import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = 'https://www.omdbapi.com?apikey=fff8b4f8';

function MovieDetails() {
  const { id } = useParams(); // Ye URL se imdbID nikal lega
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`${API_URL}&i=${id}&plot=full`);
      const data = await response.json();
      setMovie(data);
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div className="app"><h2 style={{color: 'white'}}>Loading...</h2></div>;

  return (
    <div className="app" style={{ padding: '2rem' }}>
      <Link to="/" className="trailer-btn" style={{ marginBottom: '2rem', display: 'inline-block', background: '#f9d342', color: '#000' }}>
        Go Back
      </Link>
      
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center', alignItems: 'flex-start' }}>
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} 
          alt={movie.Title} 
          style={{ borderRadius: '20px', width: '300px', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}
        />
        
        <div style={{ maxWidth: '600px', textAlign: 'left' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{movie.Title}</h1>
          <p style={{ color: '#f9d342', fontSize: '1.2rem' }}>⭐ {movie.imdbRating} | {movie.Runtime} | {movie.Genre}</p>
          
          <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
            <h3 style={{ color: '#ff6b6b' }}>Plot</h3>
            <p style={{ lineHeight: '1.8' }}>{movie.Plot}</p>
          </div>

          <div style={{ marginTop: '20px' }}>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;