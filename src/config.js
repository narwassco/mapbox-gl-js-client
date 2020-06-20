module.exports = {
    accessToken : 'pk.eyJ1IjoibmFyd2Fzc2NvIiwiYSI6ImNrOXIxOTFleTBvNGIzZ3A4b3docmE5cHQifQ.BqsnWbWZ2NwJZDWyOVWjXA',
    attribution : '©NARWASSCO,Ltd.',
    styles : [
        { title: 'Street', uri: 'mapbox://styles/narwassco/cka9n3gdl2jwh1ioa2zsowqn5',}, 
        { title: 'Satellite', uri: 'mapbox://styles/narwassco/ck9ringpx01bk1iq8q4xvknjx',},
        { title: 'UN Vector Tile', uri: 'https://narwassco.github.io/vt-map/style.json',},
    ],
    center: [35.87063, -1.08551],
    zoom: 13,
    search:{
        url: 'https://narwassco.github.io/vt-map/meter.geojson',
        target: ['connno', 'serialno'],
        format: (p) => {return `${p.customer}, ${p.connno}, ${p.serialno}, ${p.village}`},
        place_type: ['meter'],
        placeholder: 'Search CONN NO or S/N',
        zoom: 17,
    },
    popup: {
        target: ['meter','flow meter','valve','washout','firehydrant','tank','pipeline'/**,'intake','wtp'*/]
    }
}