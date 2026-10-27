# D280 Interactive World Map

An Angular application for exploring country information on an interactive world map. Select a country on the map or search by country name to view its name, capital, region, income level, and geographic coordinates.

The app is hosted at [https://b-vazquez.github.io/D280/](https://b-vazquez.github.io/D280/).

## Requirements

- Node.js and npm versions compatible with Angular 17

## Run locally

From the project directory, install dependencies and start the development server:

```bash
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200). The Angular development server reloads the app when source files change.

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the Angular development server. |
| `npm run build` | Create a production build in `dist/d280-map`. |
| `npm test` | Run unit tests with Karma and Jasmine. |

## How it works

- `src/app/map/map.component.html` contains the inline SVG world map. Each country path has a country name and a two-letter code as its `id`.
- `MapComponent` handles map clicks and the country-name search. It emits the selected country’s fields to `AppComponent`.
- `AppComponent` passes those values to `MapInfoComponent`, which displays them in the information panel.
- `MapApiService` requests country records from the World Bank API.

The app uses the public World Bank V2 country endpoint, `https://api.worldbank.org/v2/country/{countryCode}?format=json`. No API key or additional environment configuration is required. The search resolves a typed country name by checking the World Bank records for the map’s country codes, so it depends on the network and the external API being available.

## Project layout

- `src/app/map/` — interactive SVG map and country selection/search.
- `src/app/map-info/` — country information display.
- `src/app/map-api.service.ts` — World Bank API requests.
- `src/app/app.component.*` — application shell and data flow between the map and information panel.
- `src/app/*.spec.ts` and component spec files — unit tests.
