const axios = require('axios');

const baseURL = 'https://api.pokemontcg.io/v2/';

const http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Pragma: 'no-cache',
    'X-Api-Key': '6176e681-1212-4605-8413-6fff561fce6e',
  },
});

export { http };
