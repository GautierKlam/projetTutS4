import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: require('./assets/marker.png'),
    iconRetinaUrl: require('./assets/marker.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

const iconMonument = new L.Icon({
    iconUrl: require('./assets/monument.png'),
    iconRetinaUrl: require('./assets/monument.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

export { iconPerson, iconMonument };
