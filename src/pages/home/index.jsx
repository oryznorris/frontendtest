import { useEffect, useState, useRef } from 'react';
import './style.css';
import Trash from '../../../assets/trash.png';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://backendtest.railway.internal:3000', // Adicionando 'https://'
});


function Home() {
  const [users, setUsers] = useState([]);
  const inputTitle = useRef();
  const inputDescription = useRef();
  const inputStatus = useRef();

  async function getUsers() {
    try {
      const usersFromApi = await api.get('/usuarios');
      if (Array.isArray(usersFromApi.data)) {
        setUsers(usersFromApi.data);
      } else {
        console.error('Erro: O retorno da API não é um array', usersFromApi.data);
        setUsers([]); // Define um array vazio se os dados forem inválidos
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setUsers([]); // Garante que o estado seja sempre um array
    }
  }


  async function createTasks() {
    await api.post('/usuarios', {
      titulo: inputTitle.current.value,
      descricao: inputDescription.current.value,
      status: inputStatus.current.value,
    });
    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='container'>
      <form action="">
        <h1>Gerenciador de tarefas</h1>
        <label>Titulo:</label>
        <input name='titulo' type='text' placeholder='Escreva o titulo:' ref={inputTitle} />
        <label>Descrição:</label>
        <input name='descricao' type='text' placeholder='Escreva a descrição:' ref={inputDescription} />
        <label>Status:</label>
        <input name='status' type='text' placeholder='Defina o Status:' ref={inputStatus} />
        <button type='button' onClick={async () => createTasks()}>Cadastrar Tarefas</button>
      </form>

      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className='card'>
            <div>
              <p>Titulo: <span>{user.titulo}</span></p>
              <p>Descrição: <span>{user.descricao}</span></p>
              <p>Status: <span>{user.status}</span></p>
            </div>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash} alt="lixo" />
            </button>
          </div>
        ))
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}

    </div>


  );
}

export default Home;
