import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Container className="text-center mt-5">
      <h1>Bienvenido a la Herramienta de Huella de Carbono</h1>
      <p>Registra y calcula la huella de carbono de los traslados de los trabajadores.</p>
      <Link to="/traslados">
        <Button variant="primary">Ver Traslados</Button>
      </Link>
    </Container>
  );
};

export default Home;
