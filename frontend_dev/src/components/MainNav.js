import './MainNav.css'
import { useNavigate, Link } from 'react-router-dom';


const AppNav = (props) => {

    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault();
        
                    props.setUser(null);
                    localStorage.setItem('user', null);
                    navigate("/");
                }

    return (
        <nav className="mainNav">
            <ul>
                {props.user && (<li>
                    <Link to="/customers/list" >Klienci</Link>
                </li>)}
                {props.user && 
                (<li>
                    <Link to="/" onClick={handleLogout}>Wyloguj</Link>
                </li>)}
            </ul>
        </nav>
    );
}
export default AppNav;