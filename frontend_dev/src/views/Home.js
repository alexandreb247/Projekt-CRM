import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

import { Link } from "react-router-dom";

const Home = () => {
  const [customers, setCustomers] = useState([]);

  const getCustomers = () => {
    axios.get("/customer/all").then((res) => {
      setCustomers(res.data);
    });
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div className="customers">
      <h2>Klienci:</h2>
      <div className="customersList mb-3">
        {customers.map((customer) => {
          return (
            <Card key={customer._id}>
              <Card.Body>
                <Card.Title>{customer.name}</Card.Title>

                <strong>Adres</strong>
                <address>
                  {customer.address.street} <br />
                  {customer.address.zipCode} <br />
                  {customer.address.city} <br />
                </address>

                <Card.Text>NIP: {customer.nip}</Card.Text>
                <Button
                  as={Link}
                  to={`/crm-front/customer/${customer._id}`}
                  variant="primary"
                >
                  Szczegóły
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <Button variant="success" as={Link} to="/crm-front/add-customer">
        Dodaj klienta
      </Button>
    </div>
  );
};

export default Home;