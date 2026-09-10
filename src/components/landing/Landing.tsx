
const racers = [
    {
        name: "Luna Vortex",
        team: "Nebula Racing",
        number: 44,
        wins: 10,
        ranking: "1st Overall",
        odds: "+150",
        vehicle: "Nebula NX44",
        color: "Purple & Black"
    },
    {
        name: "Orion Blaze",
        team: "Starlance Racing",
        number: 31,
        wins: 4,
        ranking: "2nd Overall",
        odds: "+200",
        vehicle: "Starlance SB31",
        color: "Blue & Silver"
    },
    {
        name: "Max Velocity",
        team: "Thunderbolt Racing",
        number: 22,
        wins: 7,
        ranking: "3rd Overall",
        odds: "+250",
        vehicle: "Vortex X1",
        color: "Matte Red & Black"
    },
    {
        name: "Vega Storm",
        team: "Cyclone Dynamics",
        number: 18,
        wins: 6,
        ranking: "4th Overall",
        odds: "+300",
        vehicle: "Cyclone CX18",
        color: "Teal & Black"
    },
    {
        name: "Nova Drift",
        team: "Solaris Racing",
        number: 7,
        wins: 5,
        ranking: "5th Overall",
        odds: "+400",
        vehicle: "SolarFlare S7",
        color: "Yellow & Black"
    },
    {
        name: "Crimson Fang",
        team: "Redline Syndicate",
        number: 11,
        wins: 2,
        ranking: "6th Overall",
        odds: "+500",
        vehicle: "Redline RL11",
        color: "Blood Red"
    },
    {
        name: "Titan Flux",
        team: "Ironclad Motors",
        number: 5,
        wins: 0,
        ranking: "7th Overall",
        odds: "+550",
        vehicle: "Ironclad IC5",
        color: "Gunmetal Grey"
    },
    {
        name: "Apex Strider",
        team: "Crimson Apex",
        number: 14,
        wins: 3,
        ranking: "8th Overall",
        odds: "+600",
        vehicle: "Apex R14",
        color: "Crimson & Silver"
    },
    {
        name: "Echo Mirage",
        team: "Phantom Circuit",
        number: 27,
        wins: 1,
        ranking: "9th Overall",
        odds: "+700",
        vehicle: "Phantom PH27",
        color: "Ghost White"
    },
    {
        name: "Rex Tempest",
        team: "Tempest Motors",
        number: 9,
        wins: 1,
        ranking: "10th Overall",
        odds: "+1200",
        vehicle: "Tempest T9",
        color: "Storm Grey"
    }
];

type Racer = {
    name: string;
    team: string;
    number: number;
    wins: number;
    ranking: string;
    odds: string;
    vehicle: string;
    color: string;
};

const statistics: Statistics[] = [
    {
        name: "Racer Statistics",
        stats: racers
    }
];

type Statistics = {
    name: string;
    stats: Racer[];
};

export function Landing() {
    return (
        <>
            <header>
                <img src="/logo.svg" alt="F1 Logo" className="logo" />
                <h1>Formula One</h1>
                <span></span>
            </header>
            <main>
                <StatisticsList statistics={statistics} />
            </main>
        </>
    );
}

function StatisticsList({ statistics }: { statistics: Statistics[] }) {
    return (
        <section className="statistics_list">
            {statistics.map((stat) => (
                <section key={stat.name}>
                    <h2>{stat.name}</h2>

                    <div className="racer_list">
                        {stat.stats.map((racer) => (
                            <div key={racer.name} className="racer_card">
                                <strong>{racer.name}</strong>
                                <div>{racer.team}</div>
                                <div>Wins: {racer.wins}</div>
                                <div>Ranking: {racer.ranking}</div>
                                <div>Odds: {racer.odds}</div>
                                <div>Vehicle: {racer.vehicle}</div>
                                <div>Color: {racer.color}</div>
                            </div>
                        ))}
                    </div>

                </section>
            ))}
        </section>
    );
}

export default Landing;