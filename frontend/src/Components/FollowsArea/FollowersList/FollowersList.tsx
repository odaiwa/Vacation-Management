import { Component } from "react";
import "./FollowersList.css";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import FollowersModel from "../../../Models/FollowersModel";
import { userLoggedOutAction } from "../../../Redux/AuthState";
import { History } from "history";
import store from "../../../Redux/Store";
import FollowersCounter from "../FollowersCounter/FollowersCounter";

interface FollowersListProps {
    uuid?: string;
	vacationId?: number;
    history?: History;
}

interface FollowersListState {
	isFollowing: boolean;
}

class FollowersList extends Component<FollowersListProps, FollowersListState> {

    public constructor(props: FollowersListProps) {
        super(props);
        this.state = { isFollowing: false };
    }

    public async componentDidMount() {
        this.handleFollow();
    }
    
    public async handleFollow() {
        try{
            // http://localhost:3001/api/follows/uuid/vacationId
            const response = await jwtAxios.get<FollowersModel>(globals.followersUrl+ this.props.uuid+ "/" +this.props.vacationId);
            const followList = response.data;
            if (followList){
                this.setState({ isFollowing: true })
            }
        }   
        catch(err){
            notify.error(err);
            if(err === "Your login session has expired."){
                store.dispatch(userLoggedOutAction());
                this.props.history.push(globals.socketUrl);
            }
        } 
    }
    public followOnVacation = async ()=> {
        await jwtAxios.post(globals.followersUrl + this.props.uuid  + "/" + this.props.vacationId );
        notify.success("started Following Vacation"); 
    }
    public unFollowOnVacation = async ()=>  {
        await jwtAxios.delete(globals.followersUrl + this.props.uuid + "/" + this.props.vacationId );
        notify.success("UnFollowing Vacation");

    }
 
    public isFollowing = async()=> {
        await this.setState({ isFollowing: !this.state.isFollowing });
        if(this.state.isFollowing){
            this.followOnVacation();
        }
        else{
            this.unFollowOnVacation();
            localStorage.clear();
        }
    }


    public render(): JSX.Element {
        return (
            <div className="FollowersList">
                <div onClick={this.isFollowing}>
                <footer className="w3-container w3-blue">
                    {this.state.isFollowing === false && <button className="FollowButton">Follow</button>}
                    {this.state.isFollowing === true && <button className="FollowButton">UnFollow</button>}
                            </footer>
                </div>
            </div>
        );
    }
}

export default FollowersList;
