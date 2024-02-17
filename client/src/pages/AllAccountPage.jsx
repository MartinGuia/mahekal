import { Title } from '../components/Headers/Title';
import Nav from '../components/Nav'
import { 
    useReactTable,

 } from "@tanstack/react-table";

function AllAccountPage() {

    useReactTable({})
  return (
    <Nav>
        <Title>Cuentas</Title>
    </Nav>
  )
}

export default AllAccountPage