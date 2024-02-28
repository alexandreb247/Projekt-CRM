import { Routes, Route} from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Signup from "../views/Signup";
import CustomersList from "../components/CustomersList";
import SingleCustomer from "../components/SingleCustomer";
import AddCustomer from "../views/AddCustomer";
import AddAction from "../views/AddAction";

const AppRoutes = (props) => {
  return (
      <Routes>
          <Route path="/" element={<Home user={props.user}/>} />
          <Route path="/signup" element={<Signup user={props.user}/>} />
          <Route path="/login" element={<Login user={props.user} setUser={props.setUser}/>} />
          <Route path="/customer/list" element={<CustomersList allCustomers={props.allCustomers} customer={props.customer} customers={props.customers}/>} />
          <Route path="/customer/:id" element={<SingleCustomer customer={props.customer}/>} />
          <Route path="/customer/addcustomer" element={<AddCustomer allCustomers={props.allCustomers}/>} />
          <Route path="/customer/:id/add" element={<AddAction />} />
          <Route path="/customer/delete/:id" />
      </Routes>

  );
}

export default AppRoutes;