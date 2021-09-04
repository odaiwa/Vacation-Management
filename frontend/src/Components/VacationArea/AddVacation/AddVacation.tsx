import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import VacationsModel from "../../../Models/VacationsModel";
import { userLoggedOutAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm<VacationsModel>();
    useEffect(() => {
        if (!store.getState().authState.user) {
            history.push("/login");
            notify.error("You are not logged in!");
            return;
        }
    });



    async function submit(vacation: VacationsModel) {
        try {
            // const socketVacation = store.getState().authState.vacationsSocket.socket;            
            const response = await jwtAxios.post<VacationsModel>(globals.vacationsUrl, VacationsModel.convertToFormData(vacation));
            const addedVacation = response.data;
            // socketVacation.emit("added-vacation-from-client", addedVacation);
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
            <form onSubmit={handleSubmit(submit)}>
                <label>Destination</label>
                <input type="text" {...register("destination", { required: true, minLength: 2 })} placeholder="destination" />
                {errors.destination?.type === "required" && <span>Missing destination.</span>}
                {errors.destination?.type === "minLength" && <span>destination too short.</span>}

                <label>Start Date:</label>
                <input type="date" {...register("startDate", { required: true })} placeholder="StartDate" />
                {errors.startDate?.type === "required" && <span>Missing Start Date.</span>}

                <label>End Date:</label>
                <input type="date" {...register("endDate", { required: true })} placeholder="End Date" />
                {errors.endDate?.type === "required" && <span>Missing endDate.</span>}

                <input type="number" {...register("price", { required: true, minLength: 1 })} placeholder="price" />
                {errors.price?.type === "required" && <span>Missing price.</span>}
                {errors.price?.type === "minLength" && <span>Price too short.</span>}

                <textarea {...register("description", { required: true, minLength: 2 })} placeholder="description" />
                {errors.description?.type === "required" && <span>Missing description.</span>}
                {errors.description?.type === "minLength" && <span>description too short.</span>}

                <label>Image: </label> <br />
                <input type="file" accept="image/*" {...register("img", { required: true })} />
                {errors.img?.type === "required" && <span>Missing image.</span>}
                <button>Add</button>
            </form>
        </div>
    );
}

export default AddVacation;
