const express = require('express');
const cors = require('cors');
const moviesData = require('./movies_metadata.json');
const app = express();
app.use(cors());
app.get('/api/movies', (req, res) => {
  const simplifiedMovies = moviesData.map(movie => ({
    id: movie.id,
    title: movie.title,
    tagline: movie.tagline,
    vote_average: movie.vote_average
  }));
  res.json(simplifiedMovies);
});
// Get single movie by ID
app.get('/api/movies/:id', (req, res) => {
  const movie = moviesData.find(m => m.id == req.params.id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
