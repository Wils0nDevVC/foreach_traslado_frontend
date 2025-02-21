import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { Traslado } from '../interfaces/Traslado';
import axiosInstance from '../config/axiosInstance';

const TrasladoForm: React.FC = () => {

  const user = localStorage.getItem('user') || '';
  const payload = JSON.parse(user); 
  const userId = payload.id;
  console.log(userId)



  const [formData, setFormData] = useState<Traslado>({
    puntoPartida: '',
    puntoTermino: '',
    medioTransporte: '',
    fechaViaje: '',
    kilometros: 0,
    nombreTrabajador: '',
    idaVuelta: false,
    userId : userId
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let finalValue: string | number | boolean;

  
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      finalValue = e.target.checked;
    } else if (name === 'kilometros') {
      // Convierte a número si el campo es kilometros
      finalValue = Number(value);
    } else {
      finalValue = value;
    }
  
    setFormData({
      ...formData,
      [name]: finalValue,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/traslado/', formData);
      navigate('/traslados');
    } catch (error) {
      console.error('Error al guardar el traslado:', error);
    }
  };
  

  return (
    <Container>
      <h2>Registrar Traslado</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="puntoPartida">
          <Form.Label>Punto de Partida</Form.Label>
          <Form.Control
            type="text"
            name="puntoPartida"
            value={formData.puntoPartida}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="puntoTermino">
          <Form.Label>Punto de Término</Form.Label>
          <Form.Control
            type="text"
            name="puntoTermino"
            value={formData.puntoTermino}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="medioTransporte">
          <Form.Label>Medio de Transporte</Form.Label>
          <Form.Select
            name="medioTransporte"
            value={formData.medioTransporte}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un medio de transporte</option>
            <option value="Metro">Metro</option>
            <option value="Auto">Auto</option>
            <option value="Caminoneta">Caminoneta</option>
            <option value="Motocicleta">Motocicleta</option>
            <option value="Bus Transantiago">Bus Transantiago</option>
            <option value="Bus Privado">Bus Privado</option>
            <option value="Avión Nacional">Avión Nacional</option>
            <option value="Avión Internacional">Avión Internacional</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="fechaViaje">
          <Form.Label>Fecha de Viaje</Form.Label>
          <Form.Control
            type="date"
            name="fechaViaje"
            value={formData.fechaViaje}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="kilometros">
          <Form.Label>Kilómetros</Form.Label>
          <Form.Control
            type="number"
            name="kilometros"
            value={formData.kilometros}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="nombreTrabajador">
          <Form.Label>Nombre del Trabajador</Form.Label>
          <Form.Control
            type="text"
            name="nombreTrabajador"
            value={formData.nombreTrabajador}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="idaVuelta">
          <Form.Check
            type="checkbox"
            name="idaVuelta"
            label="¿Es ida y vuelta?"
            checked={formData.idaVuelta}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Guardar
        </Button>
      </Form>
    </Container>
  );
};

export default TrasladoForm;
