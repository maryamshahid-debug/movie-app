import React, { useState, useEffect, useRef } from 'react'; // 1. useRef zaroori hai
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
// ... baaki imports

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 2. REFERENCE BANAYEIN (Yeh div ko track karega)
  const container = useRef();

  // 3. ANIMATION LOGIC (Yahan fit hoga)
  useGSAP(() => {
    // Title Animation
    gsap.from('h1', { 
      y: -50, 
      opacity: 0, 
      duration: 1, 
      ease: 'power2.out' 
    });

    // Search Bar Animation
    gsap.from('.search', { 
      scale: 0.8, 
      opacity: 0, 
      delay: 0.5, 
      duration: 0.8 
    });

    // Movie Cards Stagger (Jab movies load ho jayen)
    if (movies.length > 0) {
      gsap.from('.movie-card', { 
        opacity: 0, 
        y: 30, 
        stagger: 0.2, 
        duration: 0.6 
      });
    }
  }, [movies]); // Movies update hone par cards animate honge

  const searchMovies = async (title) => {
    // Aapka purana fetch logic yahan hoga...
  };

  useEffect(() => {
    searchMovies('Avengers');
  }, []);

  return (
    // 4. REF KO MAIN DIV PAR LAGAYEIN
    <div className="app" ref={container}> 
      <h1>MovieZone</h1>

      <div className="search">
        <input 
          placeholder="Search for movies" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => searchMovies(searchTerm)}>Search</button>
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;