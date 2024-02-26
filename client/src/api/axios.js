import axios from 'axios'

//*Es para decirle a axios el dominio base al cual podra consultar 
const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    //*Es para establecer las cookies aqui
    withCredentials: true
});

export default instance;