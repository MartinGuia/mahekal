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
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import { CollabsProvider } from './context/UsersContext';
import { TicketProvider } from './context/TicketsContext';
import ViewTicket from './pages/ViewTicket';

function App() {
  return (
    <AuthProvider>
      <CollabsProvider>
        <TicketProvider>
          <BrowserRouter>
            <Routes>
              {/* <Route path='/' element={<TicketsPage/>}/> */}
              <Route path="/" element={<Login />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/tickets" element={<TicketsPage />} />
                <Route path="/newticket" element={<NewTicketPage />} />
                <Route path="/departamentos" element={<DepartamentosPage />} />
                <Route path="/ticket/:id" element={<ViewTicket/>} />
                <Route
                  path="/listadptocollabs"
                  element={<ListOfDeptCollabs />}
                />
                <Route path="/accounts" element={<AllAccountPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<AccountCollabPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TicketProvider>
      </CollabsProvider>
    </AuthProvider>
  );
}

export default App