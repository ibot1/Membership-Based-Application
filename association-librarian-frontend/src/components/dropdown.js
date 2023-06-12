import { NavLink } from "react-router-dom";
import dropDownStyles from "./styles/dropdown.module.css";

export default function Dropdown(props) {
    const firstOption = props.options[0];
    const lastOption = props.options[props.options.length - 1];

    return (
        <div style={props.styles}>
            <div style={{
                position: "relative",
                left: "1vw",
                display: "block", borderLeft: "0.5vw solid transparent",
                borderRight: "0.5vw solid transparent", borderBottom: "0.4vw solid #90ee90",
                width: "fit-content"
            }} />

            <div className={dropDownStyles.contentHolder}>
                {props.options.map(option => <NavLink key={option.title} to={option.linkTo}>{option.title}</NavLink>)}
            </div>
        </div>
    );
}