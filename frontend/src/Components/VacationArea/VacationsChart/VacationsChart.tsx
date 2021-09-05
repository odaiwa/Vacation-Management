import { Component } from "react";
import "./VacationsChart.css";
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';
import jwtAxios from "../../../Services/jwtAxios";
import globals from "../../../Services/Globals";
import FollowersModel from "../../../Models/FollowersModel";
import notify from "../../../Services/Notify";
import store from "../../../Redux/Store";
import { History } from "history";
import { NavLink } from "react-router-dom";
import { userLoggedOutAction } from "../../../Redux/AuthState";

interface VacationsChartProps {
    history: History;
}

interface VacationsChartState {
	following:  FollowersModel[];
    details: any;
}

class VacationsChart extends Component<VacationsChartProps, VacationsChartState> {
    public constructor(props: VacationsChartProps) {
        super(props);
        this.state = { following: [] , details: [] };
    }

    public async componentDidMount() {
        try {
            if(!store.getState().authState.user){
                this.props.history.push("/login");
                notify.error("You are not logged in!");
                return;
            }
            if(this.state.details.length === 0) {
                const responseFollowing = await jwtAxios.get<FollowersModel[]>(globals.followersUrl + "user-count"); 
                await this.setState({following: responseFollowing.data});  
            
                this.state.following.forEach(async v =>{
                    let data = {"quarter" : v.destination, "earnings": v.numberOfUsers}
                    this.state.details.push(data);
                })
                this.setState({details: this.state.details});
            }
        }
        catch(err) {
            notify.error(err);
            if(err === "Your login session has expired."){
                store.dispatch(userLoggedOutAction());
                this.props.history.push("/login");
            }
        }  
    }
    // follow-status-vacation-from-server
    public render(): JSX.Element {
        return (
            <div className="VacationsChart MainComponents ">
                <div>
                    <NavLink to="/vacations">Undo</NavLink>
                    <h2>The top popular vacations</h2>

                </div>
                <div className=" MainComponents Box">
                    <VictoryChart  domainPadding={20}>
                    <VictoryAxis
                        tickValues={[1, 2, 3, 4]}
                        // tickFormat={[...this.state.following.map(v => v.destination )]}                 
                        tickFormat={this.state.details.quarter}                 
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => (`${x}`)}
                    />
                    <VictoryBar
                        data = {this.state.details}                                                        
                        x="quarter"
                        y="earnings"
                    />
                    </VictoryChart>
                </div>
            </div>
        );
    }
}

export default VacationsChart;
