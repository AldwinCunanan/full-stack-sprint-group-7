import { useState } from "react"
import { Race } from "../../backend/types/races";

function RaceForm({ updateRaces }: { updateRaces: React.Dispatch<React.SetStateAction<Race[]>> }){

    const [raceName, setRaceName] = useState('');
    const [locationName, setLocationName] = useState('');
    const [dateOfRace, setDateOfRace] = useState('');
    const [lengthOfTrack, setLengthOfTrack] = useState('');
    const [errors, setErrors] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trackInKm = Number(lengthOfTrack);

        if(!raceName || !locationName || !dateOfRace || !lengthOfTrack){
            setErrors("Must have filled input fields!")
            return;
        }

        if(raceName.trim().length < 3 || locationName.trim().length < 3){
            setErrors("Text fields need more than three characters!")
            return;
        }

        if(raceName.length > 30 || locationName.length < 30){
            setErrors("Text fields cannot have more than 30 characters!")
            return;
        }

        if(trackInKm < 1 || trackInKm > 15){
            setErrors("Track length can only be between 1 and 15 km!")
            return;
        }

        if(!/^\d{1,2}(\.\d)?$/.test(lengthOfTrack)){
            setErrors("Track length can only have one decimal place!")
            return;
        }

        setErrors('');

        //update
        updateRaces(prev => [...prev, 
            {
                name: raceName,
                location: locationName,
                trackLength: lengthOfTrack,
                date: new Date(dateOfRace),
                drivers: ["Max"]
            }
        ])
        
    }

    return(
        <form className="race-form" onSubmit={handleSubmit}>
            <p className="errors">{errors}</p>

            <input type="text"
            className="field-race-name"
            placeholder="Enter race name"
            value={raceName}
            onChange={e => {
                setRaceName(e.target.value)
            }} 
            />

            <input type="text"
            className="field-race-location"
            placeholder="Enter race location"
            value={locationName}
            onChange={e => {
                setLocationName(e.target.value)
            }} 
            />

            <input type="number"
            className="field-race-length"
            placeholder="Enter track length in kilometers"
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