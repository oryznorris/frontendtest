import axios from 'axios';

// URL da API do backend, vinda da variável de ambiente
const API_URL = import.meta.env.VITE_API_URL;

// Criação de uma instância do Axios com a URL base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


// Exemplo de requisição
api.get('/usuarios')
  .then(response => {
    const data = response.data;
    if (Array.isArray(data)) {
      console.log("Dados recebidos:", data);
    } else {
      console.error("A resposta não é um array:", data);
    }
  })
  .catch(error => {
    console.error("Erro na requisição:", error);
  });

export default api;
