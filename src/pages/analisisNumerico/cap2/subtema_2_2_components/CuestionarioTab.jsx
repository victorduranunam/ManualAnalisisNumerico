import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";

const CuestionarioTab = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isCorrect = selectedOption === "a";

  return (
    <div>
      <h5 className="text-primary fw-bold mb-3">
        <i className="bi bi-question-circle me-2"></i>Cuestionario del subcapítulo 2.2
      </h5>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">1. Pregunta del subcapítulo</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  id="q1-a"
                  name="q1"
                  label="Opción A"
                  onChange={() => { setSelectedOption("a"); setSubmitted(false); }}
                />
                <Form.Check
                  type="radio"
                  id="q1-b"
                  name="q1"
                  label="Opción B"
                  onChange={() => { setSelectedOption("b"); setSubmitted(false); }}
                />
                <Form.Check
                  type="radio"
                  id="q1-c"
                  name="q1"
                  label="Opción C"
                  onChange={() => { setSelectedOption("c"); setSubmitted(false); }}
                />
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!selectedOption}>
              Validar respuesta
            </Button>
          </Form>

          {submitted && (
            <Alert variant={isCorrect ? "success" : "danger"} className="mt-3 mb-0">
              {isCorrect ? "Respuesta correcta. Aquí se coloca la retroalimentación final de la pregunta." : "Respuesta incorrecta. Aquí va la explicación del tema."}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CuestionarioTab;