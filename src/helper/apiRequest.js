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
