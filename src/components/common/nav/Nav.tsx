import { NavLink } from "react-router-dom";
import "./Nav.css";

export function Nav() {
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
        </nav>
    );
}