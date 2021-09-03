import "./Loader.css";
import loading from "../../../assets/imgs/loader.gif";

function Loader(): JSX.Element {
    return (
        <div className="Loader">
            <img src={loading} />

        </div>
    );
}

export default Loader;
