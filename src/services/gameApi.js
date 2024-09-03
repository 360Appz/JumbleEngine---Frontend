import axios from 'axios';
import { API_ROUTES } from './apiRoutes.';

export const gameApiService = {
  newGame: async () => {
    try {
      const response = await axios.get(API_ROUTES.NEW_GAME);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  submitGuess: async (id, word) => {
    try {
      const response = await axios.post(API_ROUTES.GUESS, { id, word });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};