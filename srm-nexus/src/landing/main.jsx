import Navbar from "./navbar"; // Import Navbar correctly
import Header from './header';
import About from "./About";
import Contact from './contact';
import Footer from './footer';

function Main() {
    return (
        <div>
            <Navbar />  {/* ✅ Navbar only in Main */}
            <Header></Header>
            <About></About>
            <Contact></Contact>
            <Footer></Footer>
        </div>
    );
}

export default Main;
