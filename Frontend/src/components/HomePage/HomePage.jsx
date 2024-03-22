import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ListAudit from "../ListAudit/ListAudit";

export default function HomePage (){
    return(
        <div className="homepage">
            <Header />
            <ListAudit />
            <Footer />
        </div>
    )
}