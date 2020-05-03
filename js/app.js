$(function(){
    mapboxgl.accessToken = 'pk.eyJ1IjoiamluLWlnYXJhc2hpIiwiYSI6ImNrOHV1Nm9mdTAzMGIzdHNmbDBmZzllNnIifQ.J-ZRzlVGLH6Qm2UbCmYWeA';
    this.map = new mapboxgl.Map({
        container: 'map', // container id
        style:'mapbox://styles/jin-igarashi/ck9qw5qu92j2l1ipbu6hoox9x',
        center: [35.87063, -1.08551], // starting position [lng, lat]
        zoom: 13, // starting zoom
        hash:true,
        attributionControl: false,
    });
    
    this.map.addControl(new StylesControl({
        styles: [
            {
            label: 'Street',
            styleName: 'Street',
            styleUrl: 'mapbox://styles/jin-igarashi/ck9qw5qu92j2l1ipbu6hoox9x',
            }, {
            label: 'Satellite',
            styleName: 'Satellite',
            styleUrl: 'mapbox://styles/jin-igarashi/ck9qnb9zh2k6w1ip9dw8bxwox',
            },
        ],
        //onChange: (style) => console.log(style),
    }), 'top-left');
    this.map.addControl(new SwitchAreasControl(), 'top-left');
    this.map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new PitchToggle({minpitchzoom: 19})); 
    this.map.addControl(new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: 'metric'
    }));
    this.map.addControl(new RulerControl(), 'top-right');
    // this.map.addControl(new MapboxDraw({
    //     displayControlsDefault: false,
    //     controls: {
    //         point: true,
    //         line_string: true,
    //         polygon: true,
    //         trash: true
    //     }
    // }), 'top-left');

    // Add geolocate control to the map.
    this.map.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
        })
    );

    this.map.addControl(new mapboxgl.AttributionControl({
        compact: true,
        customAttribution: 'Narok Water and Sewerage Services Co., Ltd.'
    }));
    //this.map.addControl(new InspectControl(), 'bottom-right');

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
    this.map.on('click', 'flow meter', createPopup);
    this.map.on('click', 'valve', createPopup);
    this.map.on('click', 'washout', createPopup);
    this.map.on('click', 'firehydrant', createPopup);
    this.map.on('click', 'tank', createPopup);
    this.map.on('click', 'intake', createPopup);
    this.map.on('click', 'wtp', createPopup);
    this.map.on('click', 'pipeline', createPopup);
})