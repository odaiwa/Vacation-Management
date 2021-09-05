import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import notify from "../../../Services/Notify";
import UserModel from "../../../Models/UserModel";
import CredentialsModel from "../../../Models/CredentialsModel";
import globals from "../../../Services/Globals";
import axios from "axios";
import store from "../../../Redux/Store";
import "./Login.css";
import { useForm } from "react-hook-form";
import { userLoggedInAction } from "../../../Redux/AuthState";
import { useEffect } from "react";

function Login(): JSX.Element {

    useEffect(()=>{
        if(store.getState().authState.user){
            history.push("/home");
            notify.error("You are already logged in!");
            return;
        }

    });    

    const history = useHistory();
    const { register, handleSubmit, formState } = useForm<CredentialsModel>();

    async function submit(credentials: CredentialsModel) {
        try {
            const response = await axios.post<UserModel>(globals.loginUrl, credentials);
            store.dispatch(userLoggedInAction(response.data));
            notify.success(`${credentials.username} LoggedIn successfully`)
            history.push("/home");
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(submit)}>
                <h2>Sign In</h2>

                <div className="form-group">
                    <label>Username :</label>
                    <input type="text" className="form-control" placeholder="Enter username" autoFocus {...register("username", {
                        required: { value: true, message: "Missing username." }, minLength: { value: 4, message: "Username too short." }
                    })} />
                </div>
                <span>{formState.errors.username?.message}</span>

                <div className="form-group">
                    <label>Password :</label>
                    <input type="password" className="form-control" placeholder="Enter password" {...register("password", {
                        required: { value: true, message: "Missing password." }, minLength: { value: 6, message: "password too short." }
                    })} />
                </div>
                <span>{formState.errors.password?.message}</span>


                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    <NavLink to="/register">New Account </NavLink>
                </p>
            </form>

        </div>
    );
}

export default Login;
