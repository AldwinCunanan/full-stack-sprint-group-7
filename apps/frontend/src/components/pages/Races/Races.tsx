import "./races.css"
import { useState, useEffect } from "react"
import { Race } from "../../../types/races"
import RaceForm from "../../Races/RaceForm"
import DeleteRace from "../../Races/DeleteRace"
import { raceFormService } from "../../../services/raceFormServices"

/*
* Calls raceFormService.getRaces when the page loads. The service retrieves the races through the repository,
* and the page stores them in React state for display. This keeps data access outside the page component.
*/
function Races(){
    const [races, updateRaces] = useState<Race[]>([]);

    useEffect(() => {
        async function loadRaces() {
            const data = await raceFormService.getRaces();
            updateRaces(data);
        }

        loadRaces();
     }, []);

    return(
        <>
            <header className="races-header">
                <h2>Races</h2>
            </header>

            <RaceForm updateRaces={updateRaces}/>

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