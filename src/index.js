import $ from 'jquery';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import RulerControl from 'mapbox-gl-controls/lib/ruler';
import { MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import PitchToggle from './pitchtogglecontrol/pitchtogglecontrol';
import AreaSwitcherControl from './AreaSwitcherControl/AreaSwitcherControl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import "mapbox-gl-style-switcher/styles.css"
import './pitchtogglecontrol/pitchtogglecontrol.css';
import './AreaSwitcherControl/AreaSwitcherControl.css';
import './style.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibmFyd2Fzc2NvIiwiYSI6ImNrOXIxOTFleTBvNGIzZ3A4b3docmE5cHQifQ.BqsnWbWZ2NwJZDWyOVWjXA';

MapboxStyleSwitcherControl.DEFAULT_STYLE = 'Street';
const STYLES = [
    { title: 'Street', uri: 'mapbox://styles/narwassco/cka9n3gdl2jwh1ioa2zsowqn5',}, 
    { title: 'Satellite', uri: 'mapbox://styles/narwassco/ck9ringpx01bk1iq8q4xvknjx',},
    { title: 'UN Vector Tile', uri: 'https://narwassco.github.io/vt-map/style.json',},
];

$(function(){
    this.map = new mapboxgl.Map({
        container: 'map', // container id
        style: STYLES[0].uri,
        center: [35.87063, -1.08551], // starting position [lng, lat]
        zoom: 13, // starting zoom
        hash:true,
        attributionControl: false,
    });

    var customerData;
    $.ajax({
		type: "GET",
		url:"https://narwassco.github.io/vt-map/meter.geojson",
		async: false,
		success: json=>{customerData = json;},
		error: err=>{console.log(err)}
    });
    
    function forwardGeocoder(query) {
        var matchingFeatures = [];
        for (var i = 0; i < customerData.features.length; i++) {
            var feature = customerData.features[i];
            ['connno', 'serialno'].forEach(v=>{
                var target = feature.properties[v];
                if (!target){
                    return;
                }
                // handle queries with different capitalization than the source data by calling toLowerCase()
                if ((target.toString().toLowerCase().search(query.toString().toLowerCase()) !== -1)) {
                    feature['place_name'] = `${feature.properties.customer}, ${feature.properties.connno}, ${feature.properties.serialno}, ${feature.properties.village}`;
                    feature['center'] = feature.geometry.coordinates;
                    feature['place_type'] = ['meter'];
                    matchingFeatures.push(feature);
                }
            })
        }
        return matchingFeatures;
    }

    this.map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            localGeocoder: forwardGeocoder,
            localGeocoderOnly:true,
            zoom: 16,
            placeholder: 'Search CONN NO or S/N',
            mapboxgl: mapboxgl,
            countries:'ke'
        }),
        'top-left'
    );
    
    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    this.map.addControl(new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true},trackUserLocation: true}), 'top-right');
    this.map.addControl(new PitchToggle({minpitchzoom: 19})); 
    this.map.addControl(new MapboxStyleSwitcherControl(STYLES), 'top-right');
    this.map.addControl(new AreaSwitcherControl(), 'top-right');
    this.map.addControl(new RulerControl(), 'top-right');
    this.map.addControl(new mapboxgl.ScaleControl({maxWidth: 80, unit: 'metric'}), 'bottom-left');
    this.map.addControl(new mapboxgl.AttributionControl({compact: true,customAttribution: '©NARWASSCO,Ltd.'}), 'bottom-right');

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

    ['meter','flow meter','valve','washout','firehydrant','tank','pipeline'/**,'intake','wtp'*/]
    .forEach(l=>{this.map.on('click', l, createPopup);});
})