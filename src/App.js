import React from 'react';
import './App.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import img from "./assets/loupe.png";
import img2 from "./assets/croix.png";
import {  iconPerson, iconMonument  } from './Icon';

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
      all:"",
      input:"",
      nom:"",
      description:""
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


//---------------- FONCTIONS RECUPERER LES DONNEES


   test = () => {
      this.setState ({
        all : this.state.all.split(' / ')
      });
   }
//---------------- FONCTION RENDER
  render() {

    //--------------VARIABLES DE TEST ----------------
    const monuments = [
      { id: 1, nom: "monum1", lat: 49, longit: 6, desc: "desc1", img:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fgoodguideinrio.com%2Fwp-content%2Fuploads%2F2018%2F03%2Fgood-guide-in-rio-city-tour-rio-3-450x450.jpg&imgrefurl=https%3A%2F%2Fgoodguideinrio.com%2Fcategorie-produit%2Fcartes-postales%2F&tbnid=78xiSy_C3Sh-bM&vet=12ahUKEwiul6vSuO_nAhVOgRoKHQ5jAKUQMygAegUIARDKAQ..i&docid=EXgEpF14-S2wiM&w=450&h=450&itg=1&q=monument%20images%20450X450&ved=2ahUKEwiul6vSuO_nAhVOgRoKHQ5jAKUQMygAegUIARDKAQ" },
      { id: 2, nom: "monum2", lat: 48, longit: 7, desc: "desc1", img:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.la-coursive.com%2Fwp-content%2Fuploads%2F2020%2F01%2Fparis-2-450x450.png&imgrefurl=https%3A%2F%2Fwww.la-coursive.com%2Fcinema%2Flequipe-de-secours-en-route-pour-laventure-janis-cimermanis%2F&tbnid=2K7nKjj5PGA6HM&vet=12ahUKEwiul6vSuO_nAhVOgRoKHQ5jAKUQMygFegUIARDUAQ..i&docid=zolR59PxtzH6rM&w=450&h=450&q=monument%20images%20450X450&ved=2ahUKEwiul6vSuO_nAhVOgRoKHQ5jAKUQMygFegUIARDUAQ" },
      { id: 3, nom: "monum3", lat: 49, longit: 6, desc: "desc1", img:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.cavissima.com%2Fpub%2Fmedia%2Fproducer%2Fimage%2Fresized%2F450x450%2Fclos_du_marquis_clos_l_oville_lascases.png&imgrefurl=https%3A%2F%2Fwww.cavissima.com%2Fachat-vin%2Fpar-regions%2Fbordeaux%2Fclos-du-marquis%2F&tbnid=wyki7Lh4eH8gwM&vet=12ahUKEwiul6vSuO_nAhVOgRoKHQ5jAKUQMygIegUIARDaAQ..i&docid=kgjIe7e04jUO8M&w=450&h=450&q=monument%20images%20450X450&ved=2ahUKEwiul6vSuO_nAhVOgRoKHQ5jAKUQMygIegUIARDaAQ" },
      { id: 4, nom: "monum4", lat: 48, longit: 7, desc: "desc1", img:"https://www.google.com/imgres?imgurl=https%3A%2F%2Ftoulouseboutiques.com%2Fwp-content%2Fuploads%2F2019%2F03%2FBoutiques-Wilson-Toulouse-2-450x450.jpg&imgrefurl=https%3A%2F%2Ftoulouseboutiques.com%2Fcategory%2Ffrance%2Fpage%2F3%2F&tbnid=zV-tw9wxe7zGEM&vet=12ahUKEwiul6vSuO_nAhVOgRoKHQ5jAKUQMygYegQIARAy..i&docid=ekZKjOwsDbPQVM&w=450&h=450&itg=1&q=monument%20images%20450X450&ved=2ahUKEwiul6vSuO_nAhVOgRoKHQ5jAKUQMygYegQIARAy" },
    ]
    //-------------- FIN DES VARIABLES DE TEST ----------------
    this.findCoordinates();
    var posi_actu = [this.state.lat, this.state.lng];
    this.vibre();
    return (
  <body>
    <header>
        <p> il y a {this.state.all.length} element</p>
             {this.state.input==="te"?
                    <h1>test</h1>:
             this.state.input==="test"?
                    <h1>tes</h1>
                    :this.state.input.match(/^c.*$/)?
                    <h1>cathedrale</h1>:
                        this.state.input>""?
             <h1>{this.state.input}autre</h1>:null}
             <div className="col-lg-4">
            <input type="image" align="center" src={img} alt="loupe.png" onClick={this.alerte}/>
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
        {
          monuments.map(x => <Marker position={[x.lat,x.longit]}  icon={iconMonument} id={x.id} ></Marker>)
        }
      </Map>

    </body>
    );
  }
}

export default App;
