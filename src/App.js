import React from 'react';
import './App.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import img from "./assets/loupe.png";
import img2 from "./assets/croix.png";
import iconPersonMini from "./assets/marker.png";
import logo from "./assets/Logo.png";
import {  iconPerson, iconMonument  } from './Icon';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-notifications/lib/notifications.css';
import Description from './Description';

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
      all:"",
      input:"",
      id:[],
      nom:[],
      lon:[],
      listLat:[],
      description:[],
      adresse:[],
      lien1:[],
      lien2:[],
      lien3:[],
      lien4:[],
      arrayMonument:[],
      arrayElement:[],
      result:[],
      prox: 1,
      descnum: -1,
      pos_map: [0,0],
      pos_actu: [0,0],
      pos_init: 1
    }
  }

      componentDidMount() {
        axios.get('https://devweb.iutmetz.univ-lorraine.fr/~giuliani6u/ProjetS4/API/post/all.php', {headers: {"Access-Control-Allow-Origin": "*"}})
        .then(res=> {
            this.setState({
                  all: res.data,
            });
            this.setState({
              arrayMonument : this.state.all.split(' * ')
            });
            let arrayNom=[];
            let arrayID=[];
            let arrayDescription=[];
            let arrayLon=[];
            let arrayLat=[];
            let arrayAdresse=[];
            let arrayLien1=[];
            let arrayLien2=[];
            let arrayLien3=[];
            let arrayLien4=[];
            let arrayTake=[];
            for (let i=0;i<this.state.arrayMonument.length;i++){
                arrayTake = this.state.arrayMonument[i].split(' / ')
                arrayNom[i]=arrayTake[1];
                arrayID[i]=arrayTake[0];
                arrayLon[i]=arrayTake[2];
                arrayLat[i]=arrayTake[3];
                arrayDescription[i]=arrayTake[4];
                arrayAdresse[i]=arrayTake[5];
                arrayLien1[i]=arrayTake[6];
                arrayLien2[i]=arrayTake[7];
                arrayLien3[i]=arrayTake[8];
                arrayLien4[i]=arrayTake[9];
                }
              this.setState ({
                 id: arrayID,
                 nom: arrayNom,
                 lon:arrayLon,
                 listLat:arrayLat,
                 description:arrayDescription,
                 adresse:arrayAdresse,
                 lien1:arrayLien1,
                 lien2:arrayLien2,
                 lien3:arrayLien3,
                 lien4:arrayLien4
              });
        })
    }

//---------------- FONCTION GEOLOCALISATION

  findCoordinates = () => {
		/*navigator.geolocation.getCurrentPosition (
			position => {
        //console.log(`longitude: ${ position.coords.longitude } | latitude: ${ position.coords.latitude }`);
				this.setState({ lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        pos_actu: [this.state.lat, this.state.lng]
                      })
			}
		);*/
   navigator.geolocation.watchPosition(
			position => {
        this.setState({ lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        pos_actu: [position.coords.latitude, position.coords.longitude]
                      });}
		);
	}

  createNotification = () => {
        window.navigator.vibrate(3000);
        console.log("vibre create notif");
        NotificationManager.info(this.userInProximity().lieu.nom);
        this.setState({prox: 0});
  }

  //---------------- FONCTION BOOLEENNE

  testProx(){
    return (this.state.prox == 1);
  }

  displaydesc() {
    return this.state.descnum != -1;
  }

//---------------- FONCTION BARRE DE RECHERCHE

    alerte = () => {
        this.setState ({
          test: 1
        });
    }

    alerte2 = (id) => {
        this.setState ({
          test: 0,
          input: "",
          descnum: id
        });
    }

    alerte3 = () => {
        this.setState ({
          test: 0,
          input: ""
        });
    }

    research = () => {
    let j=0;
    let array=[];
    let str=document.getElementById('search').value;
    str=str.toLowerCase();
      for(let i=0;i<this.state.nom.length;i++){
          let rech=""+this.state.nom[i];
          rech=rech.toLowerCase();
          if(rech.includes(str)){
              array[j]= {
                nom: this.state.nom[i],
                id: this.state.id[i]
              };
              j=j+1;
          }
    }
    this.setState ({
        result: array
    });
 }

