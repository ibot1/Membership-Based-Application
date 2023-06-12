import footerStyles from "./styles/footer.module.css";
import LocationIcon from "../icons/location";
import TelephoneIcon from "../icons/telephone";
import FacebookIcon from "../icons/facebook";
import Logo from "../assets/images/logo.png";
import TwitterIcon from "../icons/twitter";
import InstagramIcon from "../icons/instagram";
import YoutubeIcon from "../icons/youtube";
import LinkedInIcon from "../icons/linkedin";

export default function Footer() {
    return (
        <div className={footerStyles.container}>
            <div className={footerStyles.section1}>
                <div className={footerStyles.logoTitle}>
                    <img src={Logo} alt="AULNU Logo" className={footerStyles.logo} />
                    <div className={footerStyles.title}>Association Of University Librarians Of Nigerian Universities</div>
                </div>
                <br />
                <div className={footerStyles.line}>
                    <div>National Library of Nigeria HQ</div>
                    <div className={footerStyles.rightLine1}>
                        <LocationIcon />
                        <div>View On Map</div>
                    </div>
                </div>
                <div className={footerStyles.line}>
                    <div>Floor 1 Room 5, Sanusi Dantata House</div>
                    <div className={footerStyles.rightLine2}>
                        <TelephoneIcon />
                        <div>&nbsp;080.5555.5787</div>
                    </div>
                </div>
                <div className={footerStyles.line}>
                    <div>CBD, Abuja, 900001</div>
                    <div className={footerStyles.rightLine3}>
                        <TelephoneIcon />
                        <div>080.3702.4569</div>
                    </div>
                </div>
            </div>
            <div className={footerStyles.section2}>
                <div className={footerStyles.row1}>
                    <div className={footerStyles.contact}>Contact</div>
                    <div>Blog</div>
                    <div>Visit</div>
                    <div>Careers</div>
                </div>
                <div className={footerStyles.row2}>
                    <div>FOLLOW US:</div>
                    <FacebookIcon />
                    <TwitterIcon />
                    <InstagramIcon />
                    <YoutubeIcon />
                    <LinkedInIcon />
                </div>
                <div className={footerStyles.row3}>
                    <span>Copyright © 2023 Jaroy. All rights reserved. </span>
                    <a href="https://www.jaroymtech.ng" target="_blank" rel="noreferrer">Privacy & Legal</a>
                </div>
            </div>
        </div>
    );
}