import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../../SharedArea/PageNotFound/PageNotFound";
import VacationList from "../../VacationArea/VacationList/VacationList";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Switch>
            <Route path="/home" component={Home} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/logout" component={Logout} exact />
            <Route path="/vacations" component={VacationList} exact />
            <Redirect from="/" to="/home" exact />
                {/* <Route component={PageNotFound} /> */}
            </Switch>
        </div>
    );
}

export default Routing;
