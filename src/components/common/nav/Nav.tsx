import { NavLink } from "react-router-dom";
import "./Nav.css";

interface NavProps {
    credits:number;
}

export function Nav({credits}: NavProps) {
    return(
        <nav>
            <div className="page-links">
                <NavLink to="/" end>
                    Profile
                </NavLink>
                <NavLink to="/racers">
                    Racers 
                </NavLink>
                <NavLink to="/tracks">
                    Tracks 
                </NavLink>
                <NavLink to="/bets">
                    Betting 
                </NavLink>
            </div>
            <div className="nav-wallet">
                <span>$<strong>{credits}</strong></span>
            </div>
        </nav>
    );
}