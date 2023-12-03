const { callAPI } = require("./apiConstant");


// Function to fetch upcoming movies
export const fetchUpcomingMovies = async () => {
  try {
    const upcomingMovies = await callAPI('upcoming', {});
    return upcomingMovies;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
  }
};

// Function to fetch movie details by ID
export const fetchMovieDetailsById = async (movieId) => {
  try {
    const movieDetails = await callAPI(`/${movieId}`, {});
    return movieDetails;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    throw error;
  }
};
