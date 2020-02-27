import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: require('./assets/marker.png'),
    iconRetinaUrl: require('./assets/marker.png'),
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

const iconMonument = new L.Icon({
    iconUrl: require('./assets/monument.png'),
    iconRetinaUrl: require('./assets/monument.png'),
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

export { iconPerson, iconMonument };
