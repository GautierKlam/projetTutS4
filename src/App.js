import React from 'react';
import './App.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import img from "./assets/loupe.png";
import img2 from "./assets/croix.png";
import img3 from "./assets/Logo.png";
import {  iconPerson, iconMonument  } from './Icon';
import 'bootstrap/dist/css/bootstrap.min.css'

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

/*
//---------------- FONCTION AFFICHER Description
  displayInfo = (x){
    monuments.map(y => if(x.equals(y))
    render(){

    }
     <p> {x.desc} <img src={x.img} alt={x.nom}/> </p> )
  }
  */

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
      { id: 1, nom: "monum1", lat: 49, longit: 6, desc: "desc1", img:"https://goodguideinrio.com/wp-content/uploads/2018/03/good-guide-in-rio-city-tour-rio-3-450x450.jpg" },
      { id: 2, nom: "monum2", lat: 48, longit: 6, desc: "desc2", img:"https://www.merveilles-du-monde.com/Statue-de-la-Liberte/images/Vignettes/Photos/Liberty-island-V.jpg" },
      { id: 3, nom: "monum3", lat: 49, longit: 7, desc: "desc3", img:"https://stileex.xyz/wp-content/uploads/2019/06/7-Merveilles-du-monde-11Machu-450x300.jpg.webp" },
      { id: 4, nom: "monum4", lat: 48, longit: 7, desc: "desc4", img:"https://image.noelshack.com/fichiers/2019/49/4/1575562067-3apw27-1.png" },
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
                    <h1>test</h1>
             :this.state.input==="test"?
                    <h1>tes</h1>
                    :this.state.input.match(/^c.*$/)?
                    <h1>cathedrale</h1>:
                        this.state.input>""?
             <h1>{this.state.input}autre</h1>:null}
             <div className="container col-md-9">
             <div className="row">

                <img class="left" src={img3} width="100px"/>
                <div className="container col-md-5">
               <h1>Lieux touristiques à Metz</h1>
               </div>

                 <div className="col-md-offset-10">
            <input type="image" align="center" src={img} alt="loupe.png" onClick={this.alerte}/>
            </div>
            </div>
            </div>
            {this.state.test> 0?
              <div className="container col-md-2">
             <p>
                <input type="search" placeholder="Saisissez votre recherche" onChange={this.research}  id="search" name="q" />
                <input type="image" src={img2} alt="croix.png" onClick={this.alerte2}/>
             </p>
             </div>
             :null
             }
    </header>
      <Map center={posi_actu} zoom={this.state.zoom} style={{height: '850px'}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={posi_actu} icon={ iconPerson }></Marker>
        {
          monuments.map(x => <Marker position={[x.lat,x.longit]}  icon={iconMonument} id={x.id} onClick={this.displayInfo(x)} ></Marker>)
        }
      </Map>
        {
          monuments.map(x => <p> {x.desc} <img src={x.img} alt={x.nom}/> </p> )
        }
    </body>
    );
  }
}

export default App;
