export interface Race {
    id: string
    name: string,
    location: string,
    trackLength: string,
    trackImg: string,
    date: Date,
    drivers: string[]
}

export interface RaceInput {
    name: string,
    location: string,
    trackLength: string,
    trackImg: string,
    date: Date,
    drivers: string[]
}