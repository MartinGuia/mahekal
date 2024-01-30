import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TicketsPage from './pages/TicketsPage';
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>

      <Route path='/' element={<h1>DASHBOARD</h1>}/>
      <Route path='/login' element={<Login/>}/>
        <Route path='/tickets' element={<TicketsPage/>}/>
        <Route path='/register' element={<h1>REGISTER</h1>}/>
        <Route path='/ticket/:id' element={<h1>TICKET</h1>}/>
        <Route path='/profile' element={<h1>PROFILE</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App