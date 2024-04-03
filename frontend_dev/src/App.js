import { useEffect, useState } from 'react';
import './App.css';
import MainNav from './components/MainNav';
import AppRoutes from './routes/AppRoutes';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  axios.defaults.headers.common['Authorization'] = "Bearer " + (user ? user.jwt_token : "");

  const [customers, setCustomers] = useState([]);

    const allCustomers = () => {

        axios
            .get("http://localhost:5000/customers/list")
            .then((res) => {
                setCustomers(res.data)
            })
            .catch((err) => {
                console.error(err);
            })

    };

    useEffect(() => {
      allCustomers();
  }, [])


  return (
    <div className="App">
      <MainNav user={user} setUser={setUser}/>
      <AppRoutes allCustomers={allCustomers} customers={customers} setUser={setUser} user={user}/>
    </div>
  );
}

export default App;


 