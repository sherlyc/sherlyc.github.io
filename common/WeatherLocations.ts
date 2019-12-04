export enum WeatherLocations {
  Auckland = "Auckland",
  Ashburton = "Ashburton",
  Christchurch = "Christchurch",
  Timaru = "Timaru",
  Rotorua = "Rotorua",
  Taupo = "Taupo",
  Tauranga = "Tauranga",
  Whakatane = "Whakatane",
  Gisborne = "Gisborne",
  Hastings = "Hastings",
  Napier = "Napier",
  Dannevirke = "Dannevirke",
  Levin = "Levin",
  PalmerstonNorth = "Palmerston North",
  Whanganui = "Whanganui",
  Blenheim = "Blenheim",
  Kaikoura = "Kaikoura",
  Motueka = "Motueka",
  Nelson = "Nelson",
  Dargaville = "Dargaville",
  Kaitaia = "Kaitaia",
  Paihia = "Paihia",
  Russell = "Russell",
  Whangarei = "Whangarei",
  Alexandra = "Alexandra",
  Dunedin = "Dunedin",
  Oamaru = "Oamaru",
  Queenstown = "Queenstown",
  Wanaka = "Wanaka",
  Gore = "Gore",
  Invercargill = "Invercargill",
  NewPlymouth = "New Plymouth",
  Taumarunui = "Taumarunui",
  Hamilton = "Hamilton",
  TeKuiti = "Te Kuiti",
  Thames = "Thames",
  Tokoroa = "Tokoroa",
  Masterton = "Masterton",
  Paraparaumu = "Paraparaumu",
  Wellington = "Wellington",
  Greymouth = "Greymouth",
  Hokitika = "Hokitika",
  Reefton = "Reefton",
  Westport = "Westport"
}

export const weatherRegions = [
  {
    name: "Auckland",
    locations: [WeatherLocations.Auckland]
  },
  {
    name: "Canterbury",
    locations: [
      WeatherLocations.Ashburton,
      WeatherLocations.Christchurch,
      WeatherLocations.Timaru
    ]
  },
  {
    name: "Central North Island",
    locations: [
      WeatherLocations.Rotorua,
      WeatherLocations.Taupo,
      WeatherLocations.Tauranga,
      WeatherLocations.Whakatane
    ]
  },
  {
    name: `Hawke's Bay`,
    locations: [
      WeatherLocations.Gisborne,
      WeatherLocations.Hastings,
      WeatherLocations.Napier
    ]
  },
  {
    name: "Manawatu",
    locations: [
      WeatherLocations.Dannevirke,
      WeatherLocations.Levin,
      WeatherLocations.PalmerstonNorth,
      WeatherLocations.Whanganui
    ]
  },
  {
    name: "Marlborough",
    locations: [WeatherLocations.Blenheim, WeatherLocations.Kaikoura]
  },
  {
    name: "Nelson",
    locations: [WeatherLocations.Motueka, WeatherLocations.Nelson]
  },
  {
    name: "Northland",
    locations: [
      WeatherLocations.Dargaville,
      WeatherLocations.Kaitaia,
      WeatherLocations.Paihia,
      WeatherLocations.Russell,
      WeatherLocations.Whangarei
    ]
  },
  {
    name: "Wellington",
    locations: [
      WeatherLocations.Paraparaumu,
      WeatherLocations.Masterton,
      WeatherLocations.Wellington
    ]
  },
  {
    name: "Otago",
    locations: [
      WeatherLocations.Alexandra,
      WeatherLocations.Dunedin,
      WeatherLocations.Oamaru,
      WeatherLocations.Queenstown,
      WeatherLocations.Wanaka
    ]
  },
  {
    name: "Southland",
    locations: [WeatherLocations.Gore, WeatherLocations.Invercargill]
  },
  {
    name: "Taranaki",
    locations: [WeatherLocations.NewPlymouth, WeatherLocations.Taumarunui]
  },
  {
    name: "Waikato",
    locations: [
      WeatherLocations.Hamilton,
      WeatherLocations.TeKuiti,
      WeatherLocations.Thames,
      WeatherLocations.Tokoroa
    ]
  },
  {
    name: "West Coast",
    locations: [
      WeatherLocations.Westport,
      WeatherLocations.Greymouth,
      WeatherLocations.Reefton,
      WeatherLocations.Hokitika
    ]
  }
];
