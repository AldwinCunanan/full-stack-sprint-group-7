import { racesRepo } from "../repositories/racesRepo";
import type { Race, RaceInput } from "../types/races";

export const raceFormService = {
    async getRaces(): Promise<Race[]> {
        return await racesRepo.getAllRaces();
    },

    async getRace(selectedId:string): Promise<Race> {
        const race = await racesRepo.getRace(selectedId);

        if(!race){
            throw new Error("Race not found.");
        }

        return race;
    },



    async addRace(race: RaceInput): Promise<Race> {
        const messages: string[] = [];

        //all text fields must be filled
        if(!race.name.trim() || !race.location.trim() || !race.trackLength.trim()){
            messages.push("Must have filled input fields!");
        }

        if(Number.isNaN(race.date.getTime())){
            messages.push("Please select a valid race Date!");
        }

        //must have a location in text feild
        if(!race.location.trim()){
            messages.push("Please choose a location!")
        }

        //name & location must have more than 3 characters
        if (race.name.trim().length < 3 || race.location.trim().length < 3 ){
            messages.push("Text fields need at least three characters!");
        }

        //name & location must be less than 30 characters
        if (race.name.trim().length > 30 || race.location.trim().length > 30){
            messages.push("Text fields cannot exceed 30 characters!");
        }

        const trackInKm = Number(race.trackLength);

        if (!Number.isFinite(trackInKm) || trackInKm < 1 || trackInKm > 15){
            messages.push("Track length must be between 1 and 15 km.");
        } else if (!/^\d{1,2}(\.\d)?$/.test(race.trackLength)) {
            messages.push("Track length can have at most one decimal place!");
        }

        //join all error messages and throw error
        if(messages.length > 0){
            throw new Error(messages.join(" "))
        }

        return racesRepo.createRace(race);
    },

    async deleteRace(raceId:string): Promise<void>{
        if(!raceId.trim()){
            throw new Error("A race ID is required!");
        }

        const race = await racesRepo.getRace(raceId);

        if(!race){
            throw new Error("Race not found!");
        }

        await racesRepo.deleteRace(raceId);
    },
}