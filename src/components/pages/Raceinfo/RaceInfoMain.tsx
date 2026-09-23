import "../../../raceInfo.css"

const race = {
    name: "Canadian Gradn Prix",
    location: "Montreal Canada",
    trackLength: "4.6km",
    racers: [
        "Max Ver",
        "Lar Aper",
        "Hunter Bow",
    ]
};

function RaceInfoMain(){
    return(
        <main>
            <div className="race-info-main">
                <div className="race-image">
                    <div className="race-info">
                        <div className="race-info-row">
                            <span>Race Name</span>
                            <p className="race-name">{race.name}</p>
                        </div>
                        
                        <div className="race-info-row">
                            <span>Location</span>
                            <p className="race-location">{race.location}</p>
                        </div>
                        
                        <div className="race-info-row">
                            <span>Track Length</span>
                            <p className="track-length">{race.trackLength}</p>
                        </div>

                        {race.racers.map((racer, index) => (
                            <div className="race-info-row">
                                <span>Racer {index + 1}</span>
                                <p>{racer}</p>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </main>
    );
};

export default RaceInfoMain;