import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../../Auth-Area/Login/Login";
import Register from "../../Auth-Area/Register/Register";
import Home from "../../Home-Area/Home/Home";
import PageNotFound from "../../Shared-Area/PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Switch>
            <Route path="/home" component={Home} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/login" component={Login} exact />
            <Redirect from="/" to="/home" exact />
                {/* <Route component={PageNotFound} /> */}
            </Switch>
        </div>
    );
}

export default Routing;
