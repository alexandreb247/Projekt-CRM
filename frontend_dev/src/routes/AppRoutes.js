import { Route, Routes} from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Signup from "../views/Signup";
import CustomersList from "../components/CustomersList";
import SingleCustomer from "../components/SingleCustomer";
// import AddCustomer from "../views/CustomerForm";
import AddAction from "../views/AddAction";
import CustomerForm from "../views/CustomerForm";
// import CustomerEditForm from "../views/EditCustomer";


const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path="/" element={<Home user={props.user}/>} />
            <Route path="/signup" element={<Signup user={props.user}/>} />
            <Route path="/login" element={<Login user={props.user} setUser={props.setUser}/>} />
            <Route path="/customers/list" element={<CustomersList allCustomers={props.allCustomers} customer={props.customer} customers={props.customers}/>} />
            <Route path="/customers/:id" element={<SingleCustomer customer={props.customer}/>} />
            {/* <Route path="/customers/addcustomer" element={<AddCustomer allCustomers={props.allCustomers}/>} /> */}
             {/* <Route path="/customers/edit/:id" element={<CustomerEditForm allCustomers={props.allCustomers} customer={props.customer} customers={props.customers}/>} /> */}
                  <Route path="/customers/addcustomer" element={<CustomerForm allCustomers={props.allCustomers}/>} />
                            <Route path="/customers/edit/:id" element={<CustomerForm allCustomers={props.allCustomers} customer={props.customer} customers={props.customers}/>} />
            <Route path="/customers/delete/:id" />
            <Route path="/actions/add/:id" element={<AddAction />} />
        </Routes>

    );
}

export default AppRoutes;