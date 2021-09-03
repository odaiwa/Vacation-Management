import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import "./AuthMenu.css";

interface AuthMenuState {
    user: UserModel;
}


class AuthMenu extends Component<{}, AuthMenuState> {

    private unsubscribe: Unsubscribe;

    public constructor(props: {}) {
        super(props);
    }

    public componentDidMount(): void {
    }

    public render(): JSX.Element {
        return (
            <div className="AuthMenu">
                        <span>Hello Guest </span>
                        <span> | </span>
                        <NavLink to="/login" exact>Login</NavLink>
                        <span> | </span>
                        <NavLink to="/register" exact>Register</NavLink>
            </div>
        );
    }
}

export default AuthMenu;
