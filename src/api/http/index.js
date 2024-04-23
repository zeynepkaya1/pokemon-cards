const axios = require('axios');

const baseURL = 'https://api.pokemontcg.io/v2/';

const http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Pragma: 'no-cache',
    'X-Api-Key': '849a90a9-0e5f-482c-a286-b695b86c646e',
  },
});

export { http };
