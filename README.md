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
    accessToken : process.env.ACCESSTOKEN,
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

## for Development

```
npm start
```
Then, local server will be launched automatically. You can access to http://localhost:8080/ and check how your development works before deploying to gh-pages.

## Before deploying
### put `Mapbox AccessToken` and `CNAME` in `.env` file
Before deploying to your Github pages, please make sure configuring your `AccessToken` and `CNAME` in `.env`. 

```js
ACCESSTOKEN=Your public access token for Mapbox
CNAME=Your custom domain. If you don't have custom domain, just delete it.
```

### Delete Script of Google Analytics from `index.html`
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-170080825-1"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-170080825-1');
</script>
```

## Build

```
npm run build
```
Then, `bundle.js` will be created under `dist` direcotry.

## Deploy to gh-pages

```
npm run deploy
```
