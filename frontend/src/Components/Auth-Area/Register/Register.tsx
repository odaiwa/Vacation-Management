import "./Register.css";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import globals from "../../../Services/Globals";
import axios from "axios";
import notify from "../../../Services/Notify";
import { useHistory } from "react-router";




function Register(): JSX.Element {


    const history = useHistory();

    async function submit(user: UserModel) {
        try {
            const response = await axios.post<UserModel>(globals.registerUrl, user);
            //store.dispatch(userRegisteredAction(response.data));
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


                <label>First Name:</label>
                <input type="text" autoFocus {...register("firstName", {
                    required: { value: true, message: "Missing first name." }, minLength: { value: 2, message: "First name too short." }
                })} />
                <span>{formState.errors.firstName?.message}</span>

                <label>Last Name:</label>
                <input type="text" {...register("lastName", {
                    required: { value: true, message: "Missing last name." }, minLength: { value: 2, message: "Last name too short." }
                })} />
                <span>{formState.errors.lastName?.message}</span>


                <label>username:</label>
                <input type="text" {...register("username", {
                    required: { value: true, message: "Missing username." }, minLength: { value: 4, message: "Username too short." }
                })} />
                <span>{formState.errors.username?.message}</span>


                <label>password:</label>
                <input type="password" {...register("password", {
                    required: { value: true, message: "Missing password." }, minLength: { value: 4, message: "password too short." }
                })} />
                <span>{formState.errors.password?.message}</span>
                <button>Register</button>
                {/* <NavLink to="/login"><PermIdentityIcon/> Already exist account? </NavLink> */}

            </form>

        </div>
    );
}

export default Register;
