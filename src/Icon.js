import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: require('./assets/marker.png'),
    iconRetinaUrl: require('./assets/marker.png'),
    iconSize: [60, 75]
});

const iconMonument = new L.Icon({
    iconUrl: require('./assets/monument.png'),
    iconRetinaUrl: require('./assets/monument.png'),
    iconSize: [60, 75]
});

export { iconPerson, iconMonument };
