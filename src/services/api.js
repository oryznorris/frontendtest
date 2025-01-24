import axios from 'axios';

// URL da API do backend, vinda da variável de ambiente
const API_URL = import.meta.env.VITE_API_URL;

// Criação de uma instância do Axios com a URL base
const api = axios.create({
  baseURL: API_URL,
});

// Exemplo de requisição
api.get('/usuarios')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

export default api;
