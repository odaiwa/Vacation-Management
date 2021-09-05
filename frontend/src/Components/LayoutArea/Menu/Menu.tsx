import { NavLink, useHistory } from "react-router-dom";
import "./Menu.css";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notify";


function Menu(): JSX.Element {

    const history = useHistory();

    return (
        <div className="Menu">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/vacations">Vacations</NavLink>
        </div>
    );
}

export default Menu;
