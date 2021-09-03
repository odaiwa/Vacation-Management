import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import notify from "../../../Services/Notify";
import UserModel from "../../../Models/UserModel";
import CredentialsModel from "../../../Models/CredentialsModel";
import globals from "../../../Services/Globals";
import axios from "axios";
import "./Login.css";
import { useForm } from "react-hook-form";

function Login(): JSX.Element {

    const history = useHistory();
    const { register, handleSubmit, formState } = useForm<CredentialsModel>();

    async function submit(credentials: CredentialsModel) {
        try {
            const response = await axios.post<UserModel>(globals.loginUrl, credentials);
            //store.dispatch(userLoggedInAction(response.data));
            notify.success("Logged-in successfully.");
            history.push("/home");
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Login">


            <h2> Login</h2>
            <form onSubmit={handleSubmit(submit)}>

                <div>
                    <label>Username:</label>
                    <input type="text" autoFocus {...register("username", {
                        required: { value: true, message: "Missing username." }, minLength: { value: 4, message: "Username too short." }
                    })} />
                    <span>{formState.errors.username?.message}</span>
                </div>

                <div>
                    <label>Password:</label>
                    <input type="password"{...register("password", {
                        required: { value: true, message: "Missing password." }, minLength: { value: 4, message: "password too short." }
                    })} />
                    <span>{formState.errors.password?.message}</span>
                </div>
                
                <button>Log in</button>
                <NavLink to="/register">New Account </NavLink>

            </form>
        </div>
    );
}

export default Login;
