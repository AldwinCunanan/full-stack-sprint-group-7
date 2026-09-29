import "./races.css"
import { type Races } from "../../../backend/types/races"

const races: Races[] = [
    {
        name: "Canadian Gradn Prix",
        location: "Montreal Canada",
        trackLength: "4.6km",
        date: "9/28/2026",
        drivers: [
            "Max Ver",
            "Lar Aper",
            "Hunter Bow",
        ]
    },
    {
        name: "Bahrain Grand Prix",
        location: "Sepang",
        trackLength: "5.5km",
        date: "10/02/2026",
        drivers: [
            "Max Verstappen"
        ]
    },
    {
        name: "Singapore Grand Prix",
        location: "Singapore",
        trackLength: "5.5km",
        date: "10/02/2026",
        drivers: [
            "Max Verstappen"
        ]
    },
    {
        name: "USA Grand Prix",
        location: "Austin",
        trackLength: "5.5km",
        date: "10/02/2026",
        drivers: [
            "Max Verstappen"
        ]
    },
    {
        name: "Mexican Grand Prix",
        location: "Mexico City",
        trackLength: "5.5km",
        date: "10/02/2026",
        drivers: [
            "Max Verstappen"
        ]
    },
    {
        name: "São Paulo Grand Prix",
        location: "Brazil",
        trackLength: "5.5km",
        date: "10/02/2026",
        drivers: [
            "Max Verstappen"
        ]
    },
    {
        name: "Qatar Grand Prix",
        location: "Lusail",
        trackLength: "5.5km",
        date: "10/02/2026",
        drivers: [
            "Max Verstappen"
        ]
    },
    {
        name: "Abu Dhabi Grand Prix",
        location: "Lusail",
        trackLength: "5.5km",
        date: "10/02/2026",
        drivers: [
            "Max Verstappen"
        ]
    },
]

function Races(){
    return(
        <>
            <header className="races-header">
                <h2>Races</h2>
            </header>

            <main className="race-main">

                {races.map((races) => (
                    <div className="race-box">
                    <div className="race-box-header">
                        <span className="race-date">{races.date}</span>
                        <span className="race-name">{races.name}</span>
                    </div>

                    <div className="race-divider"></div>

                    <div className="race-box-location">
                        <p>{races.location}</p>
                    </div>
                </div>
                ))}

            </main>
        </>
    )
}

export default Races