import $ from 'jquery';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import RulerControl from 'mapbox-gl-controls/lib/ruler';
import CompassControl from 'mapbox-gl-controls/lib/compass';
import { MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import MapboxPopupControl from '@watergis/mapbox-gl-popup';
import '@watergis/mapbox-gl-popup/css/styles.css';
import PitchToggle from './pitchtogglecontrol/pitchtogglecontrol';
import AreaSwitcherControl from './AreaSwitcherControl/AreaSwitcherControl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import "mapbox-gl-style-switcher/styles.css"
import './pitchtogglecontrol/pitchtogglecontrol.css';
import './AreaSwitcherControl/AreaSwitcherControl.css';
import './style.css';
import config from './config';

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

    this.map.addControl(new mapboxgl.NavigationControl({showCompass:false}), 'top-right');
    this.map.addControl(new CompassControl(), 'top-right');
    this.map.addControl(new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true},trackUserLocation: true}), 'top-right');
    this.map.addControl(new PitchToggle({minpitchzoom: 19})); 
    MapboxStyleSwitcherControl.DEFAULT_STYLE = config.styles[0].title;
    this.map.addControl(new MapboxStyleSwitcherControl(config.styles), 'top-right');
    this.map.addControl(new AreaSwitcherControl(), 'top-right');
    this.map.addControl(new RulerControl(), 'top-right');
    this.map.addControl(new mapboxgl.ScaleControl({maxWidth: 80, unit: 'metric'}), 'bottom-left');
    this.map.addControl(new mapboxgl.AttributionControl({compact: true,customAttribution: config.attribution}), 'bottom-right');
    if (config.popup)this.map.addControl(new MapboxPopupControl(config.popup.target));

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
})