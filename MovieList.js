import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';

function MovieList() {
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <div key={movie.id} className="movie-card">
          <Link to={`/movie/${movie.id}`}>
            <h3>{movie.title}</h3>
            <p>{movie.tagline}</p>
            <p>Rating: {movie.vote_average}/10</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

function MovieDetail({ match }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/movies/${match.params.id}`)
      .then(response => response.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
      });
  }, [match.params.id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  const releaseDate = new Date(movie.release_date).toLocaleDateString();

  return (
    <div className="movie-detail">
      <h1>{movie.title}</h1>
      <p><strong>Tagline:</strong> {movie.tagline}</p>
      <p><strong>Release Date:</strong> {releaseDate}</p>
      <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
      <p><strong>Rating:</strong> {movie.vote_average}/10</p>
      <p><strong>Overview:</strong> {movie.overview}</p>
      <Link to="/" className="back-button">Back to List</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Movie Database</h1>
        </header>
        <Routes>
          <Route path="/" exact component={MovieList} />
          <Route path="/movie/:id" component={MovieDetail} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
