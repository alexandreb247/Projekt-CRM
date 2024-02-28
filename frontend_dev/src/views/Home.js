import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
    return (
        <div className="home-container">
            <div className="header">Welcome to CRM</div>
            <div className="submit-container">
                <Link to="/signup"><button className="submit">Signup</button></Link>
                <Link to="/login"><button className="submit">Login</button></Link>
            </div>
        </div>
    )
}

export default Home;