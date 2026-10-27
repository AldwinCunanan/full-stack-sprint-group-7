
const racerImages = import.meta.glob(
    "./racerimages/*.{avif,png,jpg,jpeg,webp}",
    {
        eager: true,
        query: "?url",
        import: "default"
    }
) as Record<string, string>;

export const racers = [
    {
        name: "Kimi Antonelli",
        team: "Mercedes",
        country: "Italy",
        number: 12,
        season_position: "1st",
        season_points: 292,
        grand_prix_races: 14,
        grand_prix_wins: 8,
        image: racerImages["./racerimages/kimi_antonelli.avif"]
    },
    {
        name: "George Russell",
        team: "Mercedes",
        country: "United Kingdom",
        number: 63,
        season_position: "2nd",
        season_points: 211,
        grand_prix_races: 14,
        grand_prix_wins: 2,
        image:  racerImages["./racerimages/george_russell.avif"]
    },
    {
        name: "Lewis Hamilton",
        team: "Ferrari",
        country: "United Kingdom",
        number: 44,
        season_position: "3rd",
        season_points: 191,
        grand_prix_races: 14,
        grand_prix_wins: 1,
        image:  racerImages["./racerimages/lewis_hamilton.avif"]
    },
    {
        name: "Lando Norris",
        team: "McLaren",
        country: "United Kingdom",
        number: 1,
        season_position: "4th",
        season_points: 186,
        grand_prix_races: 14,
        grand_prix_wins: 2,
        image:  racerImages["./racerimages/lando_norris.avif"]
    },
    {
        name: "Charles Leclerc",
        team: "Ferrari",
        country: "Monaco",
        number: 16,
        season_position: "5th",
        season_points: 167,
        grand_prix_races: 14,
        grand_prix_wins: 1,
        image:  racerImages["./racerimages/charles_leclerc.avif"]
    },
    {
        name: "Max Verstappen",
        team: "Red Bull Racing",
        country: "Netherlands",
        number: 3,
        season_position: "6th",
        season_points: 145,
        grand_prix_races: 14,
        grand_prix_wins: 0,
        image:  racerImages["./racerimages/max_verstappen.avif"]
    },
    {
        name: "Oscar Piastri",
        team: "McLaren",
        country: "Australia",
        number: 81,
        season_position: "7th",
        season_points: 120,
        grand_prix_races: 14,
        grand_prix_wins: 0,
        image:  racerImages["./racerimages/oscar_piastri.avif"]
    },
    {
        name: "Isack Hadjar",
        team: "Red Bull Racing",
        country: "France",
        number: 6,
        season_position: "8th",
        season_points: 71,
        grand_prix_races: 11,
        grand_prix_wins: 0,
        image:  racerImages["./racerimages/isack_hadjar.avif"]
    },
    {
        name: "Liam Lawson",
        team: "Racing Bulls",
        country: "New Zealand",
        number: 30,
        season_position: "9th",
        season_points: 59,
        grand_prix_races: 14,
        grand_prix_wins: 0,
        image:  racerImages["./racerimages/liam_lawson.avif"]
    },
    {
        name: "Pierre Gasly",
        team: "Alpine",
        country: "France",
        number: 10,
        season_position: "10th",
        season_points: 41,
        grand_prix_races: 14,
        grand_prix_wins: 0,
        image:  racerImages["./racerimages/pierre_gasly.avif"]
    },
    {
        name: "Arvin Lindblad",
        team: "Racing Bulls",
        country: "United Kingdom",
        number: 41,
        season_position: "11th",
        season_points: 31,
        grand_prix_races: 14,
        grand_prix_wins: 0,
        image:  racerImages["./racerimages/arvin_lindblad.avif"]
    },
    {
        name: "Franco Colapinto",
        team: "Alpine",
        country: "Argentina",
        number: 43,
        season_position: "12th",
        season_points: 27,
        grand_prix_races: 14,
        grand_prix_wins: 0,
        image:  racerImages["./racerimages/franco_colapinto.avif"]
    }
];