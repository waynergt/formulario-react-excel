import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import * as XLSX from 'xlsx';

function Formulario() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    favoriteSport: '',
    gender: '',
    state: '',
    isAdult: false,
    cars: {
      ford: false,
      chrysler: false,
      toyota: false,
      nissan: false
    }
  });
  const [registros, setRegistros] = useState([]); // Aquí guardamos todos los registros
  const [showSuccess, setShowSuccess] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in form.cars) {
      setForm(prev => ({
        ...prev,
        cars: {
          ...prev.cars,
          [name]: checked
        }
      }));
    } else if (type === 'checkbox') {
      setForm(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    if (formElement.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      setShowSuccess(false);
      return;
    }
    setValidated(false);
    setShowSuccess(true);

    // Agregar el registro al array de registros
    setRegistros(prev => [
      ...prev,
      {
        Nombre: form.firstName,
        Apellido: form.lastName,
        "Deporte favorito": form.favoriteSport,
        Género: form.gender,
        Estado: form.state,
        "Mayor de 21 años": form.isAdult ? "Sí" : "No",
        "Autos": Object.entries(form.cars).filter(([k,v]) => v).map(([k]) => k).join(", ")
      }
    ]);

    // Limpiar formulario
    setForm({
      firstName: '',
      lastName: '',
      favoriteSport: '',
      gender: '',
      state: '',
      isAdult: false,
      cars: {
        ford: false,
        chrysler: false,
        toyota: false,
        nissan: false
      }
    });
  };

  // Función para exportar todos los registros a Excel
  const exportarExcel = () => {
    if (registros.length === 0) {
      alert("No hay registros para exportar.");
      return;
    }
    // Crear un libro de trabajo
    const wb = XLSX.utils.book_new();
    // Crear una hoja de trabajo a partir del array de objetos
    const ws = XLSX.utils.json_to_sheet(registros);
    // Agregar la hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, "Registros");
    // Descargar el archivo
    XLSX.writeFile(wb, "registros.xlsx");
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow" style={{ background: '#23272f', borderRadius: '1rem' }}>
            <Card.Body>
              <h2 className="text-center mb-3" style={{ color: '#C7F464' }}>Actualizar Información</h2>
              <p className="text-center mb-4" style={{ color: '#bdbdbd' }}>Completa el formulario para actualizar tus datos.</p>
              {showSuccess && (
                <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                  ¡Formulario enviado con éxito!
                </Alert>
              )}
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label style={{ color: '#C7F464' }}>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    style={{ background: '#181A1B', borderColor: '#C7F464', color: 'white' }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingresa tu nombre.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label style={{ color: '#C7F464' }}>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    style={{ background: '#181A1B', borderColor: '#C7F464', color: 'white' }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingresa tu apellido.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="favoriteSport">
  <Form.Label style={{ color: '#C7F464' }}>Deporte favorito</Form.Label>
  <Form.Select
    name="favoriteSport"
    value={form.favoriteSport}
    onChange={handleChange}
    required
    style={{ background: '#181A1B', borderColor: '#C7F464', color: 'white' }}
  >
    <option value="">Selecciona...</option>
    <option value="Fútbol">Fútbol</option>
    <option value="Baloncesto">Baloncesto</option>
    <option value="Voleibol">Voleibol</option>
    <option value="Béisbol">Béisbol</option>
    <option value="Tenis">Tenis</option>
    <option value="Ciclismo">Ciclismo</option>
    <option value="Atletismo">Atletismo</option>
    <option value="Natación">Natación</option>
    <option value="Boxeo">Boxeo</option>
    <option value="Karate">Karate</option>
    <option value="Taekwondo">Taekwondo</option>
    <option value="Judo">Judo</option>
    <option value="Ajedrez">Ajedrez</option>
    <option value="Golf">Golf</option>
    <option value="Ráquetbol">Ráquetbol</option>
    <option value="Softbol">Softbol</option>
    <option value="Surf">Surf</option>
    <option value="Skateboarding">Skateboarding</option>
    <option value="Otro">Otro</option>
  </Form.Select>
  <Form.Control.Feedback type="invalid">
    Por favor selecciona un deporte.
  </Form.Control.Feedback>
</Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#C7F464' }}>Género</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Masculino"
                      name="gender"
                      value="male"
                      checked={form.gender === 'male'}
                      onChange={handleChange}
                      id="gender-male"
                      required
                      style={{ color: '#bdbdbd' }}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Femenino"
                      name="gender"
                      value="female"
                      checked={form.gender === 'female'}
                      onChange={handleChange}
                      id="gender-female"
                      required
                      style={{ color: '#bdbdbd' }}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="No seguro"
                      name="gender"
                      value="not sure"
                      checked={form.gender === 'not sure'}
                      onChange={handleChange}
                      id="gender-notsure"
                      required
                      style={{ color: '#bdbdbd' }}
                    />
                  </div>
                  <Form.Control.Feedback type="invalid">
                    Por favor selecciona tu género.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="state">
                <Form.Label style={{ color: '#C7F464' }}>Lugar de residencia</Form.Label>
                <Form.Select
                     name="state"
                      value={form.state}
                        onChange={handleChange}
                        required
                        style={{ background: '#181A1B', borderColor: '#C7F464', color: 'white' }}
                >
    <option value="">Selecciona...</option>
    <option value="Guatemala">Guatemala</option>
    <option value="Baja Verapaz">Baja Verapaz</option>
    <option value="Alta Verapaz">Alta Verapaz</option>
    <option value="Chimaltenango">Chimaltenango</option>
    <option value="Chiquimula">Chiquimula</option>
    <option value="El Progreso">El Progreso</option>
    <option value="Escuintla">Escuintla</option>
    <option value="Huehuetenango">Huehuetenango</option>
    <option value="Izabal">Izabal</option>
    <option value="Jalapa">Jalapa</option>
    <option value="Jutiapa">Jutiapa</option>
    <option value="Petén">Petén</option>
    <option value="Quetzaltenango">Quetzaltenango</option>
    <option value="Quiché">Quiché</option>
    <option value="Retalhuleu">Retalhuleu</option>
    <option value="Sacatepéquez">Sacatepéquez</option>
    <option value="San Marcos">San Marcos</option>
    <option value="Santa Rosa">Santa Rosa</option>
    <option value="Sololá">Sololá</option>
    <option value="Suchitepéquez">Suchitepéquez</option>
    <option value="Totonicapán">Totonicapán</option>
    <option value="Zacapa">Zacapa</option>
  </Form.Select>
  <Form.Control.Feedback type="invalid">
    Por favor selecciona tu lugar de residencia.
  </Form.Control.Feedback>
</Form.Group>
                <Form.Group className="mb-3" controlId="isAdult">
                  <Form.Check
                    type="checkbox"
                    label="Mayor de 21 años"
                    name="isAdult"
                    checked={form.isAdult}
                    onChange={handleChange}
                    style={{ color: '#bdbdbd' }}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label style={{ color: '#C7F464' }}>Modelos de auto que posee</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="checkbox"
                      label="Ford"
                      name="ford"
                      checked={form.cars.ford}
                      onChange={handleChange}
                      id="car-ford"
                      style={{ color: '#bdbdbd' }}
                    />
                    <Form.Check
                      inline
                      type="checkbox"
                      label="Chrysler"
                      name="chrysler"
                      checked={form.cars.chrysler}
                      onChange={handleChange}
                      id="car-chrysler"
                      style={{ color: '#bdbdbd' }}
                    />
                    <Form.Check
                      inline
                      type="checkbox"
                      label="Toyota"
                      name="toyota"
                      checked={form.cars.toyota}
                      onChange={handleChange}
                      id="car-toyota"
                      style={{ color: '#bdbdbd' }}
                    />
                    <Form.Check
                      inline
                      type="checkbox"
                      label="Nissan"
                      name="nissan"
                      checked={form.cars.nissan}
                      onChange={handleChange}
                      id="car-nissan"
                      style={{ color: '#bdbdbd' }}
                    />
                  </div>
                </Form.Group>
                <Button
                  variant="success"
                  type="submit"
                  className="w-100 mb-2"
                  style={{
                    backgroundColor: '#C7F464',
                    color: '#23272f',
                    border: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  Guardar Cambios
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  className="w-100"
                  onClick={exportarExcel}
                  style={{
                    backgroundColor: '#23272f',
                    color: '#C7F464',
                    border: `1px solid #C7F464`,
                    fontWeight: 'bold'
                  }}
                >
                  Exportar a Excel
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Formulario;