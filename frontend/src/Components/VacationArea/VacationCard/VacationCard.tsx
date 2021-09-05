import { NavLink, useHistory } from "react-router-dom";
import FollowersModel from "../../../Models/FollowersModel";
import VacationsModel from "../../../Models/VacationsModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import FollowersCounter from "../../FollowsArea/FollowersCounter/FollowersCounter";
import FollowersList from "../../FollowsArea/FollowersList/FollowersList";
import "./VacationCard.css";

interface VacationCardProps {
    vacation?: VacationsModel;
    followers?: number;
    admin?: number;
}

function VacationCard(props: VacationCardProps): JSX.Element {


    const history = useHistory();
    const numberOfFollowers = async () => {
        try {
            const response = await jwtAxios.get<FollowersModel>(globals.followersUrl + "user-count");
            <FollowersCounter vacationId={props.vacation.vacationId}/>
            props.followers = +response;
        } catch (err) {
            console.log("err" + err);
        }
    }
    const deleteVacation = async () => {
        try {
            const socketVacation = store.getState().authState.vacationsSocket.socket;
            const ok = window.confirm("Are you sure?");
            if (!ok) return;
            const vacationName = props.vacation.destination;
            await jwtAxios.delete(globals.vacationsUrl + props.vacation.vacationId);
            socketVacation.emit("delete-vacation-from-client", props.vacation.vacationId);
            notify.success(`Vacation to ${vacationName} has been deleted successfully`);
            history.push("/vacations");
        }
        catch (err) {
            notify.error("Error" + err);
        }
    }



    return (
        <div className="VacationCard">
            <div>
                <div className="dataAndPhoto">

                    <div className="w3-container" key={props.vacation.vacationId}>
                        <div>
                            <header className="w3-container w3-blue">
                                <h1>{props.vacation.destination}</h1>
                            </header>

                            Followers : <FollowersCounter vacationId={props.vacation.vacationId}/>

                            <div className="w3-container">
                                <label>From: </label>
                                <span>{props.vacation.startDate}</span>
                                <br />
                                <label>Until: </label>
                                <span>{props.vacation.endDate}</span>
                                <br />
                                <label>Price: </label>
                                <span>{props.vacation.price} $</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dataAndPhoto">
                    <NavLink to={`/vacations/details/${props.vacation.vacationId}`}>
                        {<img src={globals.vacationsUrl + "images/" + props.vacation.img} />}
                    </NavLink>
                </div>

                <div className="AllIcons">
                    <div>
                        {props.admin === 1 && <div> <span><NavLink to={`/vacations/edit/${props.vacation.vacationId}`}>Edit </NavLink></span> | <span onClick={() => deleteVacation()}><NavLink to="/vacations"> Delete</NavLink> </span> </div>}
                        <NavLink to={`/vacations/details/${props.vacation.vacationId}`}> Info </NavLink>
                        {props.admin === 0 && <FollowersList uuid={store.getState().authState.user.uuid} vacationId={props.vacation.vacationId} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VacationCard;
