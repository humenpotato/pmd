import axios from 'axios';

export const fetchData = async (url : any) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Optionally rethrow the error for the component to handle
  }
};
