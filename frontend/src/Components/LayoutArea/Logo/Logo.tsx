import "./Logo.css";
import logoImg from "../../../assets/imgs/vacation_icon.png"
function Logo(): JSX.Element {
    return (
        <div className="Logo">
                <img src={logoImg} />
        </div>
    );
}

export default Logo;
