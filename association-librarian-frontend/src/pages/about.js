import Footer from "../components/footer";
import Header from "../components/header";
import aboutStyles from "./styles/about.module.css";

export default function About() {
    return (
        <div>
            <Header />
            <div className={aboutStyles.contentContainer}>
                <div className={aboutStyles.content} />
            </div>
            <Footer />
        </div>
    );
}