//---------------- FONCTION BARRE DE DETECTION DE PROXIMITE

userInProximity(){
  var a=this.state.lat
  var b=this.state.lng
  var tab=[]
  var lieu=null
  var prox=false

  for(let i=0;i<this.state.id.length;i++)
    tab[i] = {nom: this.state.nom[i], desc: this.state.description[i], lat: this.state.listLat[i], lng:this.state.lon[i]}

  var tab2 = tab.map(x => a>x.lat-0.001 && a<x.lat+0.001 && b<x.lng+0.001 && b>x.lng-0.001)     //20metre(1" à priori)

  if(tab2.includes(true)){
    lieu = tab[tab2.indexOf(true)]
    prox = true
  }
  return ({lieu:lieu, prox :prox})
}

  utiliser() {
    return this.state.prox === 1;
  }

//---------------- FONCTION D'AFFICHAGE

  render() {
    var monum = []
    var x = 0
    for(let i=0;i<this.state.id.length -1 ;i++){
      monum[i] = {id: this.state.id[i], latitude: this.state.listLat[i], longitude: this.state.lon[i]}
    }

    this.findCoordinates();
   return (
      <body>
        <header class="bg-info">
             <div className="container col-md-9">
              <div className="row">
              <img class="test3" src={logo} />
                  <div className="container col-md-5">
                 <h1>Lieux touristiques à Metz</h1>
                 </div>
                   <div className="">
                    <input type="image" class="test" src={img} alt="loupe.png" onClick={this.alerte}/>
                </div>
              </div>
            </div>
            {this.state.test> 0?
              <div className="container col-md-5">
             <p>
                <input type="search" placeholder="Saisissez votre recherche" onChange={this.research}  id="search" name="q" />
                <input type="image" class="test1" src={img2} alt="croix.png" onClick={this.alerte3}/>
                {this.state.result.length==""?
                    null:this.state.result.length>=""?
                         <p>{this.state.result.map(result => <input type="button" align="center" src={result.nom} value={result.nom} onClick={() => this.alerte2(result.id)}/>
                         )}</p>:<p>pas de resultat</p>}
             </p>
             </div>
             :null
             }
             <NotificationContainer/>
    </header>
      <Map class="map1 maptest" ref={(ref) => { this.map = ref}} center={this.displaymove()? this.state.pos_actu: this.state.pos_map} zoom={this.state.zoom} style={{height: '850px'}} maxZoom='19.5' minZoom='4'
      //onMove={() => this.setState({pos_init: 0, pos_map: this.map.leafletElement.getCenter()})}
      onZoom={() => this.setState({zoom: this.map.leafletElement.getZoom()})}>
      {console.log("coo : ", this.state.pos_map)}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={this.state.pos_actu} icon={ iconPerson }>
        <Popup>
          Vous êtes ici !
        </Popup>
        </Marker>
        {monum.map(x => <Marker position={[x.latitude, x.longitude]}  icon={iconMonument} id={x.id} onClick={() => this.setState({descnum: x.id - 1})}></Marker>)}
      </Map>
    <footer>
    <input type="image" align="center" src={iconPersonMini} value="centrer" alt="miniperso.png" onClick={() => this.setState ({pos_init: 1, zoom: 17})}/>
    {this.displaydesc()?
      <div class="desc">
          <input type="image" class="test1 right" src={img2} alt="croix.png" onClick={() => this.setState({descnum: -1})}/>
          <Description id = {this.state.id[this.state.descnum]}
                      nom = {this.state.nom[this.state.descnum]}
                      img1 = {this.state.lien1[this.state.descnum]}
                      img2 = {this.state.lien2[this.state.descnum]}
                      img3 = {this.state.lien3[this.state.descnum]}
                      img4 = {this.state.lien4[this.state.descnum]}
                      text = {this.state.description[this.state.descnum]}
                      adresse = {this.state.adresse[this.state.descnum]}/>
        </div>
        :
        null
    }
      {this.userInProximity().prox?
        (this.utiliser()?
          this.createNotification()
        :
          null)
        :
        () => this.setState({prox: 1})
      }
    </footer>
    </body>
    );
  }

}

export default App;
