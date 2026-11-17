import { Racer } from "./racer_type";

export type Teamsheet = {
    id: string;
    teamName: string;
    racers: Racer[];
    bettingTotal: number;
};