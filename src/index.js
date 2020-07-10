import $ from 'jquery';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxTraffic from '@mapbox/mapbox-gl-traffic';
import RulerControl from 'mapbox-gl-controls/lib/ruler';
import { MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import PitchToggle from './pitchtogglecontrol/pitchtogglecontrol';
import AreaSwitcherControl from './AreaSwitcherControl/AreaSwitcherControl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '@mapbox/mapbox-gl-traffic/mapbox-gl-traffic.css';
import "mapbox-gl-style-switcher/styles.css"
import './pitchtogglecontrol/pitchtogglecontrol.css';
import './AreaSwitcherControl/AreaSwitcherControl.css';
import './style.css';
import config from './config';

if (process.env.NODE_ENV === 'production') {
    if (process.env.GANALYTICSID){
        document.write(`<script async src="https://www.googletagmanager.com/gtag/js?id=${process.env.GANALYTICSID}"></script>`);
        document.write(`<script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GANALYTICSID}');
        </script>`);
    }
}

$(function(){
    mapboxgl.accessToken = config.accessToken;

    this.map = new mapboxgl.Map({
        container: 'map',
        style: config.styles[0].uri,
        center: config.center,
        zoom: config.zoom,
        hash:true,
        attributionControl: false,
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    this.map.addControl(new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true},trackUserLocation: true}), 'top-right');
    this.map.addControl(new PitchToggle({minpitchzoom: 19})); 
    MapboxStyleSwitcherControl.DEFAULT_STYLE = config.styles[0].title;
    this.map.addControl(new MapboxStyleSwitcherControl(config.styles), 'top-right');
    this.map.addControl(new MapboxTraffic({showTraffic:false}));
    this.map.addControl(new AreaSwitcherControl(), 'top-right');
    this.map.addControl(new RulerControl(), 'top-right');
    this.map.addControl(new mapboxgl.ScaleControl({maxWidth: 80, unit: 'metric'}), 'bottom-left');
    this.map.addControl(new mapboxgl.AttributionControl({compact: true,customAttribution: config.attribution}), 'bottom-right');

    if (config.search){
        $.getJSON(config.search.url , customerData =>{
            function forwardGeocoder(query) {
                var matchingFeatures = [];
                for (var i = 0; i < customerData.features.length; i++) {
                    var feature = customerData.features[i];
                    config.search.target.forEach(v=>{
                        var target = feature.properties[v];
                        if (!target){
                            return;
                        }
                        // handle queries with different capitalization than the source data by calling toLowerCase()
                        if ((target.toString().toLowerCase().search(query.toString().toLowerCase()) !== -1)) {
                            feature['place_name'] = config.search.format(feature.properties);
                            feature['center'] = feature.geometry.coordinates;
                            feature['place_type'] = config.search.place_type;
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
                    zoom: config.search.zoom,
                    placeholder: config.search.placeholder,
                    mapboxgl: mapboxgl,
                }),
                'top-left'
            );
        });
    }

    if (config.popup){
        const createPopup = e => {
            let coordinates = e.lngLat;
            const f = e.features[0];
            if (f.geometry.type === 'Point'){
                coordinates = f.geometry.coordinates.slice();
            }
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            new mapboxgl.Popup().setLngLat(coordinates)
            .setHTML(`<table class="popup-table">${Object.keys(f.properties).map(k=>{return `<tr><th>${k}</th><td>${f.properties[k]}</td></tr>`;}).join('')}</table>`)
            .addTo(this.map);
        }
        config.popup.target.forEach(l=>{this.map.on('click', l, createPopup);});
    }
})