import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
        </Route>
        <Route element={<DashboardLayout/>}>
          <Route path="/dashboard" element={<DashboardPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;