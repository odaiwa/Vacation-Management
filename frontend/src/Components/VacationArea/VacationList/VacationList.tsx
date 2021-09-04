import { Component } from "react";
import "./VacationList.css";
import { History } from "history";
import VacationsModel from "../../../Models/VacationsModel";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import { NavLink, useHistory } from "react-router-dom";
import { vacationsDownloadedAction } from "../../../Redux/VacationsState";
import jwtAxios from "../../../Services/jwtAxios";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notify";
import { userLoggedOutAction } from "../../../Redux/AuthState";
import VacationCard from "../VacationCard/VacationCard";
import NoVacationsAvailable from "../NoVacationsAvailable/NoVacationsAvailable";
import Loader from "../../SharedArea/Loader/Loader";

interface VacationListProps {
    history: History;

}

interface VacationListState {
    vacations: VacationsModel[];
    user: UserModel;
    admin: number;
    isFollow: boolean;
}

class VacationList extends Component<VacationListProps, VacationListState> {

    public async componentDidMount() {
        try {
            if (!store.getState().authState.user) {
                this.props.history.push("/login");
                notify.error("You are not logged in!");
                return;
            }

            if (this.state.vacations.length === 0) {
                // http://localhost:3001/api/vacations
                const response = await jwtAxios.get<VacationsModel[]>(globals.vacationsUrl);
                this.setState({ vacations: response.data, admin: this.state.user.isAdmin });
                store.dispatch(vacationsDownloadedAction(response.data));
            }
            else {
                this.setState({ admin: this.state.user.isAdmin });
            }


            // store.getState().authState.vacationsSocket.socket.on("added-vacation-from-server", newVacation => {
            //     const allVacations = [...this.state.vacations];
            //     allVacations.push(newVacation);
            //     this.setState({ vacations: allVacations });
            // });

            // store.getState().authState.vacationsSocket.socket.on("updated-vacation-from-server", updatedVacation => {
            //     const allVacations = [...this.state.vacations];
            //     const indexToUpdate = allVacations.findIndex(v => v.vacationId === updatedVacation.vacationId);
            //     allVacations[indexToUpdate] = updatedVacation;
            //     this.setState({ vacations: allVacations });
            // });

            // store.getState().authState.vacationsSocket.socket.on("deleted-vacation-from-server", deletedVacation => {
            //     const allVacations = [...this.state.vacations];
            //     const indexToDelete = allVacations.findIndex(v => v.vacationId === deletedVacation);
            //     allVacations.splice(indexToDelete, 1);
            //     this.setState({ vacations: allVacations });
            // });



        }
        catch (err) {
            notify.error(err);
            if (err === "Your login session has expired.") {
                this.props.history.push("/logout");
                store.dispatch(userLoggedOutAction());
                this.props.history.push("/login");
            }
        }
    }

    public constructor(props: VacationListProps) {
        super(props);
        this.state = {
            vacations: [],
            user: store.getState().authState.user,
            admin: 0,
            isFollow: false,
        };
    }

    public render(): JSX.Element {
        return (
            <div className="VacationsList" >
                <div className="VacationOptions">
                    {this.state.vacations.length === 0 && <Loader />}
                    {this.state.admin === 1 && <NavLink className="AddButton" to="/vacations/new/" >Add Vacation </NavLink>}
                    {this.state.admin === 1 && <NavLink to="/vacations-chart" >Edit</NavLink>}
                </div>
                <div>
                    <p> <b>{this.state.vacations.length} vacations currently available </b></p>
                </div>
                {this.state.vacations.map(v => <VacationCard vacation={v} admin={this.state.admin} key={v.vacationId} />)}
            </div>
        );
    }
}

export default VacationList;
