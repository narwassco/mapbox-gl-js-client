$(function(){
    mapboxgl.accessToken = 'pk.eyJ1IjoiamluLWlnYXJhc2hpIiwiYSI6ImNrOHV1Nm9mdTAzMGIzdHNmbDBmZzllNnIifQ.J-ZRzlVGLH6Qm2UbCmYWeA';
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/jin-igarashi/ck8v6kye70pwd1io00waic2zu', // stylesheet location
        center: [35.8708381, -1.0936999], // starting position [lng, lat]
        zoom: 13, // starting zoom
        hash:true,
    });
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: 'metric'
    }));

    map.on('mousemove', function(e) {
        var features = map.queryRenderedFeatures(e.point);
        
        // Limit the number of properties we're displaying for
        // legibility and performance
        var displayProperties = [
            'sourceLayer',
            // 'id',
            // 'type',
            'properties',
            // 'layer',
            // 'source',          
            // 'state'
        ];
        
        var displayFeatures = features.map(function(feat) {
        var displayFeat = {};
            displayProperties.forEach(function(prop) {
                displayFeat[prop] = feat[prop];
            });
            return displayFeat;
        });
        document.getElementById('features').innerHTML = JSON.stringify(
            displayFeatures,
            null,
            2
        );
    });
})