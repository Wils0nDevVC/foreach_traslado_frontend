import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import TrasladoList from './components/TrasladoList';
import TrasladoForm from './components/TrasladoForm';
import { JSX } from 'react';

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Componente para proteger rutas privadas
const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Rutas protegidas */}
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/traslados" element={<PrivateRoute element={<TrasladoList />} />} />
        <Route path="/traslados/nuevo" element={<PrivateRoute element={<TrasladoForm />} />} />
      </Routes>
    </Router>
  );
}

export default App;
