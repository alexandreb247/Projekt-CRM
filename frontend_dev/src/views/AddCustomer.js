import axios from "axios";
import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: {
      street: "",
      zipCode: "",
      city: "",
    },
    nip: "",
  });

  const [submitStatus, setSubmitStatus] = useState("");

  const handleInputData = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData((data) => {
      return { ...data, [name]: target.value };
    });
  };

  const handleAddressInputData = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData((data) => {
      const dataAddress = { ...data.address, [name]: target.value };
      return { ...data, address: dataAddress };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios.post("/customer/add", formData).then((res) => {
      if (!res.data.error) {
        setSubmitStatus("Dodano kienta");
      }
    });
  };

  console.log(formData);

  return (
    <Form className="w-50" onSubmit={handleSubmit}>
      {submitStatus && <Alert variant="success">{submitStatus}</Alert>}
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Nazwa klienta</Form.Label>
        <Form.Control
          name="name"
          type="text"
          placeholder="Nazwa klienta"
          value={formData.name}
          onChange={handleInputData}
        />
      </Form.Group>
      <fieldset className="mb-3">
        <strong>Adres:</strong>
        <Form.Group className="mb-1" controlId="street">
          <Form.Label>Ulica numer</Form.Label>
          <Form.Control
            name="street"
            type="text"
            placeholder="Ulica numer"
            value={formData.address.street}
            onChange={handleAddressInputData}
          />
        </Form.Group>
        <Form.Group className="mb-1" controlId="zipCode">
          <Form.Label>Kod pocztowy</Form.Label>
          <Form.Control
            name="zipCode"
            type="text"
            placeholder="Kod pocztowy"
            value={formData.address.zipCode}
            onChange={handleAddressInputData}
          />
        </Form.Group>
        <Form.Group className="mb-1" controlId="city">
          <Form.Label>Miasto</Form.Label>
          <Form.Control
            name="city"
            type="text"
            placeholder="Miasto"
            value={formData.address.city}
            onChange={handleAddressInputData}
          />
        </Form.Group>
      </fieldset>
      <Form.Group className="mb-3" controlId="nip">
        <Form.Label>NIP</Form.Label>
        <Form.Control
          name="nip"
          type="text"
          placeholder="NIP klienta"
          value={formData.nip}
          onChange={handleInputData}
        />
      </Form.Group>
      <Button type="submit">Dodaj</Button>
    </Form>
  );
};

export default AddCustomer;