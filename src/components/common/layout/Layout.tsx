import { Outlet } from "react-router-dom";
import { Nav }  from "../nav/Nav";
import Footer from "../footer/Footer";

interface LayoutProps{
    credits: number;
}

export function Layout({credits}: LayoutProps) {
    return(
        <>
            <header className="global-header">
                <img src="/logo.svg" alt="F1 Logo" className="logo" />
                <h1>Formula One 2026</h1>
            </header>
            <Nav credits={credits}/>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
