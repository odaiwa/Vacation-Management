import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import VacationsModel from "../../../Models/VacationsModel";
import { userLoggedOutAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const history = useHistory();
    const { register, handleSubmit, formState } = useForm<VacationsModel>();

    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState();

    const saveFile = (e:any) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    useEffect(() => {
        if (!store.getState().authState.user) {
            history.push("/login");
            notify.error("You are not logged in!");
            return;
        }
    });


    async function send(vacation: VacationsModel) {
        try {
            const socketVacation = store.getState().authState.vacationsSocket.socket;            
            const response = await jwtAxios.post<VacationsModel>(globals.vacationsUrl, VacationsModel.convertToFormData(vacation));
            const addedVacation = response.data;
            socketVacation.emit("add-vacation-from-client", addedVacation);
            notify.success("Vacation has been added.");
            history.push("/vacations");
        }
        catch (err) {
            notify.error(err);
            if (err === "Your login session has expired.") {
                store.dispatch(userLoggedOutAction());
                history.push("/login");
            }
        }
    }

    return (
        <div className="AddVacation">
            <form onSubmit={handleSubmit(send)}>
                <div className="form-group">

                    <label>Destination</label>
                    <input type="text"  {...register("destination",
                        { required: true, minLength: 2 })} className="form-control" placeholder="destination" autoFocus />
                </div>
                {formState.errors.destination?.type === "required" && <span>Missing destination.</span>}
                {formState.errors.destination?.type === "minLength" && <span>destination too short.</span>}

                <div className="form-group">

                    <label>Start Date:</label>
                    <input type="date" className="form-control" {...register("startDate", { required: true })} placeholder="Start Date" />
                </div>
                {formState.errors.startDate?.type === "required" && <span>Missing Start Date.</span>}

                <div className="form-group">
                    <label>End Date:</label>
                    <input type="date" className="form-control"{...register("endDate", { required: true })} placeholder="End Date" />
                </div>
                {formState.errors.endDate?.type === "required" && <span>Missing endDate.</span>}

                <div className="form-group">
                    <label>Price: </label>
                    <input type="number" className="form-control" {...register("price", { required: true, minLength: 1, min: 0 })} placeholder="price" />
                </div>
                {formState.errors.price?.type === "required" && <span>Missing price.</span>}
                {formState.errors.price?.type === "minLength" && <span>Price too short.</span>}
                {formState.errors.price?.type === "min" && <span>price cannot be negative.</span>}


                <div className="form-group">
                    <label>Description: </label><br />
                    <textarea {...register("description", { required: true, minLength: 2 })} placeholder="description" />
                </div>
                {formState.errors.description?.type === "required" && <span>Missing description.</span>}
                {formState.errors.description?.type === "minLength" && <span>description too short.</span>}
                <br />

                <div className="form-group">
                    <label>Image: </label> <br />
                    <input type="file" accept="image/*" {...register("img", { required: true })} />
                </div>
                {formState.errors.img?.type === "required" && <span>Missing image.</span>}
                <button>Add</button>

                <p className="forgot-password text-right">
                    <NavLink to="/vacations">Don't want to Add? Back to List </NavLink>
                </p>
            </form>

        </div>
    );
}

export default AddVacation;
