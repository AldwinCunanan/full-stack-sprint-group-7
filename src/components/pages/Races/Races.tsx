import "./races.css"
//import { useState } from "react"
import { Race } from "../../../backend/types/races"
import RaceForm from "../../Races/RaceForm"
import DeleteRace from "../../Races/DeleteRace"

type racePageProps = {
    races: Race[],
    updateRaces: React.Dispatch<React.SetStateAction<Race[]>>
}

function Races({races, updateRaces}: racePageProps){
    return(
        <>
            <header className="races-header">
                <h2>Races</h2>
            </header>

            <RaceForm updateRaces={updateRaces}/>

            <main className="race-main">
                {races.map((race) => (
                    <div className="race-box" style={{backgroundImage: `url(${race.trackImg})`}}>
                    <div className="race-box-header">
                        <span className="race-date">{race.date.toDateString()}</span>
                        <span className="race-name">{race.name}</span>
                    </div>

                    <div className="race-divider"></div>

                    <div className="race-box-location">
                        <p>{race.location}</p>
                    </div>

                    <DeleteRace name={race.name} updateRaces={updateRaces} />
                </div>
                ))}

            </main>
        </>
    )
}

export default Races