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

    const location = useLocation();
    const id = location.pathname.substr(location.pathname.lastIndexOf("/") + 1);

    const history = useHistory();
    const {register, handleSubmit, formState: { errors } } = useForm<VacationsModel>();
    const [vacation, setVacation] = useState<VacationsModel[]>([]);

    function virifyDate(start: string, end: string): boolean {
        const currentDate = new Date();

        const startDate = start.split("-");
        const endDate = end.split("-");

        const currentDateStruct = {
            year: +currentDate.getFullYear(),
            month: +currentDate.getMonth() + 1,
            day: +currentDate.getDate()
        }
        const startDateParsed = {
            year: +startDate[0],
            month: +startDate[1],
            day: +startDate[2]
        }
        const endDateParsed = {
            year: +endDate[0],
            month: +endDate[1],
            day: +endDate[2]
        }
        if (startDateParsed.year < currentDateStruct.year) {
            return false;
        } else if (startDateParsed.year === currentDateStruct.year) {
            if (startDateParsed.month < currentDateStruct.month) {
                return false;
            } else if (startDateParsed.month === currentDateStruct.month) {
                if (startDateParsed.day < currentDateStruct.day) {
                    return false;
                }
            }
        }

        if (startDateParsed.year > endDateParsed.year) {
            return false;
        } else if (startDateParsed.year === endDateParsed.year) {
            if (startDateParsed.month > endDateParsed.month) {
                return false;
            } else if (startDateParsed.month === endDateParsed.month) {
                if (startDateParsed.day > endDateParsed.day) {
                    return false;
                }
            }
        }
        return true;
    }

    useEffect(()=>{
        if(!store.getState().authState.user){
            history.push("/login");
            notify.error("You are not logged in!");
            return;
        }
        if(!store.getState().authState.user.isAdmin){
            history.push("/home");
            notify.error("You are not authorized to do edit vacation!");
            return;
        }

        jwtAxios.get<VacationsModel[]>(globals.vacationsUrl + `${id}`)
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
            if (!virifyDate(vacation.startDate, vacation.endDate)) {
                notify.error("wrong date");
                return;
            }
            const socketVacation = store.getState().authState.vacationsSocket.socket;
            const response = await jwtAxios.put<VacationsModel>(globals.vacationsUrl + `${id}`, VacationsModel.convertToFormData(vacation) );
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
