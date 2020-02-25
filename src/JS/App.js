import React from 'react';
import logo from './logo.svg';
import './App.css';



class App extends React.Component{

// faire un constructeur et récupérer les lieux notables dans la base de donnée +
//fonctions qui met dans un tableau la zone qui correspond à 10m autour de ces lieux ce qui pourrait nous servir pour savoir si l'utilisateur est ou pas dans une de ces zones
    render(){
        return(
            <div classname="App">
                <header classname="Header-App">
                    <img src={require("./localisation.png")} height="90px" alt={"logo localisation"}/>
                    <p> Lieux Touristiques à Metz </p>
                    // image recherche
                </header>
                <div classname="App-Map">

                   <p> Mettre la composante de la map </p>
                   <div id = "mapApp"></div>
                   <script>
                     var lat = 49.133333;
                     var lng = 6.166667;
                     var map = L.map('mapApp').setView([lat, lng], 1);
                     map.setZoom(17);
                     L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=7672dkutqM4J6PjqgoLx', {
                       attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
                     }).addTo(map);
                     var marker = L.marker([49.133333, 6.166667]).addTo(map);
                   </script>

                   {this.userInProximity()?
                     <div classname="App-Proximity">
                        <p> Je suis à proximité </p>
                     //récupérer partie de Lucas


                     </div>

                     :

                     <div classname="App-NoProximity">
                        <p> Je ne suis pas à proximité </p>
                     </div>
                   }
                </div>
            </div>
        )
}


userInProximity(){  //calculer si l'utilisateur est ou pas dans une des zones
  return true
}


}

export default App;
