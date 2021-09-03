import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <NavLink to="/a">Home</NavLink>
            <NavLink to="/b">Vacations</NavLink>
        </div>
    );
}

export default Menu;
