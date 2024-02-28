import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TicketsPage from './pages/TicketsPage';
import NewTicketPage from './pages/NewTicketPage';
import Login from "./pages/Login";
import DepartamentosPage from './pages/DepartamentosPage';
import ListOfDeptCollabs from './pages/ListOfDeptCollabs';
import AllAccountPage from './pages/AllAccountPage';
import AccountCollabPage from './pages/AccountCollabPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContex';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<TicketsPage/>}/> */}
          <Route path="/" element={<Login />} />

          <Route element={<ProtectedRoute/>}>
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/newticket" element={<NewTicketPage />} />
            <Route path="/departamentos" element={<DepartamentosPage />} />
            <Route path="/listadptocollabs" element={<ListOfDeptCollabs />} />
            <Route path="/accounts" element={<AllAccountPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<AccountCollabPage />} />
            <Route path="/ticket/:id" element={<h1>TICKET</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App