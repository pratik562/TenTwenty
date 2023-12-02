import axios from "axios";



// Define a base URL for your API
const baseURL = 'https://api.themoviedb.org/3/movie';

/* API Methods */
export const GET = "get";
export const PUT = "put";
export const POST = "post";
export const DELETE = "delete";


// Function to make API calls
export const callAPI = async (path, params) => {
  try {
    const API_KEY = '14fd4d08103e0f8f923d9f756a12a48d'; 
    const response = await axios.get(`${baseURL}/${path}`, {
      params: {
        api_key: API_KEY,
        ...params,
      },
    });

    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

