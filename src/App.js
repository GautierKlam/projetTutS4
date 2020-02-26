import React from 'react';
import './App.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import img from "./loupe.png";
import img2 from "./croix.png";
import axios from 'axios';

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
      lat: 49.133333,
      lng: 6.166667,
      zoom: 17,
      test: 0,
      input:"",
      all:"",
      nom:"",
      description: ""
    }
  }

    componentDidMount() {
        axios.get('https://devweb.iutmetz.univ-lorraine.fr/~giuliani6u/ProjetS4/API/post/all.php', {headers: {"Access-Control-Allow-Origin": "*"}})
        .then(res=> {
            this.setState({
                  all: res.data
            });
        })
    }
//---------------- FONCTION GEOLOCALISATION

  findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
        console.log(`longitude: ${ position.coords.longitude } | latitude: ${ position.coords.latitude }`);
        console.log(`Description : ${ this.state.description}`);
				this.setState({ lat: position.coords.latitude,
                        lng: position.coords.longitude
                      })
			}
		);
	};

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

//---------------- FONCTION RENDER

  render() {
    console.log(this.state.description);
    this.findCoordinates();
    var posi_actu = [this.state.lat, this.state.lng];
    return (
  <div>
    <header>
        {this.state.description}
             {this.state.input==="te"?
                    <h1>test</h1>
                    :this.state.input.match(/^c.*$/)?
                    <h1> cathedrale </h1>:
                        this.state.input>""?
             <h1>{this.state.input} autre</h1>:null}
            <input type="image" src={img} alt="loupe.png" onClick={this.alerte}/>

            {this.state.test> 0?
             <p>
                <input type="search"  placeholder="Saisissez votre recherche" onChange={this.research}  id="search" name="q" />
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
        <Marker position={posi_actu}>
          <Popup>
            <span>Vous êtes ici</span>
          </Popup>
        </Marker>
      </Map>
    </div>
    );
  }
}

export default App;
