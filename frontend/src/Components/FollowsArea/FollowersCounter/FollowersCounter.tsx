import { Component } from "react";
import FollowersModel from "../../../Models/FollowersModel";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import "./FollowersCounter.css";

interface FollowersCounterProps {
	vacationId?: number;
}

interface FollowersCounterState {
	numberOfFollowers: FollowersModel[];
}

class FollowersCounter extends Component<FollowersCounterProps, FollowersCounterState> {

    public constructor(props: FollowersCounterProps) {
        super(props);
        this.state = { numberOfFollowers: [] };
    }

    public async componentDidMount() {
        try {
            const response = await jwtAxios.get<FollowersModel[]>(globals.followersUrl + "user-count");
            this.setState({ numberOfFollowers: response.data });
        }
        catch(err) {
            notify.error(err);
        }
    }

   
    public async componentWillUnmount() {
        this.setState = (state, callback)=>{
            return;
        };
    }

    public render(): JSX.Element {
        return (
            <div className="FollowersCounter">
                {this.state.numberOfFollowers.map(n => n.vacationId === this.props.vacationId &&<div className="FollowersIcon" key={n.vacationId}>{n.numberOfUsers}</div>)}
            </div>
        );
    }
}

export default FollowersCounter;
