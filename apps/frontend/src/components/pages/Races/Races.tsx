import "./races.css";
import { useState, useEffect } from "react";
import type { Race } from "../../../../../../shared/types/races";
import RaceForm from "../../Races/RaceForm";
import DeleteRace from "../../Races/DeleteRace";
import { raceFormService } from "../../../services/raceFormServices";

/*
* Calls raceFormService.getRaces when the page loads. The service retrieves the races through the repository,
* and the page stores them in React state for display. This keeps data access outside the page component.
*/
function Races(){
    const [races, updateRaces] = useState<Race[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        let active = true;

        raceFormService.getRaces()
            .then((data) => {
                if (active) updateRaces(data);
            })
            .catch((error: unknown) => {
                if (active) setLoadError(error instanceof Error ? error.message : "Could not load races.");
            })
            .finally(() => {
                if (active) setIsLoading(false);
            });

        return () => { active = false; };
    }, []);

    return(
        <>
            <header className="races-header">
                <h2>Races</h2>
            </header>

            {isLoading ? <p role="status">Loading races…</p> : <RaceForm updateRaces={updateRaces}/>}
            {loadError && <p role="alert">{loadError}</p>}

            <main className="race-main">
                {races.map((race) => (
                    <div 
                        key={race.id}
                        className="race-box"
                        style={{backgroundImage: `url(${race.trackImg})`}}
                    >

                    <div className="race-box-header">
                        <span className="race-date">{race.date.toDateString()}</span>
                        <span className="race-name">{race.name}</span>
                    </div>

                    <div className="race-divider"></div>

                    <div className="race-box-location">
                        <p>{race.location}</p>
                    </div>

                    <DeleteRace raceId={race.id} updateRaces={updateRaces} />
                </div>
                ))}

            </main>
        </>
    )
}

export default Races
