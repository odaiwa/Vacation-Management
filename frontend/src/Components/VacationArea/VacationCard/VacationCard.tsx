import { NavLink, useHistory } from "react-router-dom";
import VacationsModel from "../../../Models/VacationsModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import "./VacationCard.css";

interface VacationCardProps {
    vacation?: VacationsModel;
    admin?: number;
}

function VacationCard(props: VacationCardProps): JSX.Element {


    const history = useHistory();

    const deleteVacation = async () =>  {
        try {
            // const socketVacation = store.getState().authState.vacationsSocket.socket;
            const ok = window.confirm("Are you sure?");
            if (!ok) return;
            await jwtAxios.delete(globals.vacationsUrl + props.vacation.vacationId);
            // socketVacation.emit("deleted-vacation-from-client", props.vacation.vacationId);
            notify.success(`Vacation has been deleted!`);
            history.push("/vacations");
        }
        catch (err) {
            notify.error("Error" + err);
        }
    } 



    return (
        <div className="VacationCard">
			        <div className="VacationCard">
            <div className="Box" key={props.vacation.vacationId}> 
                <h2>{props.vacation.destination}</h2>
                <div>
                    {/* <FollowersCounter vacationId={props.vacation.vacationId}/> */}
                    <label>From: </label>
                    <span>{props.vacation.startDate}</span>
                    <br/>
                    <label>Until: </label>
                    <span>{props.vacation.endDate}</span>
                    <br/>
                    <label>Price: </label>
                    <span>{props.vacation.price} $</span>
                    
                    <NavLink to={`/vacations/details/${props.vacation.vacationId}`}>
                        {<img src={globals.vacationsUrl + "images/" + props.vacation.img} />}
                    </NavLink>
                    <div  className="AllIcons">
                        <div>
                            {props.admin === 1 && <NavLink to={`/vacations/edit/${props.vacation.vacationId}`}>Edit </NavLink>}
                            {props.admin === 1 && <div>Delete</div>}
                            <NavLink to={`/vacations/details/${props.vacation.vacationId}`}> Info </NavLink>
                            {/* {props.admin === 0 && <FollowersList uuid={store.getState().authState.user.uuid} vacationId={props.vacation.vacationId} />} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default VacationCard;
