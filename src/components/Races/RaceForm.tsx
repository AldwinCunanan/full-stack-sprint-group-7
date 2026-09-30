import { useState } from "react"
import { Race } from "../../backend/types/races";

//updateRaces
function RaceForm({ updateRaces }: { updateRaces: React.Dispatch<React.SetStateAction<Race[]>> }){

    const [raceName, setRaceName] = useState('');
    const [locationName, setLocationName] = useState('');
    const [dateOfRace, setDateOfRace] = useState('');
    const [lengthOfTrack, setLengthOfTrack] = useState('');
    const [errors, setErrors] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        
    }

    return(
        <form className="race-form" onSubmit={handleSubmit}>
            <p className="errors">{errors}</p>

            <input type="text"
            className="field-race-name"
            placeholder="Enter Race Name"
            value={raceName}
            onChange={e => {
                setRaceName(e.target.value)
            }} 
            />

            <input type="text"
            className="field-race-location"
            placeholder="Enter Race Location"
            value={locationName}
            onChange={e => {
                setLocationName(e.target.value)
            }} 
            />

            <input type="number"
            className="field-race-length"
            placeholder="Enter Track Length"
            min="1"
            max="15"
            value={lengthOfTrack}
            onChange={e => {
                setLengthOfTrack(e.target.value)
            }} 
            />

            <input type="date"
            className="field-race-date"
            min="2026-01-01"
            max="2028-12-30"
            value={dateOfRace}
            onChange={e => {
                setDateOfRace(e.target.value)
            }} 
            />

            <button type="submit">
                submit
            </button>

        </form>
    );
}

export default RaceForm;