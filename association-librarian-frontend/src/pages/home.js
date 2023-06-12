import Header from "../components/header";
import Footer from "../components/footer";
import homeStyles from "./styles/home.module.css";
import News1Img from "../assets/images/news1.jpg";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => window.scrollTo(0, 0));

    return (
        <div>
            <Header />
            <div className={homeStyles.whoWeAre}>
                <div className={homeStyles.title}>Who We Are?</div>
                <div className={homeStyles.msg}>AULNU is a Nigerian University librarians association whose goal is to discuss matters and formulate policies relating to University Libraries in Nigeria and advise on Library and Information Services.</div>
                <div className={homeStyles.whoWeAreLinks}>
                    <div>
                        <NavLink className={homeStyles.button} style={{ marginRight: "2vw", marginBottom: "2vh" }}>History & Objectives</NavLink>
                        <NavLink className={homeStyles.button}>Administration</NavLink>
                    </div>
                    <div>
                        <NavLink className={homeStyles.button} style={{ marginRight: "2vw" }}>State Chapters</NavLink>
                        <NavLink className={homeStyles.button}>Sections</NavLink>
                    </div>
                </div>
            </div>
            <div className={homeStyles.stats} onMouseOver={() => {
                const cL1 = document.getElementById("progressCircle").classList;
                const cL2 = document.getElementById("sectionsCount").classList;
                const cL3 = document.getElementById("membersCount").classList;

                if (cL1.length === 1) {
                    cL1.add(homeStyles.progressCircleActive);
                    cL2.add(homeStyles.sectionsCountActive);
                    cL3.add(homeStyles.membersCountActive);
                }
            }}>
                <div className={homeStyles.title}>Our Recent Achievements</div>
                <div className={homeStyles.natPresence}>
                    <div id="progressCircle" className={homeStyles.progressCircleInactive} />
                    <div className={homeStyles.statDescription}>National State Chapter Presence</div>
                </div>
                <div className={homeStyles.sectionsStat}>
                    <div id="sectionsCount" className={homeStyles.sectionsCountInactive} />
                    <div className={homeStyles.statDescription}>Sections</div>
                </div>
                <div className={homeStyles.membersStat}>
                    <div id="membersCount" className={homeStyles.membersCountInactive} />
                    <div className={homeStyles.statDescription}>Members</div>
                </div>
                <NavLink className={homeStyles.button} style={{ position: "relative", top: "6vh" }}>See More Details</NavLink>
            </div>
            <div className={homeStyles.applyContainer}>
                <div className={homeStyles.title}>Become An Esteemed Member!</div>
                <div className={homeStyles.msg}>AULNU is now accepting membership applications.</div>
                <NavLink className={homeStyles.button}>Apply Today</NavLink>
            </div>
            <div className={homeStyles.newsContainer}>
                <div className={homeStyles.newsCard}>
                    <div className={homeStyles.newsHeader}>NEWS & EVENTS</div>
                    <div className={homeStyles.newsImgHolder}>
                        <img src={News1Img} alt="Celebration" />
                    </div>
                    <div className={homeStyles.newsMsg}>Bi-Annual Conference and Annual General Meeting at AUST of AULNU under the theme “The Nigerian University Library System: Crossroads, Conflicts and Critical Considerations” </div>
                    <NavLink className={homeStyles.button} style={{ position: "relative", left: "-5.6vw", top: "-3vh" }}>See More News</NavLink>
                </div>
            </div>
            <div style={{ backgroundColor: "#f4f4f4", height: "20vh" }}>

            </div>
            <Footer />
        </div>
    );
}