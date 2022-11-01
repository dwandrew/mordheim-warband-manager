import { Link } from "react-router-dom";

function Dashboard() {
    return (
      <div>
        <h1>My Dashboard</h1>
        <nav>
          <Link to="armour">Armour page</Link>
        </nav>
      </div>
    );
  }

  export default Dashboard;