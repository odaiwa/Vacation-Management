import "./Register.css";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import globals from "../../../Services/Globals";
import axios from "axios";
import notify from "../../../Services/Notify";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import store from "../../../Redux/Store";
import { userRegisteredAction } from "../../../Redux/AuthState";
import { useEffect } from "react";




function Register(): JSX.Element {

    useEffect(()=>{
        if(store.getState().authState.user){
            history.push("/home");
            notify.error("You are already logged in!");
            return;
        }

    });    
    const history = useHistory();

    async function submit(user: UserModel) {
        try {
            const response = await axios.post<UserModel>(globals.registerUrl, user);
            store.dispatch(userRegisteredAction(response.data));
            notify.success("You have been successfully registered.");
            history.push("/home");
        }
        catch (err) {
            notify.error(err);
        }
    }

    const { register, handleSubmit, formState } = useForm<UserModel>();

    return (
        <div className="Register">
            <h2>Register Form</h2>
            <form onSubmit={handleSubmit(submit)}>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" autoFocus {...register("firstName", {
                        required: { value: true, message: "Missing first name." }, minLength: { value: 2, message: "First name too short." }
                    })} />
                </div>
                <span>{formState.errors.firstName?.message}</span>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" {...register("lastName", {
                        required: { value: true, message: "Missing last name." }, minLength: { value: 2, message: "Last name too short." }
                    })} />
                </div>
                <span>{formState.errors.lastName?.message}</span>


                <div className="form-group">
                    <label>username:</label>
                    <input type="text" className="form-control" placeholder="username" {...register("username", {
                        required: { value: true, message: "Missing username." }, minLength: { value: 4, message: "Username too short." }
                    })} />
                </div>
                <span>{formState.errors.username?.message}</span>


                <div className="form-group">
                    <label>password:</label>
                    <input type="password" className="form-control" placeholder="password" {...register("password", {
                        required: { value: true, message: "Missing password." }, minLength: { value: 4, message: "password too short." }
                    })} />
                </div>
                <span>{formState.errors.password?.message}</span>
                <button className="btn btn-primary btn-block">Register</button>
                {/* <NavLink to="/login"><PermIdentityIcon/> Already exist account? </NavLink> */}
                <p className="forgot-password text-right">
                    Already registered <NavLink to="/login">sign in?</NavLink>
                </p>

            </form>
        </div>
    );
}

export default Register;
