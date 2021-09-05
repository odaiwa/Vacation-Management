import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import VacationsModel from "../../../Models/VacationsModel";
import { userLoggedOutAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import "./EditVacations.css";


function EditVacations(): JSX.Element {

    let location = useLocation()
    const idParams = location.pathname.substr(location.pathname.lastIndexOf("/") + 1);

    const history = useHistory();
    const {register, handleSubmit, formState: { errors } } = useForm<VacationsModel>();
    const [vacation, setVacation] = useState<VacationsModel[]>([]);

    useEffect(()=>{
        if(!store.getState().authState.user){
            history.push("/login");
            notify.error("You are not logged in!");
            return;
        }

        jwtAxios.get<VacationsModel[]>(globals.vacationsUrl + `${idParams}`)
        .then(response => setVacation(response.data))
        .catch(err=> {
            notify.error(err);
            if(err.response.data === "Your login session has expired."){
                store.dispatch(userLoggedOutAction());
                history.push("/login");
            }
        });
    },[]);    

    async function send(vacation: VacationsModel) {
        try {
            const socketVacation = store.getState().authState.vacationsSocket.socket;
            const response = await jwtAxios.put<VacationsModel>(globals.vacationsUrl + `${idParams}`, VacationsModel.convertToFormData(vacation) );
            const updatedVacation = response.data; // The added Vacation in the backend.            

            socketVacation.emit("update-vacation-from-client", updatedVacation);
            notify.success("Vacation has been Edit.");
            history.push("/vacations"); // Go to that route!
        }
        catch (err) {
            notify.error(err);
            if(err === "Your login session has expired."){
                store.dispatch(userLoggedOutAction());
                history.push("/login");
            }
        }
    }


    return (
        <div className="EditVacations MainComponents Box">


            <div className="BoxIcons">
                <NavLink to="/vacations">Undo</NavLink>
            </div>
            {vacation.map(v => 
            <form onSubmit={handleSubmit(send)} key={v.vacationId}>
                <label>Destination:</label>
                <input type="text" defaultValue={v.destination} {...register("destination", { required: true , minLength: 2 })}/>
                {errors.destination?.type === "required" && <span>Missing destination.</span>}
                {errors.destination?.type === "minLength" && <span>destination too short.</span>}

                <label>Start Date:</label>
                <input type="date" defaultValue={v.startDate} {...register("startDate", { required: true })}  />
                {errors.startDate?.type === "required" && <span>Missing Start Date.</span>}

                <label>End Date:</label>
                <input type="date" defaultValue={v.endDate} {...register("endDate", { required: true })}  />
                {errors.endDate?.type === "required" && <span>Missing endDate.</span>}

                <label>Price:</label>
                <input type="number" defaultValue={v.price} {...register("price", { required: true , minLength: 1 })}  />
                {errors.price?.type === "required" && <span>Missing price.</span>}
                {errors.price?.type === "minLength" && <span>Price too short.</span>}

                <label>Description:</label>
                <textarea defaultValue={v.description} {...register("description", { required: true , minLength: 2 })} ></textarea>
                {errors.description?.type === "required" && <span>Missing description.</span>}
                {errors.description?.type === "minLength" && <span>Description too short.</span>}

                <label>Image: </label> 
                <input type="file" accept="image/*" {...register("img")}  />

                <button>Update</button>
            </form>
            )}

        </div>
    );
}

export default EditVacations;
