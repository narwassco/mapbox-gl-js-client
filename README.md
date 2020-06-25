# mapbox-gl-js-client
![GitHub](https://img.shields.io/github/license/narwassco/mapbox-gl-js-client)
[![Gitter](https://badges.gitter.im/narwassco/community.svg)](https://gitter.im/narwassco/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

This client shows Mapbox Vetor Tile of water supply map for Narok Water.

## Installation

```
git clone https://github.com/narwassco/mapbox-gl-js-client.git
cd mapbox-gl-js-client
npm i
```

## Configuration
Please edit your own settings on `config.js` such as mapbox accessToken, stylefile URL, etc.

```js
{
    accessToken : 'Your Mapbox AccessToken',
    attribution : 'Your attribution',
    styles : [
        { title: 'Style Name', uri: 'Stylefile URL',}, 
    ],
    center: [35.87063, -1.08551],
    zoom: 13,
    search:{ //if searching window is not necessary, please delete "search" property from config.js
        url: 'GeoJSON URL for searching',
        target: ['connno', 'serialno'], //target column name for searching
        format: (p) => {return `${p.customer}, ${p.connno}, ${p.serialno}, ${p.village}`}, //format of searching result
        place_type: ['meter'],
        placeholder: 'Search CONN NO or S/N',
        zoom: 17,
    },
    popup: { //if popup is not necessary, please delete "popup" property from config.js
        //target of layer name which you want to show popup
        target: ['meter','flow meter','valve','washout','firehydrant','tank','pipeline'/**,'intake','wtp'*/]
    }
}
```

## Build

```
npm run build
```
Then, `bundle.js` will be created under `dist` direcotry.

## for Development

```
npm run dev
```
Then, local server will be launched automatically. You can access to http://localhost:8080/ and check how your development works before deploying to gh-pages.

## Deploy to gh-pages

```
npm run deploy
```