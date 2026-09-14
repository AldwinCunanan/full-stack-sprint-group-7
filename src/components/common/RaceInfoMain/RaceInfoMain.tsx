
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
                        <div>
                            <span>Race Name</span>
                            <p className="race-name"></p>
                        </div>
                        
                        <div>
                            <span>Location</span>
                            <p className="race-location"></p>
                        </div>
                        
                        <div>
                            <span>Track Length</span>
                            <p className="track-length"></p>
                        </div>

                        {race.racers.map((racer, index) => (
                            <div>
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