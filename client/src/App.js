import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TicketsPage from './pages/TicketsPage';
import NewTicketPage from './pages/NewTicketPage';
import Login from "./pages/Login";
import DepartamentosPage from './pages/DepartamentosPage';
import ListOfDeptCollabs from './pages/ListOfDeptCollabs';
import AllAccountPage from './pages/AllAccountPage';
import AccountCollabPage from './pages/AccountCollabPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<TicketsPage/>}/>
        <Route path='/login' element={<Login/>}/>
        {/* <Route path='/tickets' element={<TicketsPage/>}/> */}
        <Route path='/newticket' element={<NewTicketPage/>}/>
        <Route path='/departamentos' element={<DepartamentosPage/>}/>
        <Route path='/listadptocollabs' element={<ListOfDeptCollabs/>}/>
        <Route path='/allaccounts' element={<AllAccountPage/>}/>
        <Route path='/account' element={<AccountCollabPage/>}/>
        <Route path='/register' element={<h1>REGISTER</h1>}/>
        <Route path='/ticket/:id' element={<h1>TICKET</h1>}/>
        <Route path='/profile' element={<h1>PROFILE</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App