import { BrowserRouter } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <BrowserRouter>
            <div className="Layout">
                <header>
                    <Header/>
                </header>

                <aside>
                    <h2>Aside</h2>
                </aside>

                <main>
                    <h3>Main</h3>
                </main>

                <footer>
                    <Footer/>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default Layout;
