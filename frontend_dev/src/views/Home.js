import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import './Home.css'

const Home = () => {
    return (
        <div className="home-container">
            <div className="header">CRM</div>
            <div className="submit-container">
                <Button as={Link} to="/signup" className="submit">Signup</Button>
                    <br></br>
                <Button as={Link} to="/login" className="submit">Login</Button>
            </div>
        </div>
    )
}

export default Home;