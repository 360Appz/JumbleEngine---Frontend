const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export const API_ROUTES = {
  NEW_GAME: `${API_BASE_URL}/api/game/new`,
  GUESS: `${API_BASE_URL}/api/game/guess`
};