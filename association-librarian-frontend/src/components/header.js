import AboutUsIcon from "../icons/aboutus";
import MembershipIcon from "../icons/membership";
import CharityIcon from "../icons/charity";
import LoginIcon from "../icons/login";
import SearchIcon from "../icons/search";
import Dropdown from "./dropdown";
import headerStyles from "./styles/header.module.css";
import Logo from "../assets/images/logo.png";
import { useState } from "react";

const aboutUsStyles = { position: "absolute", left: "1.3vw", top: "4vh" };
const membershipStyles = { position: "absolute", left: "10vw", top: "4vh" };

const aboutUsOptions = [
    {
        title: "Board of Trustees",
        linkTo: "/about"
    },
    {
        title: "Leadership Team",
        linkTo: "/about"
    },
    {
        title: "State Chapters",
        linkTo: "/about"
    }
];
const membershipOptions = [
    {
        title: "Membership Overview",
        linkTo: "/membership"
    },
    {
        title: "Check Your Financial Status",
        linkTo: "/membership",
    },
    {
        title: "State Chapter Membership",
        linkTo: "/membership"
    },
    {
        title: "Section Membership",
        linkTo: "/membership"
    },
    {
        title: "View Accredited Institutions",
        linkTo: "/membership"
    }
];


const aboutUsDropDown = <Dropdown styles={aboutUsStyles} options={aboutUsOptions} />;
const membershipDropDown = <Dropdown styles={membershipStyles} options={membershipOptions} />;

function dropDownOnclick(name, dropDownStateName, dropDownValue, setState) {
    const update = {};

    if (name === dropDownStateName) {
        update.name = "";
        update.value = null;
    } else {
        update.name = name;
        update.value = dropDownValue;
    }
    setState(update);
}

export default function Header() {
    const [dropdownState, setDropDown] = useState({ name: "", value: null });

    return (
        <div className={headerStyles.container}>
            <div className={headerStyles.section0}>
                <img src={Logo} alt="AULNU Logo" className={headerStyles.logo} />
                <div className={headerStyles.title}>ASSOCIATION OF UNIVERSITY LIBRARIANS OF NIGERIAN UNIVERSITIES</div>
            </div>
            <div className={headerStyles.section1}>
                <div className={headerStyles.section1Content} onClick={() => dropDownOnclick("aboutUs", dropdownState.name, aboutUsDropDown, setDropDown)}>
                    <AboutUsIcon />
                    <div>&nbsp;&nbsp;About</div>
                </div>
                <div className={headerStyles.section1Content} onClick={() => dropDownOnclick("membership", dropdownState.name, membershipDropDown, setDropDown)}>
                    <MembershipIcon />
                    <div>Membership</div>
                </div>
                <div className={headerStyles.section1Content}>
                    <LoginIcon />
                    <div>Login</div>
                </div>
                <div className={headerStyles.section1Content}>
                    <CharityIcon />
                    <div>Donation</div>
                </div>
                <div className={headerStyles.section1Content}>
                    <SearchIcon />
                    <div>Search</div>
                </div>
                {dropdownState.value}
            </div>
        </div>
    );
}