import track_canada_montreal from "../../../assets/track_canada_montreal.png"
import "../../../raceInfo.css"

function RaceInfoHeader(){
    return(
        <div>
            <header className="race-info-header">
                <h1>Race Information</h1>
                <img className="race-track-image" src={track_canada_montreal} alt="race track image" />
            </header>
        </div>
    )
}

export default RaceInfoHeader;