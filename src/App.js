import React from 'react';
import './App.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      zoom: 17,
      lat: 49,
      long: 6
    }
  }

  findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
        console.log(`longitude: ${ position.coords.longitude } | latitude: ${ position.coords.latitude }`);
				this.setState({ lat: position.coords.latitude,
                        long: position.coords.longitude
                      })
			}
		);
	};

  render() {
    this.findCoordinates();
    var posi_actu = [this.state.lat, this.state.long];
    return (
      <Map center={posi_actu} zoom={this.state.zoom} style={{height: '850px'}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={posi_actu}>
          <Popup>
            <span>Vous êtes ici</span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default App;
