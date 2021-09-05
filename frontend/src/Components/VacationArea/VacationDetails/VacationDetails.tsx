import { Component } from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import VacationsModel from "../../../Models/VacationsModel";
import { userLoggedOutAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import Loader from "../../SharedArea/Loader/Loader";
import "./VacationDetails.css";


interface RouteParams {
    id: string;
}

interface VacationDetailsProps extends RouteComponentProps<RouteParams> { }


interface VacationDetailsState {
    vacations: VacationsModel[];
    id: number;
    admin: number;
    correntVacation:string;
}

class VacationDetails extends Component<VacationDetailsProps, VacationDetailsState> {

    public constructor(props: VacationDetailsProps) {
        super(props);
        this.state = { vacations: [], id: 0, admin: 0,correntVacation:"" };
    }


    public async componentDidMount() {
        try {
            const vacationId = +this.props.match.params.id;
            this.setState({correntVacation:globals.vacationsUrl+vacationId});
            const response = await jwtAxios.get<VacationsModel[]>(globals.vacationsUrl + vacationId);
            this.setState({ vacations: response.data, id: vacationId, admin: store.getState().authState.user.isAdmin });
        }
        catch (err) {
            notify.error(err);
             if(err === "Your login session has expired."){
                 store.dispatch(userLoggedOutAction());
                 this.props.history.push("/login");
             }
        }
    }

    public async componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    public deleteVacation = async () => {
        try {
            const ok = window.confirm("Are you sure?");
            if (!ok) return;
            await jwtAxios.delete(globals.vacationsUrl + this.state.id);
            notify.success(`Vacation has beeb deleted!`);
            this.props.history.push("/vacations");
        }
        catch (err) {
            notify.error("Error" + err);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="MainComponents Box VacationDetails">
                {this.state.vacations.length === 0 && <Loader />}
                {this.state.vacations.map(v =>
                    <div key={v.vacationId}>
                        <div className="BoxIcons">
                            <NavLink to="/vacations"></NavLink>
                            {this.state.admin === 1 && <NavLink to={`/vacations/edit/${v.vacationId}`}> </NavLink>}
                        </div>
                        <h2>{v.destination}</h2>
                        <div>
                            <label>From: </label>
                            <span> {v.startDate}</span>
                            <br />
                            <label>Until: </label>
                            <span> {v.endDate}</span>
                            <br />
                            <label>Price: </label>
                            <span> {v.price} $</span>
                            <p>{v.description}</p>
                            <img alt="#" src={globals.vacationsUrl + "images/" + v.img} />
                        </div>
                        {this.state.admin === 1 && <div>
                            
                            <span >  <button className="Btn"> <NavLink to={`/vacations/edit/${this.state.id}`}>Edit </NavLink></button></span>
                            <span onClick={() => this.deleteVacation()}> <button className="Btn" >Delete </button></span>
                        </div>}
                        <NavLink to="/vacations">Back to List</NavLink>
                    </div>
                )}
            </div>
        );
    }
}

export default VacationDetails;
