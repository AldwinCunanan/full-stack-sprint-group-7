import "./raceForm.css"
import { useState } from "react"
import { Race } from "../../backend/types/races";

function RaceForm({ updateRaces }: { updateRaces: React.Dispatch<React.SetStateAction<Race[]>> }){

    const [raceName, setRaceName] = useState('');
    const [locationName, setLocationName] = useState('');
    const [trackImg, setTrackImg] = useState('');
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

        if(raceName.trim().length > 30 || locationName.trim().length > 30){
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
                trackImg: trackImg,
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

            {/* update to loop through list of tracks*/}
            <select className="field-race-location"
            value={locationName}
            onChange={e => {
                const {locationName, trackImg} = JSON.parse(e.target.value);
                setLocationName(locationName);
                setTrackImg(trackImg);
            }}>
                <option value='' hidden>Choose location</option>
                <option value='{"locationName":"Montreal", "trackImg":"/racesImages/tracks/montreal.png"}'>Montreal</option>
                <option value='{"locationName":"Sepang", "trackImg":"/racesImages/tracks/sepang.png"}'>Sepang</option>
                <option value='{"locationName":"Singapore", "trackImg":"/racesImages/tracks/singapore.png"}'>Singapore</option>
                <option value='{"locationName":"Austin", "trackImg":"/racesImages/tracks/austin.png"}'>Austin</option>
                <option value='{"locationName":"Mexico City", "trackImg":"/racesImages/tracks/mexico_city.png"}'>Mexico City</option>
                <option value='{"locationName":"Sao Paulo", "trackImg":"/racesImages/tracks/sao_paulo.png"}'>Sao Paulo</option>
                <option value='{"locationName":"Susail", "trackImg":"/racesImages/tracks/susail.png"}'>Lusail</option>
                <option value='{"locationName":"Abu Dhabi", "trackImg":"/racesImages/tracks/abu_dhabi.png"}'>Abu Dhabi</option>
            </select>

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

            <button className="race-submit-btn" type="submit">
                submit
            </button>

        </form>
    );
}

export default RaceForm;