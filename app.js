$(function(){
    mapboxgl.accessToken = 'pk.eyJ1IjoiamluLWlnYXJhc2hpIiwiYSI6ImNrOHV1Nm9mdTAzMGIzdHNmbDBmZzllNnIifQ.J-ZRzlVGLH6Qm2UbCmYWeA';
    this.map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/jin-igarashi/ck96bmtvb20rm1imxl7bim510', // stylesheet location
        center: [35.8708381, -1.0936999], // starting position [lng, lat]
        zoom: 13, // starting zoom
        hash:true,
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: 'metric'
    }));
    // Add geolocate control to the map.
    this.map.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
        })
        );

    const createPopup = e => {
        var coordinates = e.lngLat;
        if (e.features[0].geometry.type === 'Point'){
            coordinates = e.features[0].geometry.coordinates.slice();
        }
        var properties = e.features[0].properties;
        var html = `<table class="popup-table">`;
        Object.keys(properties).forEach(key=>{
            html += `<tr><th>${key}</th><td>${properties[key]}</td></tr>`;
        })
    
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
            
        new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(html)
        .addTo(this.map);
    }

    this.map.on('click', 'meter', createPopup);
    this.map.on('click', 'flowmeter', createPopup);
    this.map.on('click', 'valve', createPopup);
    this.map.on('click', 'washout', createPopup);
    this.map.on('click', 'firehydrant', createPopup);
    this.map.on('click', 'tank', createPopup);
    this.map.on('click', 'intake', createPopup);
    this.map.on('click', 'wtp', createPopup);
    this.map.on('click', 'pipeline', createPopup);
})