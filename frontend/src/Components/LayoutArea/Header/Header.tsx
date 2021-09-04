// import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { useEffect } from "react";
import store from "../../../Redux/Store";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Logo from "../Logo/Logo";
import "./Header.css";

function Header(): JSX.Element {
    
    const refreshConnecting = () => {
        const  refresh = window.performance.navigation.type;
        const isUserConnect = store.getState().authState.user;
        if (refresh && isUserConnect) {
            store.getState().authState.vacationsSocket.connect();
        }
    }

    useEffect(() => {
        refreshConnecting();
    });    

    
    return (
        <div className="Header">
            <Logo/>
            <AuthMenu/>
			<h1>Best Vacations Website</h1>
        </div>
    );
}

export default Header;
