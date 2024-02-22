import { Title } from '../components/Headers/Title';
import Nav from '../components/Nav'
import { 
    useReactTable,

 } from "@tanstack/react-table";

function AllAccountPage() {

//   const [options, setOptions] = useState([]);
//   // const [selectedOption, setSelectedOption] = useState('');

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/departments');
//        //Mapear los datos recibidos para crear un nuevo array con el formato adecuado
//         response.data.map(option => ({
//           value: option.value,
//           label: option.name // Utilizar el valor 'name' como label en las opciones
//         }));
//       setOptions(response.data); // Establecer las opciones obtenidas del backend
//     } catch (error) {
//       console.error('Error al obtener opciones:', error);
//     }
//   };
//   fetchData(); // Llamar a la función para obtener las opciones al montar el componente
// }, []);
    useReactTable({})
  return (
    <Nav>
        <Title>Cuentas</Title>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Departamento</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {}
            </tr>
          </tbody>
        </table>
    </Nav>
  )
}

export default AllAccountPage