import { Link } from "react-router-dom";
import '../../App.css';

function Dashboard() {
    return (
      <div>
        <h1>My Dashboard</h1>
        <nav>
            <ul style={{listStyle: "none"}}>
                <li><Link to="armour">Armour page</Link></li>
                <li><Link to="equipment">Equipment page</Link></li>
            </ul>
        </nav>
      </div>
    );
  }

  export default Dashboard;