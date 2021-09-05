import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { EndOfLineState } from "typescript";
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


    useEffect(() => {
        if (!store.getState().authState.user) {
            history.push("/login");
            notify.error("You are not logged in!");
            return;
        }
        if (!store.getState().authState.user.isAdmin) {
            history.push("/home");
            notify.error("You are not authorized to do add vacation!");
            return;
        }
    });

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

    async function send(vacation: VacationsModel) {
        try {
            if (!virifyDate(vacation.startDate, vacation.endDate)) {
                notify.error("wrong date");
                return;
            }
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
