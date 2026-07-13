import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
        </Route>
        <Route element = {<ProtectedRoute/>}>
           <Route path="/app" element={<DashboardLayout/>}>
              <Route index element={<Navigate to="dashboard" replace/>}/>
              <Route path="dashboard" element={<DashboardPage/>}/>
            </Route>
        </Route>
      </Routes>
  );
}

export default App;