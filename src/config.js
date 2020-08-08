const version = 0.1;

module.exports = {
    accessToken : process.env.ACCESSTOKEN,
    attribution : '©NARWASSCO,Ltd.',
    styles : [
        //{ title: 'Street', uri: 'mapbox://styles/narwassco/cka9n3gdl2jwh1ioa2zsowqn5',}, 
        //{ title: 'Satellite', uri: 'mapbox://styles/narwassco/ck9ringpx01bk1iq8q4xvknjx',},
        { title: 'Street', uri: `https://narwassco.github.io/mapbox-stylefiles/street/style.json?version=${version}`,}, 
        { title: 'Satellite', uri: `https://narwassco.github.io/mapbox-stylefiles/satellite/style.json?version=${version}`,},
        { title: 'UN Vector Tile', uri: `https://narwassco.github.io/mapbox-stylefiles/unvt/style.json?version=${version}`,},
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
    },
    areaSwitcher: {
        areas : [
            {title: 'Narok',latlng: [35.87063, -1.08551],zoom: 14,}, 
            {title: "Ololulung'a",latlng: [35.65072, -1.0085],zoom: 13}, 
            {title: "Kilgoris",latlng: [34.87533, -1.00278],zoom: 14}, 
            {title: "Suswa",latlng: [36.33078, -1.05307],zoom: 13}
        ]
    },
    legend:{
        targets:{
            'pipeline': 'Pipeline',
            'meter': 'Water Meter',
            'flow meter': 'Flow Meter', 
            'valve': 'Valve', 
            'firehydrant': 'Fire Hydrant', 
            'washout': 'Washout',
            'tank': 'Tank', 
            'wtp': 'WTP', 
            'intake': 'Intake', 
            'parcels': 'Parcels', 
            'village': 'Village', 
            'dma': 'DMA'
        }
    }
}