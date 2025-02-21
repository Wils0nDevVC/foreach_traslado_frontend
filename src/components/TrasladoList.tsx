import React, { useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Traslado } from '../interfaces/Traslado';
import { useTrasladoStore } from '../sotore/useTrasladoStore';
import { Link } from 'react-router-dom';

const TrasladoList: React.FC = () => {
  const { traslados, fetchTraslados, huellaCarbonoTotal, removeTraslado } = useTrasladoStore();

  useEffect(() => {
    fetchTraslados();
  }, [fetchTraslados]);

  const handleDelete = (id: number) => {
    removeTraslado(id);
  };

  return (
    <Container>
      <h2>Listado de Traslados</h2>

      <Link to="/traslados/nuevo" className="btn btn-primary mb-3">
        Registrar Nuevo Traslado
      </Link>

      <h4>Huella de Carbono Total: {huellaCarbonoTotal ? huellaCarbonoTotal.toFixed(2) : 'Cargando...'} kg CO₂</h4>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Punto de Partida</th>
            <th>Punto de Término</th>
            <th>Medio de Transporte</th>
            <th>Fecha de Viaje</th>
            <th>Kilómetros</th>
            <th>Trabajador</th>
            <th>Ida y Vuelta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {traslados.map((traslado : Traslado) => (
            <tr key={traslado.id}>
              <td>{traslado.id}</td>
              <td>{traslado.puntoPartida}</td>
              <td>{traslado.puntoTermino}</td>
              <td>{traslado.medioTransporte}</td>
              <td>{traslado.fechaViaje}</td>
              <td>{traslado.kilometros}</td>
              <td>{traslado.nombreTrabajador}</td>
              <td>{traslado.idaVuelta ? 'Sí' : 'No'}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(traslado.id!)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TrasladoList;
