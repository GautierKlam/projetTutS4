import React from 'react';
import './App.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import img from "./assets/loupe.png";
import img2 from "./assets/croix.png";
import {  iconPerson  } from './Icon';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class App extends React.Component{

  constructor() {
    super()
    this.state = {
      lat: 0,
      lng: 0,
      zoom: 17,
      test: 0,
      vibre: 0,
      input:"",
      nom:"",
      description:""
    }
  }

//---------------- FONCTION GEOLOCALISATION

  findCoordinates = () => {
		navigator.geolocation.getCurrentPosition (
			position => {
        //console.log(`longitude: ${ position.coords.longitude } | latitude: ${ position.coords.latitude }`);
				this.setState({ lat: position.coords.latitude,
                        lng: position.coords.longitude
                      })
			}
		);
    const refreshMap = navigator.geolocation.watchPosition(
			position => {
        console.log(`longitude: ${ position.coords.longitude } | latitude: ${ position.coords.latitude }`);
				this.setState({ lat: position.coords.latitude,
                        lng: position.coords.longitude
                      })
			}
		);
    /*setTimeout(() => {
      navigator.geolocation.clearWatch(refreshMap);
    }, 15000);*/
	}

//---------------- FONCTION BARRE DE RECHERCHE

    alerte = () => {
        this.setState ({
          test: 1
        });
    }

    alerte2 = () => {
        this.setState ({
          test: 0,
          input:""
        });
    }

    research = () => {
      this.setState ({
        input : document.getElementById('search').value
      });
   }

   vibre = () => {
     window.navigator.vibrate(3000);
   }
//---------------- FONCTION RENDER
  render() {
    this.findCoordinates();
    var posi_actu = [this.state.lat, this.state.lng];
    this.vibre();
    return (
  <body>
    <header>
             {this.state.input==="te"?
                    <h1>test</h1>
                    :this.state.input.match(/^c.*$/)?
                    <h1>cathedrale </h1>:
                        this.state.input>""?
             <h1>{this.state.input}autre</h1>:null}
             <div className="col-lg-4">
            <input type="image" align="center" src={img} alt="loupe.png" onClick={this.test}/>
            </div>
            {this.state.test> 0?
             <p>
                <input type="search" placeholder="Saisissez votre recherche" onChange={this.research}  id="search" name="q" />
                <input type="image" src={img2} alt="croix.png" onClick={this.alerte2}/>
             </p>
             :null
             }
    </header>
      <Map center={posi_actu} zoom={this.state.zoom} style={{height: '850px'}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={posi_actu} icon={ iconPerson }>
          <Popup>
            <span>Vous êtes ici</span>
          </Popup>
        </Marker>

      </Map>
    </body>
    );
  }
}

export default App;
